const moment = require('moment');

const getHistory = (db) => (req, res) => {
  console.log('getHistory',req.body);
  
  const { rooms, fromDate, toDate } = req.body;

  db('history')
    .join('rooms', 'rooms.room_id', '=', 'history.room_id')
    .select(
      'history.history_id',
      'history.room_id',
      'history.light_status',
      'history.scheduled_time',
      'rooms.room_name'
    )
    .orderBy([
      { column: 'history.scheduled_time', order: 'desc' }
    ])
    .modify(function (queryBuilder) {
      if (rooms && rooms.length > 0) {
        queryBuilder.whereIn('history.room_id', rooms);
      }
      
      if (fromDate && toDate) {
        queryBuilder.whereBetween('history.scheduled_time', [new Date(fromDate), new Date(toDate)]);
      }
    })
    .then((historyList) => {
      if (historyList) {
        const historyListDto = historyList.map((history) => {
          return {
            historyId: history.history_id,
            roomId: history.roomId,
            roomName: history.room_name,
            lightStatus: history.light_status,
            date: moment(history.scheduled_time).format('DD.MM.YYYY'),
            time: moment(history.scheduled_time).format('HH:mm'),
          };
        });

        return res.send(historyListDto);

      } else {
        res.sendStatus(400);
      }
    });
};

const getHistoryFilters = (db) => async (req, res) => {
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

  db('history')
    .select(db.raw('MIN(scheduled_time) AS min_date, MAX(scheduled_time) AS max_date'))
    .first()
    .then((result) => {
      if (result) {
        return res.send({
          rooms: rooms,
          fromDate: result.min_date,
          toDate: result.max_date
        });

      } else {
        return res.sendStatus(400);
      }
    });
};

module.exports = {
  getHistory,
  getHistoryFilters
};