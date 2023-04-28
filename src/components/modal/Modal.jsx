import React from "react";
import ReactDOM from "react-dom";
import "./modal.style.css";

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
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Modal;
