import "./header.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <div className="header">
      <p>smart <FontAwesomeIcon icon={faBolt} className="fa-bolt" /> light</p>
    </div>
  ) 
}

export default Header;
