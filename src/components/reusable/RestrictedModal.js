import React from 'react';
import Modal from 'react-modal';

class Restricted extends React.Component {
  render() {
    return (
      <Modal
        // The only required prop
        // Boolean describing if the modal should be shown or not
        isOpen={this.props.isRestrictedModalOpen}
        ariaHideApp={false}
        // onRequestClose={this.props.closeRestrictedModal}
        shouldCloseOnOverlayClick={true}
        // style={{ overlay: {}, content: {} }}
      >
        <div>{this.props.alert}</div>
        <button onClick={this.props.closeRestrictedModal}>Close</button>
      </Modal>
    );
  }
}

export default Restricted;
