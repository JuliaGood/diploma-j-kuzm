import "./App.css";
import tabsData from "./utils/navigation";
import { useState } from "react";
import Tabs from "./components/tabs/Tabs";
import Rooms from "./components/rooms/Rooms";

const pages = {
  ROOMS: 1,
  SCHEDULER: 2,
  HISTORY: 3,
  STATS: 4
}

function App() {
  const [activeTab, setActiveTab] = useState(pages.ROOMS);

  const onTabClick = (pageId) => {
    console.log("tab click", pageId);
    setActiveTab(pageId);
  } 

  const pageSwitcher = () => {
    switch(activeTab) {
      case pages.ROOMS: 
        return <Rooms />;
      case pages.SCHEDULER: 
        return <div>SCHEDULER page</div>;
      case pages.HISTORY: 
        return <div>HISTORY page</div>;
      case pages.STATS: 
        return <div>STATS page</div>;
    }
  }

  return (
    <div className="App">
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
