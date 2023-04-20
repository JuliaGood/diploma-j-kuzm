import "./tabs.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Tabs({ activeTab, tabs, onTabClick }) {
  return (
    <div className="tabs" >
      <div className="tabs-container">
        <ul>
          {tabs.map((tab) => {
            return (
              <li 
                key={tab.name} 
                className={tab.pageId === activeTab ? "active" : ""}
                onClick={() => onTabClick(tab.pageId)}
              >
                <FontAwesomeIcon icon={tab.iconName} className="faIcon"/>
                <a href={tab.url}>{tab.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
