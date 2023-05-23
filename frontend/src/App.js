import "./App.css";
import tabsData from "./utils/tabsData";
import { useState } from "react";
import Header from "./components/header/Header";
import Tabs from "./components/tabs/Tabs";
import Rooms from "./pages/rooms/Rooms";
import Scheduler from "./pages/scheduler/Scheduler";
import History from "./pages/history/History";
import NoConnection from "./pages/no-connection/NoConnection";
import Stats from "./pages/stats/Stats";

const pages = {
  ROOMS: 1,
  SCHEDULER: 2,
  HISTORY: 3,
  STATS: 4
}

function App() {
  const [activeTab, setActiveTab] = useState(pages.ROOMS);

  const onTabClick = (pageId) => {
    setActiveTab(pageId);
  } 

  const pageSwitcher = () => {
    switch(activeTab) {
      case pages.ROOMS: 
        return <Rooms />;
      case pages.SCHEDULER: 
        return <Scheduler />;
      case pages.HISTORY: 
        return <History />;
      case pages.STATS: 
        return <Stats />;
      default:
        return <NoConnection />;
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
       {pageSwitcher()}
      </div>
      <Tabs 
        activeTab={activeTab}
        tabs={tabsData}
        onTabClick={onTabClick} 
      /> 
    </div>
  );
}

export default App;
