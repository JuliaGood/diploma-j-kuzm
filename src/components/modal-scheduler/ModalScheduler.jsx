import React, { Component } from "react";
import "./modalScheduler.style.css";
import FieldGroup from "../field-group/FieldGroup";
import FieldGroups from "../field-groups/FieldGroups";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import CustomSelect from "../custom-select/CustomSelect";
import Button from "../button/Button";
import CustomSwitch from "../custom-switch/CustomSwitch";
import CustomSlider from "../custom-slider/CustomSlider";
import ApiUrls from '../../ApiUrls';

class ModalScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledRoom: {
        roomId: null,
        scheduledTime: null,
        lightStatus: true,
        brightRange: 100
      },
      roomOptions: [],
      hasScheduledTimeError: false,
    };
  }

  onRoomSelectChange = ({ value }) => {
    this.setState((prevState) => {
      return {
        ...prevState, scheduledRoom: {
          ...prevState.scheduledRoom, roomId: value
        }
      }
    });
  }

  onRoomStatusChange = (value) => {
    this.setState((prevState) => {
      return {
        ...prevState, scheduledRoom: {
          ...prevState.scheduledRoom, lightStatus: value
        }
      }
    });
  }

  onScheduledTimeChange = (value) => {
    this.setState((prevState) => {
      return {
        ...prevState, scheduledRoom: {
          ...prevState.scheduledRoom, scheduledTime: value
        }
      }
    });
  }

  onBrightRangeChange = (value) => {
    this.setState((prevState) => {
      return {
        ...prevState, scheduledRoom: {
          ...prevState.scheduledRoom, brightRange: value
        }
      }
    });
  }

  onSaveClick = () => {
    const { roomId, scheduledTime, lightStatus, brightRange } = this.state.scheduledRoom;

    // validate 
    if (!scheduledTime) {
      this.setState({ hasScheduledTimeError: true });
      return;
    }

    const request = {
      roomId: roomId,
      scheduledTime: scheduledTime,
      lightStatus: lightStatus,
      brightRange: brightRange
    }

    if (this.props.scheduledId) {
      // PUT requesr //api/scheduler/scheduledId
    } else {
      // POST request /api/scheduler
      // ApiUrls.scheduler.saveScheduler
    }


    console.log('request', request);
    this.setState({ hasScheduledTimeError: false });
    //this.props.closeModalScheduler();
  }

  getExistingScheduler() {
    if (!this.props.scheduledId) {
      return;
    }
    
    // fetch(`${ApiUrls.scheduler.getExistedScheduler}/${this.props.scheduledId}`)
    fetch(ApiUrls.scheduler.getExistedScheduler)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          scheduledRoom: {
            roomId: data.roomId,
            scheduledTime: new Date(data.scheduledTime),
            lightStatus: data.lightStatus,
            brightRange: data.brightRange
          }
        })
      });
  }

  getRooms() {
    fetch(ApiUrls.scheduler.getRooms)
    .then((res) => res.json())
    .then((data) => {
      if (data.rooms.length === 0) {
        return;
      }

      const roomOptions = data.rooms.map((room) => {
        return {
          value: room.roomId,
          label: room.roomName
        };
      });

      this.setState({ roomOptions: roomOptions }, () => {
        this.setState((prevState) => {
          return {
            ...prevState, scheduledRoom: {
              ...prevState.scheduledRoom, roomId: roomOptions[0].value
            }
          };
        });
      });
    });
  }

  componentDidMount() {
    this.getRooms();
    this.getExistingScheduler();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  findSelectedRoomOption(roomId) {
    return this.state.roomOptions.find((roomOption) => {
      return roomOption.value === roomId;
    });
  };

  render() {
    const { roomId, scheduledTime, lightStatus, brightRange } = this.state.scheduledRoom;

    return (
      <div className="modal-scheduler">
        <div className="modal-scheduler-title">Schedule your time!</div>

        <FieldGroups>
          <FieldGroup fieldName="Select Room">
            <div className="select">
              <CustomSelect
                onSelectChange={this.onRoomSelectChange}
                options={this.state.roomOptions}
                selectedValue={this.findSelectedRoomOption(roomId)}
              />
            </div>
          </FieldGroup>

          <FieldGroup fieldName="Select Time">
            <div className={`input ${this.state.hasScheduledTimeError ? "input-error" : ""}`}>
              <CustomDatePicker
                defaultValue="Pick time"
                selectedDate={scheduledTime}
                onDateChange={(date) => this.onScheduledTimeChange(date)}
              />
            </div>
          </FieldGroup>

          <FieldGroup fieldName="Light Status">
            <div className="switch">
              <CustomSwitch
                onSwitchStatusChange={this.onRoomStatusChange}
                switchStatus={lightStatus}
              />
            </div>
          </FieldGroup>

          <FieldGroup fieldName="Light Brightness">
            <div className="slider">
              <CustomSlider
                onSliderChange={this.onBrightRangeChange}
                brightRange={brightRange}
              />
            </div>
            <p className="bright-range-percent">{brightRange}%</p>
          </FieldGroup>

          <Button
            buttonName="Save"
            onButtonClick={() => this.onSaveClick()}
          />
        </FieldGroups>
      </div>
    );
  }
}

export default ModalScheduler;
