import "./noConnection.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlug /** faGrav  */  } from '@fortawesome/free-solid-svg-icons';

const NoConnection = () => {

  return (
    <div className="no-connection">

      <div className="no-connection-content">
          <FontAwesomeIcon icon={faPlug} className="fa-plug" />
          <p>no connection</p>
      </div>

    </div>
  )
}

export default NoConnection;
