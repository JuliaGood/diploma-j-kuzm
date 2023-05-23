import "./rooms.style.css";
import React, { useCallback, useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CustomSwitch from "../../components/custom-switch/CustomSwitch";
import ApiUrls from '../../ApiUrls';

const FIELD_TYPE = {
  LIGHT_STATUS: 1,
}

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [wsClientId, setWsClientId] = useState(null);
  const { sendMessage, lastMessage } = useWebSocket(ApiUrls.WS_URL, {
    onOpen: () => {
      console.log("ws connected!!!");
    }
  });

  const findRoom = useCallback((roomId) => {
    return rooms.find((room) => room.roomId === roomId);
  }, [rooms]);

  const updateRoomStatus = useCallback((roomId, field, value) => {
    const updatedRooms = rooms.map((room) => {
      if (room.roomId === roomId) {
        switch (field) {
          case FIELD_TYPE.LIGHT_STATUS:
            room.lightStatus = value;
            break;
        }
      }
      return room;
    });

    setRooms(updatedRooms);

    const updatedRoom = findRoom(roomId);
    sendMessage(JSON.stringify({ ...updatedRoom, wsClientId: wsClientId }));
  }, [rooms]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log("WS message", data);

      if (data.rooms && Array.isArray(data.rooms)) {
        setWsClientId(data.wsClientId);
        setRooms(data.rooms);
      } else {
        const updatedRooms = rooms.map((room) => {
          if (room.roomId === data.roomId) {
            room = data;
          }
          return room;
        });

        setRooms(updatedRooms);
      }
    }
  }, [lastMessage]);

  return (
    <div className="rooms">
      {rooms.map((room) => {
        return (
          <div key={room.roomId} className="room">
            <div className="room-status">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="fa-lightbulb"
              />
              <span className="room-name">{room.roomName}</span>
              <div className="room-switch">
                <CustomSwitch
                  onSwitchStatusChange={(value) => updateRoomStatus(room.roomId, FIELD_TYPE.LIGHT_STATUS, value)}
                  switchStatus={room.lightStatus}
                />
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Rooms);
