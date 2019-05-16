import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import modalTheme from '../theme/modalTheme';
import theme from '../theme/styledTheme';

class TranslateModal extends React.Component {
  render() {
    return (
      <Modal
        // The only required prop
        // Boolean describing if the modal should be shown or not
        isOpen={this.props.isTranslateModalOpen}
        ariaHideApp={false}
        // Function that will be run when the modal is requested to be closed
        // (either by clicking on overlay or pressing ESC)
        onRequestClose={this.props.closeTranslateModal}
        style={{
          overlay: modalTheme.translateOverlay,
          content: modalTheme.translateContent,
        }}
      >
        <ModalWrapper>
          {this.props.translations.map((message, idx) => (
            <Msg key={idx}> - {message.translatedText}</Msg>
          ))}
        </ModalWrapper>
      </Modal>
    );
  }
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Msg = styled.div`
  line-height: ${theme.spacing.lineHeight};
  font-size: ${theme.fontSize.sm};
  text-align: left;
  color: ${theme.color.textColor};
  margin-bottom: 1rem;
`;

export default TranslateModal;
