import { useEffect, useRef } from "react";
import "./tabs.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Tabs({ activeTab, tabs, onTabClick }) {
  
  // const tabRef = useRef();

  // useEffect(() => {
    // const element = tabRef.current;
    // if (element) {
    //   element.addEventListener('touchstart', function() {
    //     // Add a class to the element to disable the hover effect
    //     element.classList.add('no-hover');
    //     alert("touchstart");
    //   });

    //   // Remove the class when the touch ends
    //   element.addEventListener('touchend', function() {
    //     element.classList.remove('no-hover');
    //     alert("touchend");
    //   });
    // }
    
  // }, []);

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
                // ref={tabRef}
              >
                <div className="tab-content">
                  <FontAwesomeIcon icon={tab.iconName} className="fa-icon"/>
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
