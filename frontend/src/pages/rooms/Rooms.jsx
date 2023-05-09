import "./rooms.style.css";
import React, { useCallback, useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CustomSwitch from "../../components/custom-switch/CustomSwitch";
import CustomSlider from "../../components/custom-slider/CustomSlider";
import ApiUrls from '../../ApiUrls';

const FIELD_TYPE = {
  LIGHT_STATUS: 1,
  BRIGHT_RANGE: 2
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
          case FIELD_TYPE.BRIGHT_RANGE:
            room.brightRange = value[0];
            break;
        }
      }
      return room;
    });

    setRooms(updatedRooms);

    const updatedRoom = findRoom(roomId);
    sendMessage(JSON.stringify({ ...updatedRoom, wsClientId: wsClientId }));
  }, [rooms]);

  const adjustIconColorBrightness = useCallback((percent) => {
    const initialColor = '#643104';

    // Parse the color string into RGB components
    const r = parseInt(initialColor.slice(1, 3), 16);
    const g = parseInt(initialColor.slice(3, 5), 16);
    const b = parseInt(initialColor.slice(5, 7), 16);

    // Calculate the brightness adjustment factor
    const adjustment = percent / 60;

    // Adjust the RGB components by the brightness adjustment factor
    const newR = Math.max(0, Math.min(255, Math.round(r + (r * adjustment))));
    const newG = Math.max(0, Math.min(120, Math.round(g + (g * adjustment))));
    const newB = b;

    return { color: `rgb(${newR} ${newG} ${newB})` };
  }, []);

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
                style={adjustIconColorBrightness(room.brightRange)}
              />
              <span className="room-name">{room.roomName}</span>
              <div className="room-switch">
                <CustomSwitch
                  onSwitchStatusChange={(value) => updateRoomStatus(room.roomId, FIELD_TYPE.LIGHT_STATUS, value)}
                  switchStatus={room.lightStatus}
                />
              </div>
            </div>

            <div className="room-bright">
              <div className="room-slider">
                <CustomSlider
                  onSliderChange={(value) => updateRoomStatus(room.roomId, FIELD_TYPE.BRIGHT_RANGE, value)}
                  brightRange={room.brightRange}
                />
              </div>
              <p className="room-bright-percent">{room.brightRange}%</p>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Rooms);
