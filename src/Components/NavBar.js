import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Configuration from "../Configuration";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "@material-ui/core/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }

    }

    handleShow = () => {
        this.setState({show: true});
    };

    handleClose = () => {
        this.setState({show: false});
    };

    render() {

        return (
            <div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form action="/" encType="multipart/form-data">
                      <input type="file" id="importFileSelector"/>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={() => {
                      this.props.onImport();
                      this.handleClose();
                    }}>
                      Valider
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Hydraulics</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Import" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={this.handleShow}>
                                  Import à partir d'un fichier
                                  </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={() => Object.assign(this.props.graphs, Configuration.restoreConfiration())}>
                                  Import à partir du navigateur
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Export" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={this.props.onExport}>
                                  Export dans un fichier
                                  </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={() => Configuration.saveConfiguration(this.props.graphs)}>
                                  Export dans le navigateur
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    graphs: state.graphs,
});

export default connect(mapStateToProps)(NavBar);
