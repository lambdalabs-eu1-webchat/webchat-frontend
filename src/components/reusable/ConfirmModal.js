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
        }}
      >
        <ModalWrapper>
          <p>{question}</p>
          <button onClick={this.clickYes}>Yes</button>
          <button onClick={this.clickNo}>No</button>
        </ModalWrapper>
      </Modal>
    );
  }
}

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default Confirm;
