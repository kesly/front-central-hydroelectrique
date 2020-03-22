import React from 'react';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ConfigurationModal extends React.Component {

  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.onClose }>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/" encType="multipart/form-data">
            <input type="file" id="importFileSelector"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ this.props.onClose }>
            Annuler
          </Button>
          <Button variant="primary" onClick={ () => {
            this.props.onImport();
            this.props.onClose();
          } }>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

export default ConfigurationModal;
