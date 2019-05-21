import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import modalTheme from '../../theme/modalTheme';
import theme from '../../theme/styledTheme';

class Restricted extends React.Component {
  render() {
    return (
      <Modal
        // The only required prop
        // Boolean describing if the modal should be shown or not
        isOpen={this.props.isRestrictedModalOpen}
        ariaHideApp={false}
        // Function that will be run when the modal is requested to be closed
        // (either by clicking on overlay or pressing ESC)
        onRequestClose={this.props.closeRestrictedModal}
        style={{
          overlay: modalTheme.overlay,
          content: modalTheme.restrictedContent,
        }}
      >
        <ModalWrapper>
          <RestrictedIcon
            src="https://image.flaticon.com/icons/svg/1636/1636066.svg"
            alt="alert"
          />
          <RestrictedMsg>{this.props.alert}</RestrictedMsg>
          <RestrictedBtn onClick={this.props.closeRestrictedModal}>
            Close
          </RestrictedBtn>
        </ModalWrapper>
      </Modal>
    );
  }
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestrictedIcon = styled.img`
  max-width: 50px;
  margin: 10px auto;
`;

const RestrictedMsg = styled.div`
  line-height: ${theme.spacing.lineHeight};
  font-size: ${theme.fontSize.xs};
  text-align: center;
  color: ${theme.color.textColor};
  margin-bottom: 1rem;
`;

const RestrictedBtn = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  height: ${theme.button.smallButton};
  border: none;
  background: ${theme.color.accentGreen};
  width: 15rem;
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
`;

export default Restricted;
