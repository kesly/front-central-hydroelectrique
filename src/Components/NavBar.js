import React from 'react';

import { connect } from "react-redux";

import Configuration from "./Configuration";
import ConfigurationModal from "./Modals/ConfigurationModal";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { show: false };
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    render() {

        return (
            <div>
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

                <ConfigurationModal show={ this.state.show } onClose={ this.handleClose } onImport={ this.props.onImport }/>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    graphs: state.graphs,
});

export default connect(mapStateToProps)(NavBar);
