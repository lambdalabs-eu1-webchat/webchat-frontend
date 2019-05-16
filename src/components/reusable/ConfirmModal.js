import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import modalTheme from '../../theme/modalTheme';
import theme from '../../theme/styledTheme';

class Confirm extends React.Component {
  clickYes = () => {
    this.props.yesCallBack();
    this.props.closeModal();
  };

  clickNo = () => {
    if (this.props.noCallBack) {
      this.props.noCallBack();
    }
    this.props.closeModal();
  };
  render() {
    const { isOpen, closeModal, question } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        // Function that will be run when the modal is requested to be closed
        // (either by clicking on overlay or pressing ESC)
        onRequestClose={closeModal}
        style={{
          overlay: modalTheme.overlay,
          content: modalTheme.restrictedContent,
        }}
      >
        <ModalWrapper>
          <p className="question">{question}</p>
          <button onClick={this.clickYes}>Yes</button>
          <button onClick={this.clickNo}>No</button>
        </ModalWrapper>
      </Modal>
    );
  }
}

const ModalWrapper = styled.div`
  .question {
    width: 100%;
    text-align: center;
  }
  button {
    height: 30px;
    margin: 15px;
  }
  align-items: space-around;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
`;

export default Confirm;
