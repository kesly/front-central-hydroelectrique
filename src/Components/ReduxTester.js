import React from 'react';
import { connect } from 'react-redux';
import { addGraph, delHydraulic, delTurbine, fetchData } from '../Stores/DataActions';

class ReduxTester extends React.Component {

  addGraph = (hydraulicID, turbineID) => {
    this.props.addGraph(hydraulicID, turbineID);
  }

  delHydraulic = (hydraulicID) => {
    this.props.delHydraulic(hydraulicID);
  }

  delTurbine = (hydraulicID, turbineID) => {
    this.props.delTurbine(hydraulicID, turbineID);
  }

  fetchData = (hydraulicID, turbineID, attribute, lastData) => {
    this.props.fetchData(hydraulicID, turbineID, attribute, lastData);
  }

  render() {
    const { data } = this.props;
      console.log("test");
      console.log(Object.keys(data));
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
                              (turbineID != "high") && (
                                Object.keys(data[hydraulicID][turbineID][attribute].data).map((timestamp, index) => {
                                  return <span key={ index }>timestamp : { data[hydraulicID][turbineID][attribute].data[timestamp] }<br/></span>;
                                })
                              )
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
        <button onClick={ () => this.addGraph("Avignon", "Groupe1") }>Create Graph</button>
        <p></p>
        <span>Load Debit1 data for Avignon Groupe1</span>
        <button onClick={ () => {
          if(Object.entries(data).length > 0) {
            this.fetchData("Avignon", "Groupe1", "Debit1", Object.entries(data.Avignon.Groupe1.debit.data).length);
          }
        } }>Load Data</button>
        <p></p>
        <span>Delete Avignon hydraulic</span>
        <button onClick={ () => this.delHydraulic("Avignon") }>Delete Hydraulic</button>
        <p></p>
        <span>Delete Avignon's Groupe1 turbine</span>
        <button onClick={ () => this.delTurbine("Avignon", "Groupe1") }>Delete Turbine</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  data: state.data.data
});

const mapDispatchToProps = { addGraph, delHydraulic, delTurbine, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTester);
