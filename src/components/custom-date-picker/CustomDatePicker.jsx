import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { datePickerDateFormat, datePickerTimeFormat, datePickerTimeInterval } from '../../constants';
import "./customDatePicker.style.css";

const CustomDatePicker = ({ selectedDate, onDateChange, defaultValue }) => {
  return (
    <>
      <FontAwesomeIcon icon={faCalendar} className="fa-input-icon" />
      <DatePicker
        value={selectedDate ? selectedDate : defaultValue}
        showPopperArrow={false}
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        showTimeSelect
        dateFormat={datePickerDateFormat}
        timeFormat={datePickerTimeFormat}
        timeIntervals={datePickerTimeInterval}
        onKeyDown={(e) => e.preventDefault()}
        onFocus={(e) => e.target.blur()}
      />
      <FontAwesomeIcon icon={faAngleDown} className="fa-input-arrow" />
    </>
  )
}

export default CustomDatePicker;
