import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import {connect} from 'react-redux';
const TURBINES = ["Lyon", "Pékin", "Geneve", "Paris"];
const HYDRAULICS = ["France", "Guinée", "Norvège", "Suisse"];

class AddGraphicModal extends React.Component {

    
    constructor(props){
        super(props);
        
        this.state = {
            show: this.props.show,
            sizeCheck: 0,
            hydraulic: null,
            turbine: null,
            height: false,
            energie: false,
            position: false,
            debit: false,
            attr1: '',
            attr2: '',
        }
    }

    createTurbinesItems(){
      let items = [];
      console.log(this.state.hydraulic);
      if(this.state.hydraulic!== null){
        this.props.hydraulicsID[this.state.hydraulic].map((turbineList) => (
          items.push(<option value={turbineList}>{turbineList}</option>)
        ))
      }  
      
      return items;
    }
      
      createHydraulicItems = () => {
        console.log(this.props.hydraulicsID);
        let items = [];   
        Object.keys(this.props.hydraulicsID).map((hydraulic) => (
            items.push(<option value={hydraulic}>{hydraulic}</option>)
        ))      
        console.log(items);
        return items;
      }

    handleChangeHydraulic = (event) => {
        this.setState({
            hydraulic: event.target.value
        })
    }

    handleChangeTurbine = (event) => {
        this.setState({
            turbine: event.target.value
        })
    }
    
    handleChangeHeight = (event) => {
        if(this.state.sizeCheck<2 || this.state.height){
            this.setState({
                height:  this.refs.height.checked,
                height: !this.state.height,
                attr1: !this.state.height ? 'height' : '',
                attr2: (!this.state.height && this.state.attr1!=='') ? 'height' : '',
                sizeCheck: this.state.height ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }
        
    }

    handleChangePosition = (event) => {
        if(this.state.sizeCheck<2 || this.state.position){
            this.setState({
                position: this.refs.position.checked,
                position: !this.state.position,
                attr1: !this.state.position ? 'position' : '',
                attr2: (!this.state.position && this.state.attr1!=='') ? 'position' : '',
                sizeCheck: this.state.position ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }
        
    }

    handleChangeEnergie = (event) => {
        if(this.state.sizeCheck<2 || this.state.energie){
            this.setState({
                energie: this.refs.energie.checked,
                energie: !this.state.energie,
                attr1: !this.state.energie ? 'energie' : '',
                attr2: (!this.state.energie && this.state.attr1!=='') ? 'energie' : '',
                sizeCheck: this.state.energie ? (this.state.sizeCheck-1) : (this.state.sizeCheck+1),
            })
        }
        
    }

    handleChangeDebit = (event) => {
        if(this.state.sizeCheck<2 || this.state.debit){
            this.setState({
                debit:  this.refs.debit.checked,
                debit: !this.state.debit,
                attr1: !this.state.debit ? 'debit' : '',
                attr2: (!this.state.debit && this.state.attr1!=='') ? 'debit' : '',
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
                    <option>Choisissez une centrale</option>
                    {this.createHydraulicItems()}
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
                        <Form.Check label="Hauteur de chutte" ref='height' value={this.state.height} onChange={this.handleChangeHeight} disabled={this.state.sizeCheck>=2 && !this.state.height}/>
                        <Form.Check label="Position des pâles" ref='position' value={this.state.position} onChange={this.handleChangePosition} disabled={this.state.sizeCheck>=2 && !this.state.position}/>
                        
                      </div>
                    </Form.Group>
                    <Form.Group className="check-box-param">
                      <div key={`inline-checkbox`} className="mb-2">
                        <Form.Check label="Débit" ref='debit'  value={this.state.debit} onChange={this.handleChangeDebit} disabled={this.state.sizeCheck>=2 && !this.state.debit}/>
                        <Form.Check label="Energie" ref='energie' value={this.state.energie} onChange={this.handleChangeEnergie} disabled={this.state.sizeCheck>=2 && !this.state.energie}/>
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
  hydraulicsID: state.catalog.hydraulicsID,
  loading: state.catalog.loading,
  error: state.catalog.error
});

export default connect(mapStateToProps)(AddGraphicModal);