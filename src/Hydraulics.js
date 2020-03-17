import React from 'react';
import { connect } from 'react-redux';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import AddGraphicModal from './AddGraphicModal';
import Graph from './Graph';
import { addGraph, delGraph } from './Stores/GraphActions';

class Hydraulics extends React.Component {

  addGraph = (graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    this.props.dispatch(addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
  };

  delGraph = (graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    this.props.dispatch(delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
  }

  constructor(props){
    super(props);
    this.state = {
        show: false,
        size: 0,
        accordions: [],
    };
  }

  

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClickAccordion(index) {
      const accordions = this.state.accordions.slice();
      accordions[index] = this.state.accordions[index] ? false: true;

      this.setState({
          accordions: accordions,
      });
  }

  importConfiguration = () => {
    
  }

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
  }

  deleteGraph = (hydraulicID, turbineID, attribute1, attribute2) => {
    const { graphs, dataFetcher } = this.props;
    this.delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null)
  }

  render() {
    const { graphs } = this.props;

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
                                    onDelete={ this.deleteGraph }
                      />;
                    })
                  }
                </Accordion>
              );
            })
          }

          {
            this.state.show && <AddGraphicModal show={this.state.show}
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
