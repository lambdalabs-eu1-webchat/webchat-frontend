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
  font-size: ${theme.fontSize.sm};
  text-align: left;
  color: ${theme.color.textColor};
  margin-bottom: 1rem;
`;

const RestrictedBtn = styled.button`
  align-self: end;
  width: 100px;
  color: ${theme.color.white};
`;

export default Restricted;
