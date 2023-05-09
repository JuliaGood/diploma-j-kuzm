const getRooms = (db) => (req, res) => {
  db('rooms')
    .select('*')
    .then((rooms) => {
      if (rooms) {
        const roomsDto = rooms.map((room) => {
          return {
            roomId: room.room_id,
            roomName: room.room_name
          };
        });

        return res.send(roomsDto);

      } else {
        res.sendStatus(400);
      }
    });
};

module.exports = {
  getRooms
};