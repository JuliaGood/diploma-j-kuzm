import "./history.style.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Button from "../../components/button/Button";
import FilterRoomDropdown from "../../components/filter-room-dropdown/FilterRoomDropdown";
import FieldGroup from "../../components/field-group/FieldGroup";
import CustomDatePicker from "../../components/custom-date-picker/CustomDatePicker";
import FieldGroups from "../../components/field-groups/FieldGroups";
import ApiUrls from '../../ApiUrls';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // { roomId: boolean}
  const [selectedFromDate, setSelectedFromDate] = useState(null); // date
  const [selectedToDate, setSelectedToDate] = useState(null); // date
  const [staticFilters, setStaticFilters] = useState({
    rooms: [],
    fromDate: null,
    toDate: null
  });
  const [isRoomFilterOpen, setRoomFilterOpen] = useState(false);

  const fetchHistory = () => {
    fetch(ApiUrls.GET_HISTORY.url, {
      method: ApiUrls.GET_HISTORY.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rooms: selectedRooms,
        fromDate: selectedFromDate,
        toDate: selectedToDate
      }),
    })
      .then((res) => res.json())
      .then((history) => setHistory(history))
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    fetch(ApiUrls.GET_HISTORY_FILTERS.url)
      .then(res => res.json())
      .then(staticFilters => {
        setStaticFilters(staticFilters);
        setSelectedRooms(staticFilters.rooms.map((room) => room.roomId));
        setSelectedFromDate(new Date(staticFilters.fromDate));
        setSelectedToDate(new Date(staticFilters.toDate));
      });
  }, []);

  const onRoomFilterCheck = (roomId) => {
    if (findSelectedRoom(roomId)) {
      const filteredSelectedRooms = selectedRooms.filter((selectedRoomId) => {
        return selectedRoomId !== roomId;
      });

      if (selectedRooms.length <= 1) {
        return;
      }

      setSelectedRooms(filteredSelectedRooms);
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  }

  const findSelectedRoom = (roomId) => {
    return selectedRooms.find((selectedRoomId) => {
      return selectedRoomId === roomId;
    });
  }

  const onFilterApplyClick = () => {
    fetchHistory();
  }

  const displaySelectedRooms = () => {
    const selectedRoomNames = staticFilters.rooms.filter((room) => {
      return findSelectedRoom(room.roomId);
    })
      .map((room) => {
        return room.roomName;
      })
      .join(", ")

    return selectedRoomNames;
  }

  const isRoomSelected = (roomId) => {
    return findSelectedRoom(roomId) !== undefined;
  }

  return (
    <div className="history">
      <div className="history-content">

        {/* <div className="history-content-empty">
          <FontAwesomeIcon icon={faTable} className="fa-table" />
          <p>Nothing in History</p>
        </div> */}

        <div className="history-content-full">
          <FieldGroups>
            <FieldGroup fieldName="Room">
              <div className="input">
                <FontAwesomeIcon icon={faHome} className="fa-input-icon" />
                <input
                  type="text"
                  readOnly
                  onClick={() => setRoomFilterOpen(true)}
                  defaultValue={displaySelectedRooms()}
                />
                <FontAwesomeIcon icon={faAngleDown} className="fa-input-arrow" />
              </div>
              {isRoomFilterOpen &&
                <FilterRoomDropdown
                  rooms={staticFilters.rooms}
                  isRoomSelected={isRoomSelected}
                  onRoomFilterCheck={onRoomFilterCheck}
                  setRoomFilterOpen={() => setRoomFilterOpen(false)}
                />
              }
            </FieldGroup>

            <FieldGroup fieldName="From date">
              <div className="input" >
                <CustomDatePicker
                  selectedDate={selectedFromDate}
                  onDateChange={(date) => setSelectedFromDate(date)}
                />
              </div>
            </FieldGroup>

            <FieldGroup fieldName="To date">
              <div className="input">
                <CustomDatePicker
                  selectedDate={selectedToDate}
                  onDateChange={(date) => setSelectedToDate(date)}
                />
              </div>
            </FieldGroup>

            <Button
              onButtonClick={() => onFilterApplyClick()}
              buttonName="apply"
            />
          </FieldGroups>

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
                <div className="table-row" key={historyRoom.historyId}>
                  <div className="col col-1">{historyRoom.roomName}</div>
                  <div className="col col-2">{historyRoom.lightStatus ? "On" : "Off"}</div>
                  <div className="col col-3 col-num">{historyRoom.brightRange}%</div>
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
