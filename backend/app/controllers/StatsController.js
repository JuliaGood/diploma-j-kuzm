const moment = require('moment');

const getStats = (db) => (req, res) => {
  console.log('getStats', req.body);

  const { rooms, period, dimension } = req.body;
  const dimensionFormat = getDimensionFormat(dimension);

  db('history')
    .select(
      db.raw('room_name AS roomName'),
      db.raw(`DATE_FORMAT(scheduled_time, "${dimensionFormat}") AS dimension`),
      db.raw('SUM(TIMESTAMPDIFF(MINUTE, scheduled_time, next_time)) AS totalTime')
    )
    .from(function () {
      this.select('rooms.room_name', 'h.scheduled_time', 'h.light_status', db.raw('(SELECT MIN(scheduled_time) FROM history WHERE scheduled_time > h.scheduled_time AND light_status != h.light_status) AS next_time'))
        .from('history AS h')
        .innerJoin('rooms', 'rooms.room_id', '=', 'h.room_id')
        .where('h.light_status', true)
        .modify(function (queryBuilder) {
          if (rooms && rooms.length > 0) {
            queryBuilder.whereIn('h.room_id', rooms);
          }

          queryBuilder.whereBetween('h.scheduled_time', getDateRange(period));
        })
        .orderBy([
          { column: 'scheduled_time', order: 'asc' }
        ])
        .as('tmp');
    })
    .whereNotNull('next_time')
    .groupByRaw(`room_name, DATE_FORMAT(scheduled_time, "${dimensionFormat}")`)
    .then((stats) => {
      if (stats) {
        const statsByRoomName = {};

        stats.forEach(stat => {
          if (!statsByRoomName[stat.roomName]) {
            statsByRoomName[stat.roomName] = [];
          }

          statsByRoomName[stat.roomName].push({
            dimension: stat.dimension,
            totalTime: stat.totalTime
          });
        });

        return res.send({
          labels: getLabels(dimension),
          data: statsByRoomName
        });
      }

      return res.sendStatus(400);
    });
};

const getStatsFilters = (db) => async (req, res) => {
  const rooms = await db('rooms')
    .select('*')
    .then((rooms) => {
      if (rooms) {
        return rooms.map((room) => {
          return {
            roomId: room.room_id,
            roomName: room.room_name
          };
        });

      } else {
        return [];
      }
    });

  return res.send({
    rooms: rooms,
  });
};

const getLabels = (dimension) => {
  switch (dimension) {
    case 'hoursOfDay':
      return ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
    case 'daysOfWeek':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'daysOfMonth':
      return getDayRangeForCurrentMonth();
    case 'monthsOfYear':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
}

const getDimensionFormat = (dimension) => {
  switch (dimension) {
    case 'hoursOfDay':
      return '%H:00'; // 7:00, 8:00 ...
    case 'daysOfWeek':
      return '%a'; // Mon, Tue, Wed ...
    case 'daysOfMonth':
      return '%e'; // 1, 2, 3, ... 31
    case 'monthsOfYear':
      return '%b'; // Jan, Feb, Mar ...
  }
}

const getDateRange = (period) => {
  const dbDateFormat = 'YYYY-MM-DD HH:mm:ss';
  const toDate = moment();

  return [
    toDate.clone().startOf(period).format(dbDateFormat),
    toDate.format(dbDateFormat)
  ];
}

const getDayRangeForCurrentMonth = () => {
  const currentDate = moment();
  const lastDayOfMonth = currentDate.endOf('month').date();
  const days = [];

  for (let i = 1; i <= lastDayOfMonth; i++) {
    days.push(String(i));
  }

  return days;
}

module.exports = {
  getStats,
  getStatsFilters
};