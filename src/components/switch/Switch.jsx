import "./switch.style.css";
import * as RadixSwitch from '@radix-ui/react-switch';

const Switch = ({ onRoomStatusChange, roomName, roomStatus }) => {
  return (
    <RadixSwitch.Root 
    className="switch-root"
    defaultChecked={roomStatus}
    onCheckedChange={(value) => onRoomStatusChange(roomName, value)}
    >
      <RadixSwitch.Thumb className="switch-thumb" />
    </RadixSwitch.Root>
  )
}

export default Switch;
