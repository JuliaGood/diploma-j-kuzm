import "./rooms.style.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Switch from "../../components/switch/Switch";
import SliderBar from "../../components/slider-bar/SliderBar";

const MIN_BRIGHT_RANGE = 5;

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const onDimRangeChange = (roomName, value) => {
    console.log("onDimRangeChange", roomName, value);

    const updatedDimRange = value >= MIN_BRIGHT_RANGE ? value : MIN_BRIGHT_RANGE;
    const currentRooms = rooms.map((room) => {
      if (room.name === roomName) {
        room.dimRange = updatedDimRange;
      }
      return room;
    });

    setRooms(currentRooms);
  }

  const onRoomStatusChange = (roomName, value) => {
    console.log("onRoomStatusChange", roomName, value);
  }

  const adjustIconColorBrightness = (percent) => {
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
  
    return {color: `rgb(${newR} ${newG} ${newB})`};
  }

  useEffect(() => {
    fetch('/placeholders/rooms-data.json')
    .then(res => res.json())
    .then(rooms => setRooms(rooms))  
    .catch(console.log);
  }, []);

  return (
    <div className="rooms">
      {rooms.map((room) => {
        return (
          <div key={room.name} className="room">
            <div className="room-status">
              <FontAwesomeIcon 
                icon={faLightbulb} 
                className="fa-lightbulb" 
                style={adjustIconColorBrightness(room.dimRange)}
              />
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
              <p className="room-dim-percent">{room.dimRange}%</p>
            </div>         
            
          </div>
        )
      })}
    </div>
  )
}

export default Rooms;
