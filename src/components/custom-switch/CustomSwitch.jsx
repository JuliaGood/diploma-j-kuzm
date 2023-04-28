import "./customSwitch.style.css";
import * as Switch from '@radix-ui/react-switch';

const CustomSwitch = ({ onSwitchStatusChange, switchStatus }) => {
  return (
    <Switch.Root 
    className="switch-root"
    defaultChecked={switchStatus}
    onCheckedChange={(value) => onSwitchStatusChange(value)}
    >
      <Switch.Thumb className="switch-thumb" />
    </Switch.Root>
  )
}

export default CustomSwitch;
