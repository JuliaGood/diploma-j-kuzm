import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import "./customSelect.style.css";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faAngleDown} className="fa-input-arrow" />
      </components.DropdownIndicator>
    )
  );
};

const ValueContainer = ({ children, ...props }) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && (
           <FontAwesomeIcon icon={props.selectProps.icon} className="fa-input-icon" />
        )}
        {children}
      </components.ValueContainer>
    )
  );
};

const CustomSelect = ({ options, onSelectChange, selectedValue, icon }) => {
  return (
    <Select
      onChange={onSelectChange}
      value={selectedValue}
      className="react-select-container"
      classNamePrefix="react-select"
      icon={icon}
      components={{ DropdownIndicator, ValueContainer }}
      options={options}
    />
  )
}

export default CustomSelect;
