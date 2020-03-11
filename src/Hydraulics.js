import React from 'react';
import { connect } from 'react-redux';
import { fetchCatalog } from './CatalogActions';

class Hydraulics extends React.Component {

  fetchCatalog = () => { this.props.fetchCatalog(); }

  render() {
    const { catalog, error, loading } = this.props;

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
    )
  }

}

const mapStateToProps = (state) => ({
  hydraulicsID: state.catalog.hydraulicsID,
  loading: state.catalog.loading,
  error: state.catalog.error
});

const mapDispatchToProps = { fetchCatalog };

export default connect(mapStateToProps, mapDispatchToProps)(Hydraulics);
