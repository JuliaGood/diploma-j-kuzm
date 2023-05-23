const cron = require('node-cron');
const { scheduleStatus } = require('../sheduleStatus');
const wsService = require('../services/WsService');

const jobs = new Map();

const runScheduler = (db) => {
  db('scheduler')
    .select('*')
    .where('status', '=', scheduleStatus.SCHEDULED)
    .then((schedules) => {
      schedules.forEach((schedule) => {
        scheduleCronJob(db, schedule);
      });
    }).catch((error) => {
      console.error(error);
    });
}

const scheduleCronJob = (db, schedule) => {
  const scheduleId = schedule.schedule_id;
  const scheduledTime = new Date(schedule.scheduled_time);
  const cronExpression = dateToCron(scheduledTime);

  if (!cron.validate(cronExpression)) {
    console.error(`Crone expression ${cronExpression} is not valid for schedule #${scheduleId}`);
    return;
  }

  const job = cron.schedule(cronExpression, () => {

    // Send message to WS clients to update their state
    db('scheduler')
      .where('schedule_id', '=', scheduleId)
      .join('rooms', 'rooms.room_id', '=', 'scheduler.room_id')
      .select(
        'scheduler.light_status',
        'rooms.room_id',
        'rooms.room_name',
        'rooms.bulb_pin'
      )
      .first()
      .then((schedule) => {
        if (schedule) {
          console.log('Send message to WS clients to update their state: %s', schedule);

          wsService.notifyAll(db, {
            roomId: schedule.room_id,
            bulbPin: schedule.bulb_pin,
            roomName: schedule.room_name,
            lightStatus: schedule.light_status,
          });
        }
      });

    // When the job is finished than update its status to COMPLETED
    updateScheduleStatus(db, schedule, scheduleStatus.COMPLETED);
  });

  // Store jobs and linked them with scheduleId
  jobs.set(scheduleId, job);
}

const deleteCronJob = (scheduleId) => {
  if (jobs.has(scheduleId)) {
    jobs.get(scheduleId).stop();
    jobs.delete(scheduleId);
    console.log(`Job was stopped for schedule #${scheduleId}`);
  }
}

const updateScheduleStatus = (db, schedule, status) => {
  const scheduleId = schedule.schedule_id;

  db('scheduler')
    .where('schedule_id', '=', scheduleId)
    .update({ status: status })
    .then(() => {
      if (status === scheduleStatus.COMPLETED) {
        saveSheduleToHistory(db, schedule);
      }

      console.log(`Schedule #${scheduleId} status has been updated to ${status}`);
    });
}

const saveSheduleToHistory = (db, schedule) => {
  console.log('schedule', schedule);

  // Add a record to history table
  db('history').insert({
    room_id: schedule.room_id,
    light_status: schedule.light_status,
    scheduled_time: schedule.scheduled_time
  })
    .then(() => {
      console.log(`Schedule #${schedule.schedule_id} has been saved to history`);
    });
}

const dateToCron = (date) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDate();
  const months = date.getMonth() + 1;

  return `${minutes} ${hours} ${days} ${months} *`;
};

module.exports = {
  runScheduler,
  scheduleCronJob,
  deleteCronJob
}