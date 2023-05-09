var moment = require('moment');
const { scheduleStatus } = require('../sheduleStatus');
const schedulerService = require('../services/SchedulerService');

const isNumeric = (num) => !isNaN(num);

const getSchedules = (db) => (req, res) => {
  db('scheduler')
    .join('rooms', 'rooms.room_id', '=', 'scheduler.room_id')
    .select(
      'scheduler.schedule_id',
      'scheduler.room_id',
      'scheduler.light_status',
      'scheduler.bright_range',
      'scheduler.scheduled_time',
      'rooms.room_name'
    )
    .whereIn('scheduler.status', [scheduleStatus.SCHEDULED])
    .orderBy([
      { column: 'scheduler.scheduled_time', order: 'asc' }
    ])
    .then((schedules) => {
      if (schedules) {
        const schedulesDto = schedules.map((schedule) => {
          return {
            scheduleId: schedule.schedule_id,
            roomName: schedule.room_name,
            lightStatus: schedule.light_status,
            brightRange: schedule.bright_range,
            date: moment(schedule.scheduled_time).format('DD.MM.YYYY'),
            time: moment(schedule.scheduled_time).format('HH:mm'),
          };
        });

        return res.send(schedulesDto);

      } else {
        res.sendStatus(400);
      }
    });
};

const getSchedule = (db) => (req, res) => {
  const scheduleId = parseInt(req.params['scheduleId']);

  if (!scheduleId || !isNumeric(scheduleId)) {
    return res.status(400).send('ScheduleId must be present and be a number');
  }

  db('scheduler')
    .where('schedule_id', '=', scheduleId)
    .join('rooms', 'rooms.room_id', '=', 'scheduler.room_id')
    .select(
      'scheduler.schedule_id',
      'scheduler.room_id',
      'scheduler.light_status',
      'scheduler.bright_range',
      'scheduler.scheduled_time',
      'rooms.room_name'
    )
    .whereIn('scheduler.status', [scheduleStatus.SCHEDULED])
    .first()
    .then((schedule) => {
      if (schedule) {
        return res.send({
          scheduleId: schedule.schedule_id,
          roomId: schedule.room_id,
          roomName: schedule.room_name,
          lightStatus: schedule.light_status,
          brightRange: schedule.bright_range,
          scheduledTime: new Date(schedule.scheduled_time)
        });

      } else {
        res.sendStatus(400);
      }
    });
};

const addSchedule = (db) => (req, res) => {
  console.log('addSchedule', req.body);
  
  const { roomId, lightStatus, brightRange, scheduledTime } = req.body;

  const scheduledFormatedTime = moment(scheduledTime).format('YYYY-MM-DD HH:mm:ss');

  db('scheduler').insert({
    room_id: roomId,
    light_status: lightStatus,
    bright_range: brightRange,
    scheduled_time: scheduledFormatedTime,
    status: scheduleStatus.SCHEDULED
  })
    .then((results) => {
      const scheduleId = results[0];

      if (scheduleId) {
        console.log(`Schedule #${scheduleId} has been added`);

        schedulerService.scheduleCronJob(db, {
          schedule_id: scheduleId,
          room_id: roomId,
          light_status: lightStatus,
          bright_range: brightRange,
          scheduled_time: scheduledFormatedTime,
        });

        return res.sendStatus(201);
      }

      return res.sendStatus(400);
    });
};

const editSchedule = (db) => (req, res) => {
  console.log('editSchedule', req.body);

  const { roomId, lightStatus, brightRange, scheduledTime } = req.body;
  const scheduleId = parseInt(req.params['scheduleId']);

  if (!scheduleId || !isNumeric(scheduleId)) {
    return res.status(400).send('ScheduleId must be present and be a number');
  }

  if (!scheduleId) {
    return res.sendStatus(400);
  }
  const scheduledFormatedTime = moment(scheduledTime).format('YYYY-MM-DD HH:mm:ss');

  db('scheduler')
    .where('schedule_id', '=', scheduleId)
    .update({
      room_id: roomId,
      light_status: lightStatus,
      bright_range:  brightRange,
      scheduled_time: scheduledFormatedTime
    })
    .then((results) => {
      if (results) {
        console.log(`Schedule #${scheduleId} has been updated`);

        schedulerService.deleteCronJob(parseInt(scheduleId));
        schedulerService.scheduleCronJob(db, {
          schedule_id: scheduleId,
          room_id: roomId,
          light_status: lightStatus,
          bright_range: brightRange,
          scheduled_time: scheduledFormatedTime,
        });
        
        return res.sendStatus(200);

      } else {
        res.sendStatus(400);
      }
    });
};

const deleteSchedule = (db) => (req, res) => {
  const scheduleId = parseInt(req.params['scheduleId']);

  if (!scheduleId || !isNumeric(scheduleId)) {
    return res.status(400).send('ScheduleId must be present and be a number');
  }

  db('scheduler')
    .where('schedule_id', '=', scheduleId)
    .delete()
    .then((results) => {
      if (results) {
        console.log(`Schedule #${scheduleId} has been removed`);
        schedulerService.deleteCronJob(scheduleId);

        return res.sendStatus(200);

      } else {
        res.sendStatus(400);
      }
    });
}

module.exports = {
  getSchedules,
  getSchedule,
  addSchedule,
  editSchedule,
  deleteSchedule
};