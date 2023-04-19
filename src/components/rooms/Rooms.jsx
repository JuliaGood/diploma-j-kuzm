import roomsData from "../../utils/rooms";
import "./rooms.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from "../switch/Switch";
import SliderBar from "../slider-bar/SliderBar";
import { faLightbulb, faBolt } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

function Rooms() {
  const [rooms, setRooms] = useState(roomsData);

  const onDimRangeChange = (roomName, value) => {
    console.log("onDimRangeChange",roomName, value);
    const currentRooms = rooms.map((room) => {
      if (room.name === roomName) {
        room.dimRange = value;
      }
      return room;
    });

    setRooms(currentRooms);
  }

  const onRoomStatusChange = (roomName, value) => {
    console.log("onRoomStatusChange", roomName, value);
  }

  return (
    <div className="rooms">
      <div className="rooms-header">
        <p>smart <FontAwesomeIcon icon={faBolt} className="faBolt" /> lighting</p>
      </div>
      {rooms.map((room) => {
        return (
          <div key={room.name} className="room">
            <div className="room-status">
              <FontAwesomeIcon icon={faLightbulb} className="faLightbulb" />
              <span className="room-name">{room.name}</span>
              <div className="room-switch">
                <Switch 
                  onRoomStatusChange={onRoomStatusChange}
                  roomName={room.name}
                  roomStatus={room.isOn}
                />
              </div>
            </div>

            <div className="room-dim">
              <div className="room-sliderbar">
                  <SliderBar 
                    onDimRangeChange={onDimRangeChange} 
                    roomName={room.name}
                    roomDimRange={room.dimRange}
                  />
                </div>
              <p>{room.dimRange}</p>
            </div>         
            
          </div>
        )
      })}
    </div>
  )
}

export default Rooms;
