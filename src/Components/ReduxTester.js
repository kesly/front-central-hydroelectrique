import React from 'react';
import { connect } from 'react-redux';
import { addGraph, delGraph } from '../Stores/DataFetcherActions';
import { fetchData } from '../Stores/DataActions';

class ReduxTester extends React.Component {

  addGraph = (data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    this.props.dispatch(addGraph(data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
  }

  delGraph = (dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    this.props.dispatch(delGraph(dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
  }

  fetchData = (hydraulicID, turbineID, attribute, lastData) => {
    this.props.dispatch(fetchData(hydraulicID, turbineID, attribute, lastData));
  }

  render() {
    const { data, dataFetcher } = this.props;

    return (
      <div>
        <h2>Centrales</h2>
        {
          Object.keys(data).map((hydraulicID, index) => {
            return <div key={ index }>
              <h3>{ hydraulicID }</h3>
              {
                Object.keys(data[hydraulicID]).map((turbineID, index) => {
                  return <div key={ index }>
                    <h4>{ turbineID }</h4>
                    {
                      Object.keys(data[hydraulicID][turbineID]).map((attribute, index) => {
                        return <div key={ index }>
                          <h5>{ attribute }</h5>
                          <p>
                            {
                              Object.keys(data[hydraulicID][turbineID][attribute].data).map((timestamp, index) => {
                                return <span key={ index }>{ timestamp } : { data[hydraulicID][turbineID][attribute].data[timestamp] }<br/></span>;
                              })
                            }
                          </p>
                        </div>;
                      })
                    }
                  </div>;
                })
              }
            </div>;
          })
        }
        <span>Create a graph for Avignon Groupe1</span>
        <button onClick={ () => this.addGraph(data, dataFetcher, "Avignon", "Groupe1", "power", "high") }>Create Graph</button>
        <p></p>
        <span>Delete Avignon Groupe1's graph</span>
        <button onClick={ () => this.delGraph(dataFetcher, "Avignon", "Groupe1", "power", "high") }>Delete Graph</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  data: state.data,
  dataFetcher: state.dataFetcher
});

export default connect(mapStateToProps)(ReduxTester);
