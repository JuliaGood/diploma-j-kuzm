import "./stats.style.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faLayerGroup, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Button from "../../components/button/Button";
import CustomSelect from "../../components/custom-select/CustomSelect";
import FilterRoomDropdown from "../../components/filter-room-dropdown/FilterRoomDropdown";
import FieldGroup from "../../components/field-group/FieldGroup";
import FieldGroups from "../../components/field-groups/FieldGroups";
import ApiUrls from '../../ApiUrls';
import { BarChart } from "../../components/bar-chart/BarChart";

const availablePeriods = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
]

const availableDimensions = [
  { label: "Hours of day", value: "hoursOfDay" },
  { label: "Days of week", value: "daysOfWeek" }, 
  { label: "Days of month", value: "daysOfMonth" },
  { label: "Months of year", value: "monthsOfYear" },
]

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // { roomId: boolean}
  const [selectedPeriod, setSelectedPeriod] = useState(availablePeriods[3]);
  const [selectedDimension, setSelectedDimension] = useState(availableDimensions[3]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isRoomFilterOpen, setRoomFilterOpen] = useState(false);

  const fetchStats = () => {
    fetch(ApiUrls.GET_STATS.url, {
      method: ApiUrls.GET_STATS.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rooms: selectedRooms,
        period: selectedPeriod.value,
        dimension: selectedDimension.value
      })
    })
      .then((res) => res.json())
      .then((stats) => setStats(stats));
  }

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetch(ApiUrls.GET_STATS_FILTERS.url)
      .then(res => res.json())
      .then(filters => {
        setAvailableRooms(filters.rooms);
        setSelectedRooms(filters.rooms.map((room) => room.roomId));
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

  const displaySelectedRooms = () => {
    const selectedRoomNames = availableRooms.filter((room) => {
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

  const onFilterApplyClick = () => {
    fetchStats();
  }

  return (
    <div className="stats">
      <div className="stats-content">
        <FieldGroups>
          <FieldGroup fieldName="Select Room">
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
                rooms={availableRooms}
                isRoomSelected={isRoomSelected}
                onRoomFilterCheck={onRoomFilterCheck}
                setRoomFilterOpen={() => setRoomFilterOpen(false)}
              />
            }
          </FieldGroup>

          <FieldGroup fieldName="Select Period">
            <div className="select">
              <CustomSelect
                onSelectChange={({ label, value }) => setSelectedPeriod({ label, value })}
                options={availablePeriods}
                selectedValue={selectedPeriod}
                icon={faCalendar}
              />
            </div>
          </FieldGroup>

          <FieldGroup fieldName="Select Dimension">
            <div className="select">
              <CustomSelect
                onSelectChange={({ label, value }) => setSelectedDimension({ label, value })}
                options={availableDimensions}
                selectedValue={selectedDimension}
                icon={faLayerGroup}
              />
            </div>
          </FieldGroup>
      
          <Button
            onButtonClick={() => onFilterApplyClick()}
            buttonName="apply"
          />

        </FieldGroups>

        <div className="stats-chart">
          <BarChart stats={stats} />
        </div>

      </div>

    </div>
  )
}

export default Stats;
