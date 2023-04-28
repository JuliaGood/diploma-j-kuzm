import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Button from "../../components/button/Button";
import "./filterRoomDropdown.style.css";

const FilterRoomDropdown = ({rooms, isRoomSelected, onRoomFilterCheck, setRoomFilterOpen}) => {
  return (
    <div className="filter-room-dropdown">
      <ScrollArea.Root className="scroll-area-root">
        <ScrollArea.Viewport className="scroll-area-viewport">
          <div style={{ padding: '15px 20px' }}>
            {rooms && rooms.map((room) => (
              <div className="room-tag" key={room.roomId}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox.Root
                    className="checkbox-root"
                    checked={isRoomSelected(room.roomId)} 
                    onClick={() => onRoomFilterCheck(room.roomId)}
                  >
                    <Checkbox.Indicator className="checkbox-indicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="room-label" htmlFor="c1">
                    {room.roomName}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="scroll-area-scrollbar" orientation="vertical">
          <ScrollArea.Thumb className="scroll-area-thumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="scroll-area-scrollbar" orientation="horizontal">
          <ScrollArea.Thumb className="scroll-area-thumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="scroll-area-corner" />
      </ScrollArea.Root>

      <Button
        onButtonClick={setRoomFilterOpen}
        buttonName="ok"
        buttonClass="btn-small"
      />
    </div>
  )
}

export default FilterRoomDropdown;
