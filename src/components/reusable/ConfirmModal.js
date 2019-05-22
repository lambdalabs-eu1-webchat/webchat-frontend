import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import theme from './../../theme/styledTheme';

import modalTheme from '../../theme/modalTheme';

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
          <button className="cancel" onClick={this.clickNo}>No</button>
        </ModalWrapper>
      </Modal>
    );
  }
}

const ModalWrapper = styled.div`
  .question {
    width: 100%;
    text-align: center;
    font-size: ${theme.fontSize.message};
  }
  button {
    height: ${theme.button.smallButton};
    border: none;
    background: ${theme.color.accentGreen};
    width: 15rem;
    margin: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    color: ${theme.color.white};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
      transition: all 0.3s ease;
    }
  }
  
  .cancel {
    background: ${theme.color.accentPurple};
  }
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  padding: 2rem 0;
`;

export default Confirm;
