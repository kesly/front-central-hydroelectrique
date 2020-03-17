import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import {connect} from 'react-redux';

class AddGraphicModal extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            show: this.props.show,
            hydraulicID: '',
            turbineID: '',
            attribute1: '',
            attribute2: '',
            sizeCheck: 0,
            high: false,
            power: false,
            position: false,
            debit: false
        }
    }

    createTurbinesItems(){
      let items = [];

      if(this.state.hydraulicID!== ''){
        this.props.hydraulicsID[this.state.hydraulicID].map((turbineList, index) => (
          items.push(<option key={index} value={turbineList}>{turbineList}</option>)
        ))
      }

      return items;
    }

      createHydraulicItems = () => {

        let items = [];
        Object.keys(this.props.hydraulicsID).map((hydraulicID, index) => (
            items.push(<option key={index} value={hydraulicID}>{hydraulicID}</option>)
        ))

        return items;
      }

    handleChangeHydraulic = (event) => {
        this.setState({
            hydraulicID: event.target.value
        })
    }

    handleChangeTurbine = (event) => {
        this.setState({
            turbineID: event.target.value
        })
    }

    handleChangeHeight = (event) => {
        if(this.state.sizeCheck<2 || this.state.high){
            this.setState({
                high: !this.state.high,
                attribute1: !this.state.high ? 'high' : '',
                attribute2: (!this.state.high && this.state.attribute1!=='') ? 'high' : '',
                sizeCheck: this.state.high ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }

    }

    handleChangePosition = (event) => {
        if(this.state.sizeCheck<2 || this.state.position){
            this.setState({
                position: !this.state.position,
                attribute1: !this.state.position ? 'position' : '',
                attribute2: (!this.state.position && this.state.attribute1!=='') ? 'position' : '',
                sizeCheck: this.state.position ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }

    }

    handleChangeEnergie = (event) => {
        if(this.state.sizeCheck<2 || this.state.power){
            this.setState({
                power: !this.state.power,
                attribute1: !this.state.power ? 'power' : '',
                attribute2: (!this.state.power && this.state.attribute1!=='') ? 'power' : '',
                sizeCheck: this.state.power ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }

    }

    handleChangeDebit = (event) => {
        if(this.state.sizeCheck<2 || this.state.debit){
            this.setState({
                debit: !this.state.debit,
                attribute1: !this.state.debit ? 'debit' : '',
                attribute2: (!this.state.debit && this.state.attribute1!=='') ? 'debit' : '',
                sizeCheck: this.state.debit ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }
        this.setState({
            debit:  this.refs.debit.checked
        })
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    cancel = () => {
        this.setState({ show: false });
        this.props.onClose();
    }

    submit = () => {
        this.setState({
            show: false,
        });

        this.props.onSubmit(this.state);
        this.props.onClose();
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        //
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Parametrage du graphique</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Centrales</Form.Label>
                  <Form.Control as="select" onChange={this.handleChangeHydraulic}>
                    <option value=''>Choisissez une centrale</option>
                    {
                      Object.keys(this.props.hydraulicsID).map((hydraulicID, index) => {
                          return <option key={index} value={hydraulicID}>{hydraulicID}</option>;
                      })
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Turbines</Form.Label>
                  <Form.Control as="select"  onChange={this.handleChangeTurbine}>
                    <option>Choisissez une turbine</option>
                    {this.createTurbinesItems()}
                  </Form.Control>
                </Form.Group>
                  <Form.Row>
                    <Form.Group className="check-box-param">

                      <div key={`inline-checkbox`} className="mb-2">
                        <Form.Check label="Hauteur de chute" ref='high' value={this.state.high} onChange={this.handleChangeHeight} disabled={this.state.sizeCheck>=2 && !this.state.high}/>
                        <Form.Check label="Position des pâles" ref='position' value={this.state.position} onChange={this.handleChangePosition} disabled={this.state.sizeCheck>=2 && !this.state.position}/>

                      </div>
                    </Form.Group>
                    <Form.Group className="check-box-param">
                      <div key={`inline-checkbox`} className="mb-2">
                        <Form.Check label="Débit" ref='debit'  value={this.state.debit} onChange={this.handleChangeDebit} disabled={this.state.sizeCheck>=2 && !this.state.debit}/>
                        <Form.Check label="Energie" ref='power' value={this.state.power} onChange={this.handleChangeEnergie} disabled={this.state.sizeCheck>=2 && !this.state.power}/>
                      </div>
                    </Form.Group>
                  </Form.Row>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.cancel}>
                Annuler
              </Button>
              <Button type="submit" variant="primary" onClick={this.submit}>
                Valider
              </Button>
            </Modal.Footer>
          </Modal>

        );
    }

}

const mapStateToProps = (state) => ({
  hydraulicsID: state.catalog.catalog,
  loading: state.catalog.loading,
  error: state.catalog.error
});

export default connect(mapStateToProps)(AddGraphicModal);
