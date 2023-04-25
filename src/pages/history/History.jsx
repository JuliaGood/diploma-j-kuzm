import "./history.style.css";
import { useEffect, useState } from "react";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const History = () => {

  const [history, setHistory] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({}); // { roomId: boolean}
  const [filters, setFilters] = useState({rooms: []});
  const [isRoomFilterOpen, setRoomFilterOpen] = useState(false);

  useEffect(() => {
    fetch('/placeholders/history-data.json')
      .then(res => res.json())
      .then(history => setHistory(history))
  }, []);

  useEffect(() => {
    fetch('/placeholders/history-filters.json')
      .then(res => res.json())
      .then(filters => setFilters(filters))
  }, []);

  const onRoomFilterCheck = (roomId) => {
    setSelectedRooms((currState) => {
      return {...currState, [roomId]: !currState[roomId]}
    });
    console.log(selectedRooms);
  }

  const displaySelectedRooms = () => {
    // for (const [key, value] of Object.entries(object1)) {
    //   console.log(`${key}: ${value}`);
    // }

    // const selectedRoomIds = Object.keys(selectedRooms).filter((roomId) => {
    //   return selectedRooms[roomId];
    // });

    const selectedRoomNames = filters.rooms.filter((room) => {
      return selectedRooms[room.roomId];
    })
    .map((room) => {
      return room.roomName;
    })
    .join(", ")
    
    console.log("rooms in displaySelectedRooms", selectedRoomNames);
    return selectedRoomNames;
  }


  return (
    <div className="history">

      <div className="history-content">

        {/* <div className="history-content-empty">
          <FontAwesomeIcon icon={faTable} className="fa-table" />
          <p>Nothing in History</p>
        </div> */}

        <div className="history-content-full">

          <div className="history-filters">
            <div className="filter ">
              <label>Room</label>
              <input 
                type="text" 
                onClick={() => setRoomFilterOpen(true)}
                defaultValue={displaySelectedRooms()}
              />

              { isRoomFilterOpen &&
              <>
              <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                  <div style={{ padding: '15px 20px' }}>
                    <div className="Text">rooms</div>
                    {filters.rooms && filters.rooms.map((room) => (
                      <div className="Tag" key={room.roomId}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox.Root 
                            className="CheckboxRoot" 
                            checked={selectedRooms[room.roomId]}
                            onClick={() => onRoomFilterCheck(room.roomId)}
                          >
                            <Checkbox.Indicator className="CheckboxIndicator">
                              <CheckIcon />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label className="Label" htmlFor="c1">
                            {room.roomName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                  <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                  <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="ScrollAreaCorner" />
              </ScrollArea.Root>
                <button 
                  className="ok-btn" 
                  onClick={() => setRoomFilterOpen(false)}
                >Ok</button>
              </>
              }

            </div>

            <div className="filter ">
              <label>From date</label>
              <input type="text" />
            </div>
            <div className="filter ">
              <label>To date</label>
              <input type="text" />
            </div>
          </div>

          <div className="history-table">
            <div className="table-header">
              <div className="col col-1">Room</div>
              <div className="col col-2">Status</div>
              <div className="col col-3">Bright</div>
              <div className="col col-4">Date</div>
              <div className="col col-5">Time</div>
            </div>


            {history.map((historyRoom) => {
              return (
                <div className="table-row" key={historyRoom.uuid}>
                  <div className="col col-1">{historyRoom.roomName}</div>
                  <div className="col col-2">{historyRoom.status}</div>
                  <div className="col col-3 col-num">{historyRoom.bright}%</div>
                  <div className="col col-4 col-num">{historyRoom.date}</div>
                  <div className="col col-5 col-num">{historyRoom.time}</div>
                </div>
              )
            })}

          </div>

        </div>
      </div>

    </div>
  )
}

export default History;
