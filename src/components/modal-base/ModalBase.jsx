import React, { Component } from "react";
import Modal from "../modal/Modal";
import "./modalBase.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

class ModalBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <>
        {this.state.isModalOpen && <Modal>
          <div className="container">
            <div className="modal-box">
              <div className="modal-close">
                <div
                  className="modal-close-btn"
                  onClick={() => this.closeModal()}>
                  <FontAwesomeIcon icon={faAngleLeft} className="fa-angle-left" />
                </div>
              </div>
              {this.props.children}
            </div>
          </div>
        </Modal>}
      </>
    );
  }
}

export default ModalBase;