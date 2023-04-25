import "./scheduler.style.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faCalendar } from '@fortawesome/free-solid-svg-icons';
import calendarImg from "../../assets/calendar2.png";

const Scheduler = () => {

  const [scheduler, setScheduler] = useState([]);

  useEffect(() => {
    fetch('/placeholders/scheduler-data.json')
      .then(res => res.json())
      .then(scheduler => setScheduler(scheduler))
  }, []);

  return (
    <div className="scheduler">
      <div className="scheduler-add">
        <div className="scheduler-add-btn">
          <FontAwesomeIcon icon={faPlus} className="fa-plus" />
        </div>
      </div>

      <div className="scheduler-content">

        {/* <div className="scheduler-content-empty">
          <img src={calendarImg} alt="calendar" />
          // <FontAwesomeIcon icon={faCalendar} className="fa-calendar" />
          <p>Nothing in Scheduled</p>
        </div> */}

        <div className="scheduler-content-full">
          <div className="scheduler-table">
            <div className="table-header">
              <div className="col col-1">Room</div>
              <div className="col col-2">Status</div>
              <div className="col col-3">Bright</div>
              <div className="col col-4">Date</div>
              <div className="col col-5">Time</div>
              <div className="col col-6"></div>
            </div>


            {scheduler.map((scheduledRoom) => {
              return (
                <div className="table-row" key={scheduledRoom.uuid}>
                  <div className="col col-1">{scheduledRoom.roomName}</div>
                  <div className="col col-2">{scheduledRoom.status}</div>
                  <div className="col col-3 col-num">{scheduledRoom.bright}%</div>
                  <div className="col col-4 col-num">{scheduledRoom.date}</div>
                  <div className="col col-5 col-num">{scheduledRoom.time}</div>
                  <div className="col col-6 col-num"><FontAwesomeIcon icon={faPencil} className="fa-pencil" /></div>
                </div>
              )
            })}

          </div>

        </div>
      </div>

    </div>
  )
}

export default Scheduler;