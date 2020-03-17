import React from 'react';
import { connect } from 'react-redux';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@material-ui/icons/Add';
import {Button} from 'react-bootstrap';
import AddGraphicModal from './AddGraphicModal';
import Graph from './Graph';

import { addGraph } from './Stores/GraphActions';

class Hydraulics extends React.Component {

  addGraph = (graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    this.props.dispatch(addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
  };

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

  /* addAccordion(hydraulic, turbine, attr1, attr2){
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
  } */


  handleDeleteAccordions = index =>{
    const accordions = this.state.accordions.filter(accordion => accordion.id!==index);

    this.setState({
        accordions: accordions,
    });
  }

  handleSubmit = (form) => {
    const { graphs, data, dataFetcher } = this.props;
    const { hydraulicID, turbineID, attribute1, attribute2 } = form;

    this.addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 );
    // if(form.height){
    //
    // }
    // this.addAccordion(form.hydraulic, form.turbine, 'x', 'y');
  }

  render() {
    const { graphs } = this.props;
    /* const { catalog, error, loading } = this.props;

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
      ) */
      return (
          <div className="main-Hydraulics">
            <Button variant="primary" className='btn' onClick={ () => this.handleShow() }>ADD HYDRAULIC</Button>

              {
                Object.keys(graphs).map((hydraulicID, index) => {
                  return (
                    <Accordion key={ index } hydraulic={ hydraulicID }>
                      {
                        graphs[hydraulicID].map((graphParameters, index) => {
                          return <Graph key={ index }
                                        hydraulicID={ hydraulicID }
                                        turbineID={ graphParameters.turbineID }
                                        attribute1={ graphParameters.attribute1 }
                                        attribute2={ graphParameters.attribute2 }
                          />;
                        })
                      }
                    </Accordion>
                  );
                })
              }
              {/* <div>
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
              </div> */}
              {
                this.state.show && //AddAccordion
                <AddGraphicModal
                  show={this.state.show}
                  onSubmit={this.handleSubmit}
                  onClose={this.handleClose}
                />
              }
          </div>
      );
  }

}

const mapStateToProps = (state) => ({
  graphs: state.graphs,
  data: state.data,
  dataFetcher: state.dataFetcher,
  hydraulicsID: state.catalog.hydraulicsID,
  loading: state.catalog.loading,
  error: state.catalog.error,
});

export default connect(mapStateToProps)(Hydraulics);
