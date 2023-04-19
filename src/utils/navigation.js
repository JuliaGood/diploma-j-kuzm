import { faHome, faCalendar, faHistory, faBarChart } from '@fortawesome/free-solid-svg-icons'

const navigation = [
  {
    name: "Rooms", /*Home page*/
    url: "/",
    iconName: faHome
  },
  {
    name: "Sheduler",
    url: "/sheduler",
    iconName: faCalendar /* faCalendarO */
  },
  {
    name: "History",
    url: "/history",
    iconName: faHistory
  },
  {
    name: "Stats", /*Statistics*/
    url: "/stats",
    iconName: faBarChart
  }
];

export default navigation;
