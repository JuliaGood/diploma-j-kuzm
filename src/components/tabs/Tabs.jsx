import tabs from "../../utils/navigation";
import "./tabs.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Tabs() {
  return (
    <div className="tabs">
      <div className="tabs-container">
        <ul>
          {tabs.map((tab) => {
            return (
              <li key={tab.name}>
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
