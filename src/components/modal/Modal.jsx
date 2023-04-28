import React from "react";
import ReactDOM from "react-dom";
import "./modal.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const modalRoot = document.getElementById("modal-root");
const body = document.querySelector('body');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
    this.element.className = "modal";
  }

  componentDidMount() {
    modalRoot.appendChild(this.element);
    body.classList.add("modal-bg-opened");
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
    body.classList.remove("modal-bg-opened");
  }

  render() {
    return ReactDOM.createPortal(
      <div className="container">
        <div className="modal-box">
          <div className="modal-close">
            <div
              className="modal-close-btn"
              onClick={() => this.props.closeModal()}>
              <FontAwesomeIcon icon={faAngleLeft} className="fa-angle-left" />
            </div>
          </div>
          {this.props.children}
        </div>
      </div>,
      this.element
    );
  }
}

export default Modal;
