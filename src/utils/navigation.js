import { faHome, faCalendar, faHistory, faBarChart } from '@fortawesome/free-solid-svg-icons'

const navigation = [
  {
    name: "Rooms", /*Home page*/
    url: "/",
    pageId: 1,
    iconName: faHome
  },
  {
    name: "Sheduler",
    url: "/sheduler",
    pageId: 2,
    iconName: faCalendar /* faCalendarO */
  },
  {
    name: "History",
    url: "/history",
    pageId: 3,
    iconName: faHistory
  },
  {
    name: "Stats", /*Statistics*/
    url: "/stats",
    pageId: 4,
    iconName: faBarChart
  }
];

export default navigation;
