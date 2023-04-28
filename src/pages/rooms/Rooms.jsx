import "./rooms.style.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CustomSwitch from "../../components/custom-switch/CustomSwitch";
import CustomSlider from "../../components/custom-slider/CustomSlider";
import ApiUrls from '../../ApiUrls';

const MIN_BRIGHT_RANGE = 5;

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const onBrightRangeChange = (roomName, value) => {
    const updatedBrightRange = value >= MIN_BRIGHT_RANGE ? value : MIN_BRIGHT_RANGE;
    const currentRooms = rooms.map((room) => {
      if (room.name === roomName) {
        room.brightRange = updatedBrightRange;
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
    fetch(ApiUrls.rooms.getHomeRooms)
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
                style={adjustIconColorBrightness(room.brightRange)}
              />
              <span className="room-name">{room.name}</span>
              <div className="room-switch">
                <CustomSwitch 
                  onSwitchStatusChange={(value) => onRoomStatusChange(room.name, value)}
                  switchStatus={room.isOn}
                />
              </div>
            </div>

            <div className="room-bright">
              <div className="room-slider">
                <CustomSlider 
                  onSliderChange={(value) => onBrightRangeChange(room.name, value)} 
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

export default Rooms;
