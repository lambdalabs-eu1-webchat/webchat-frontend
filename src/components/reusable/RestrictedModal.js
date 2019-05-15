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
        <RestrictedMsg>{this.props.alert}</RestrictedMsg>
        <button onClick={this.props.closeRestrictedModal}>Close</button>
      </Modal>
    );
  }
}

const RestrictedMsg = styled.div`
  line-height: ${theme.spacing.lineHeight};
  font-size: ${theme.fontSize.m};
  text-align: center;
  color: ${theme.color.textColor};
`;

export default Restricted;
