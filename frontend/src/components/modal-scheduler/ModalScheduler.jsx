import React, { Component } from "react";
import "./modalScheduler.style.css";
import FieldGroup from "../field-group/FieldGroup";
import FieldGroups from "../field-groups/FieldGroups";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import CustomSelect from "../custom-select/CustomSelect";
import Button from "../button/Button";
import CustomSwitch from "../custom-switch/CustomSwitch";
import ApiUrls from '../../ApiUrls';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class ModalScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledRoom: {
        roomId: null,
        scheduledTime: null,
        lightStatus: true,
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

  isEditMode = () => {
    return this.props.scheduleId !== null
      && this.props.scheduleId !== undefined;
  }

  onSaveClick = () => {
    const { roomId, scheduledTime, lightStatus } = this.state.scheduledRoom;

    // validate 
    if (!scheduledTime) {
      this.setState({ hasScheduledTimeError: true });
      return;
    }

    const request = {
      roomId: roomId,
      scheduledTime: scheduledTime,
      lightStatus: lightStatus,
    }

    if (this.isEditMode()) {
      fetch(ApiUrls.EDIT_SCHEDULE.url(this.props.scheduleId), {
        method: ApiUrls.EDIT_SCHEDULE.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ hasScheduledTimeError: false });
            this.props.closeModalScheduler();
            this.props.fetchSchedules();
          } else {
            console.log("Error", res);
          }
        });

    } else {
      fetch(ApiUrls.ADD_SCHEDULE.url, {
        method: ApiUrls.ADD_SCHEDULE.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((res) => {
          if (res.status === 201) {
            this.setState({ hasScheduledTimeError: false });
            this.props.closeModalScheduler();
            this.props.fetchSchedules();
          } else {
            console.log("Error", res);
          }
        })
    }
  }

  onDeleteClick = () => {
    fetch(ApiUrls.REMOVE_SCHEDULE.url(this.props.scheduleId), {
      method: ApiUrls.REMOVE_SCHEDULE.method
    }) 
    .then((res) => {
      if (res.status === 200) {
        this.setState({ hasScheduledTimeError: false });
        this.props.closeModalScheduler();
        this.props.fetchSchedules();
      } else {
        console.log("Error", res);
      }
    })
  }

  fetchExistingSchedule() {
    fetch(ApiUrls.GET_SCHEDULE.url(this.props.scheduleId))
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          scheduledRoom: {
            roomId: data.roomId,
            scheduledTime: new Date(data.scheduledTime),
            lightStatus: data.lightStatus,
          }
        })
      });
  }

  fetchRooms() {
    fetch(ApiUrls.GET_ROOMS.url)
      .then((res) => res.json())
      .then((rooms) => {
        if (rooms.length === 0) {
          return;
        }
        const roomOptions = rooms.map((room) => {
          return {
            value: room.roomId,
            label: room.roomName
          };
        });

        this.setState({ roomOptions: roomOptions }, () => {
          if (this.props.scheduleId) {
            return;
          }

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
    this.fetchRooms();

    if (this.isEditMode()) {
      this.fetchExistingSchedule();
    }
  }

  findSelectedRoomOption(roomId) {
    return this.state.roomOptions.find((roomOption) => {
      return roomOption.value === roomId;
    });
  };

  render() {
    const { roomId, scheduledTime, lightStatus } = this.state.scheduledRoom;

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
                icon={faHome}
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

          <Button
            buttonName="Save"
            onButtonClick={() => this.onSaveClick()}
          />

          {this.isEditMode() &&
            <Button
              buttonName="Delete"
              buttonClass="btn-delete"
              onButtonClick={() => this.onDeleteClick()}
            />
          }

        </FieldGroups>
      </div>
    );
  }
}

export default ModalScheduler;
