import React from 'react';
import { connect } from 'react-redux';
import { fetchCatalog } from './CatalogActions';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

class Hydraulics extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        size: 0,
        name: 'Groupe 0',
        accordions: [],
    };
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

renderAccordion(index, name){
    return (
        <div className="main-Hydraulics">
            <Accordion
                name={name}
                index={index}
                key={index}
            />
        </div>
        
    );
}



addAccordion(){
    //let size = this.state.size;
    const accordions = Object.assign([], this.state.accordions);
    accordions.push({
      id: this.state.size,
      name: this.state.name
    });
    console.log(accordions);
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
                    name={accordion.name}
                    index={accordion.id}
                    key={accordion.id}
                    onDelete={this.handleDeleteAccordions}
                  />
                
              )
                
              ) 
            }
            </div>
            
            <button variant="secondary" className='btn' onClick={() => this.addAccordion()}>ADD HYDRAULIC</button>
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
