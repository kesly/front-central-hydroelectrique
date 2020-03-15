import React from 'react';
import { connect } from 'react-redux';
import { fetchCatalog } from './CatalogActions';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@material-ui/icons/Add'
import {Button} from 'react-bootstrap'
import AddGraphicModal from './AddGraphicModal'

const DATA = {
  "central 1" : ["turbine 11", "turbine 12", "turbine 13"],
  "central 2" : ["turbine 11", "turbine 12", "turbine 13"],
  "central 3" : ["turbine 11", "turbine 12", "turbine 13"],
}

class Hydraulics extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        show: false,
        size: 0,
        accordions: [],
    };
}

handleShow(){
  this.setState({ show: true });
}

handleClose = () => {
  this.setState({ show: false });
}

fetchCatalog = () => { this.props.fetchCatalog(); }

handleClickAccordion(index){
    //console.log('handleClickAccordion : '+index);
    const accordions = this.state.accordions.slice();
    accordions[index] = this.state.accordions[index] ? false: true;

    this.setState({
        size: this.state.size,
        accordions: accordions,
        name: this.state.name,
    });
}

addAccordion(hydraulic, turbine, attr1, attr2){
    //let size = this.state.size;
    //const accordions = Object.assign([], this.state.accordions);
    console.log(this.state.accordions);
    const accordions = this.state.size != 0 ?
                        this.state.accordions.filter(accordion => accordion.hydraulic === hydraulic) :
                        this.state.accordions;
    console.log(accordions);
    accordions.push({
      id: this.state.size,
      hydraulic: hydraulic,
      turbine: turbine,
      attr1: attr1,
      attr2: attr2,
    });
    //console.log(accordions);
    this.setState({
        accordions: accordions,
        size: (this.state.size+1),
    });
}


handleDeleteAccordions = index =>{
  const accordions = this.state.accordions.filter(accordion => accordion.id!==index);
  
  this.setState({
      accordions: accordions,
  });
}

handleSubmit = (form) => {
  
  if(form.height){
    
  }
  this.addAccordion(form.hydraulic, form.turbine, 'x', 'y');
}

render() {

  /*const { catalog, error, loading } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Centrales</h2>
        {
          Object.keys(this.props.hydraulicsID).map((hydraulicID, index) => {
            return <div key={index}>
              <h3>{hydraulicID}</h3>
              {
                this.props.hydraulicsID[hydraulicID].map((turbine, index) => {
                  return <span key={index}>{turbine}</span>
                })
              }
            </div>;
          })
        }
        <button onClick={this.fetchCatalog}>Load Catalog</button>
      </div>
    )*/
    return (
     
        <div className="main-Hydraulics">
            
            <div>
            {
              this.state.accordions.map((accordion) => (
                
                  <Accordion
                    hydraulic={accordion.hydraulic}
                    index={accordion.id}
                    key={accordion.id}
                    turbine={accordion.turbine}
                    attr1={accordion.attr1}
                    attr2={accordion.attr2}
                    onDelete={this.handleDeleteAccordions}
                  />
                
              )
                
              ) 
            }
            {
              this.state.show && //AddAccordion
              <AddGraphicModal
                show={this.state.show}
                onSubmit={this.handleSubmit}
                onClose={this.handleClose}
              />
            }
            </div>
            <Button variant="primary" className='btn' onClick={() => this.handleShow()}>ADD HYDRAULIC</Button> 
        </div>
    );
}

}

const mapStateToProps = (state) => ({
  hydraulicsID: state.catalog.hydraulicsID,
  loading: state.catalog.loading,
  error: state.catalog.error
});

const mapDispatchToProps = { fetchCatalog };

export default connect(mapStateToProps, mapDispatchToProps)(Hydraulics);
