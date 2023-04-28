import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Constants from '../../Constants';
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
        dateFormat={Constants.DATE_PICKER_DATE_FORMAT}
        timeFormat={Constants.DATE_PICKER_TIME_FORMAT}
        timeIntervals={Constants.DATE_PICKER_TIME_INTERVAL}
        onKeyDown={(e) => e.preventDefault()}
        onFocus={(e) => e.target.blur()}
      />
      <FontAwesomeIcon icon={faAngleDown} className="fa-input-arrow" />
    </>
  )
}

export default CustomDatePicker;
