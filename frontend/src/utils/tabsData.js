import { faHome, faCalendar, faHistory, faBarChart } from '@fortawesome/free-solid-svg-icons'

const tabsData = [
  {
    name: "Rooms",
    url: "/",
    pageId: 1,
    iconName: faHome
  },
  {
    name: "Sheduler",
    url: "/sheduler",
    pageId: 2,
    iconName: faCalendar 
  },
  {
    name: "History",
    url: "/history",
    pageId: 3,
    iconName: faHistory
  },
  {
    name: "Stats",
    url: "/stats",
    pageId: 4,
    iconName: faBarChart
  }
];

export default tabsData;
