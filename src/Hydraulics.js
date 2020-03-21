import React from 'react';
import { connect } from 'react-redux';
import  Accordion  from './Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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

  handleDeleteAccordions = index =>{
    const accordions = this.state.accordions.filter(accordion => accordion.id!==index);

    this.setState({
        accordions: accordions,
    });
  }

  handleSubmit = (form) => {
    const { graphs, data, dataFetcher } = this.props;
    const { hydraulicID, turbineID, attribute1, attribute2 } = form;
    this.addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2);
  }

  displayGraphsContainer = (graphs, hydraulicID) => {
    let rows = [];

    graphs[hydraulicID].forEach((graphParameters, index) => {
      if (!(index%3)) {
        rows.push([]);
      }

      rows[Math.trunc(index/3)].push(graphParameters);
    });

    return (
      <Container fluid>
        {
          rows.map((row, index) => {
            return (
              <Row key={index}>
                {
                  rows[index].map((graphParameters, index) => {
                    return (
                      <Col key={ index } lg={6} xl={4}>
                        <Graph hydraulicID={ hydraulicID }
                               turbineID={ graphParameters.turbineID }
                               attribute1={ graphParameters.attribute1 }
                               attribute2={ graphParameters.attribute2 }/>
                      </Col>
                    );
                  })
                }
              </Row>
            );
          })
        }
      </Container>
    );
  }

  render() {
    const { graphs } = this.props;

    return (
      <div className="main-Hydraulics">
        <Button variant="primary" className="sticky-top-left" onClick={ () => this.handleShow() }>
          <FontAwesomeIcon icon={ faPlus } className="mr-2"/>
          Graphique
        </Button>

          {
            Object.keys(graphs).map((hydraulicID, index) => {
              return (
                <Accordion key={ index } hydraulicID={ hydraulicID } className="mt-6">
                  { this.displayGraphsContainer(graphs, hydraulicID) }
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
