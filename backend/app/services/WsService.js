const WebSocket = require('ws');
const { uuid } = require('uuidv4');
const { isNotNull } = require('../utils');

// List of WS clients
const wsClients = new Map();

const runWsServer = (server, db) => {
  // Create WS connection
  const wsConnection = new WebSocket.Server({ server });

  wsConnection.on('connection', (ws) => {
    // Add new WS client
    const wsClientId = uuid();
    wsClients.set(wsClientId, ws);

    // Send all rooms as a first render
    db('rooms')
      .select('*')
      .then((rooms) => {
        if (rooms) {
          const roomsDto = rooms.map((room) => {
            return {
              roomId: room.room_id,
              bulbPin: room.bulb_pin,
              roomName: room.room_name,
              lightStatus: Boolean(room.light_status),
            };
          });

          console.log('Send all rooms as a first render via WS', roomsDto);

          ws.send(JSON.stringify({ firstConnection: true, rooms: roomsDto, wsClientId: wsClientId }));
        }
      });

    ws.on('message', (message) => {
      const data = JSON.parse(message);

      // Go through all WS client and send them updated room state
      notifyAll(db, data);
    });
  });
}

const notifyAll = (db, data) => {
  const { roomId, bulbPin, roomName, lightStatus } = data;

  Array.from(wsClients.entries()).forEach(([wsClientId, wsClient]) => {
    if (data.wsClientId && data.wsClientId === wsClientId) {
      return;
    }

    wsClient.send(JSON.stringify({
      roomId: roomId,
      bulbPin: bulbPin,
      roomName: roomName,
      lightStatus: lightStatus,
    }));
  });

   // Update a room in DB
   updateRoom(db, data);
}

const updateRoom = (db, data) => {
  const { roomId, lightStatus } = data;
  console.log('updateRoom', data);

  //if (isNotNull(roomId) && isNotNull(lightStatus) && isNotNull(brightRange)) {
    db('rooms')
      .where('room_id', '=', roomId)
      .update({
        light_status: lightStatus,
      })
      .then(() => {
        console.log(`Room id ${roomId} has been updated: %s`, data);
      });
  //}
}

module.exports = {
  runWsServer,
  notifyAll
}