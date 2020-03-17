import React from 'react';
import { connect } from 'react-redux';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'
import AddGraphicModal from './AddGraphicModal'

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
    const listAccordions = this.state.accordions;
    if(this.state.size>0){
      listAccordions.pop(accordions);
    }
    accordions.push({
      id: accordions.id,
      hydraulic: hydraulic,
      graph: {
        turbine: turbine,
        attr1: attr1,
        attr2: attr2,
      }
      
    });
    listAccordions.push(accordions);
    //console.log(accordions);
    this.setState({
        accordions: listAccordions,
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
  let attr1 = '';
  let attr2 = '';
  if(form.height){
    attr1='hauteur';
  }
  if(form.position){
    if(attr1 === ''){
      attr1 = 'position';
    }else{
      attr2 = 'position';
    }
  }
  if(form.energie){
    if(attr1 === ''){
      attr1 = 'energie';
    }else{
      attr2 = 'energie';
    }
  }
  if(form.debit){
    if(attr1 === ''){
      attr1 = 'debit';
    }else{
      attr2 = 'debit';
    }
  }
  
  this.addAccordion(form.hydraulic, form.turbine, attr1, attr2);
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
                    graph={accordion.graph}
                    onDelete={this.handleDeleteAccordions}
                  />
              )) 
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

export default connect(mapStateToProps)(Hydraulics);
