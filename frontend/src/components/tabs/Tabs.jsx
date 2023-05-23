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
                <div className="tab-content">
                  <FontAwesomeIcon icon={tab.iconName} className="fa-icon" />
                  <span>{tab.name}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
