import React from 'react';
import { connect } from 'react-redux';

import { fetchCatalog } from '../Stores/CatalogActions';
import { fetchData } from '../Stores/DataActions';

class AppDiv extends React.Component {

  fetchCatalog = () => { this.props.dispatch(fetchCatalog()); }

  runDataFetcher = () => {
    const { dataFetcher } = this.props;

    // Pour chaque centrale
    Object.keys(dataFetcher).forEach((hydraulicID, index) => {
      // Pour chaque turbine
      Object.keys(dataFetcher[hydraulicID]).forEach((turbineID, index) => {
        // Pour chaque attribut
        dataFetcher[hydraulicID][turbineID].forEach((attribute, index) => {
          // Récupérer la donnée
          this.props.dispatch(fetchData(hydraulicID, turbineID, attribute));
        });
      });
    });

    // Récupère les données une nouvelle fois dans 1000 millisecondes
    // setTimeout(() => this.runDataFetcher(), 1000);
  }

  componentDidMount() {
    this.fetchCatalog();
    this.runDataFetcher();
  }

  render() {
    return (
      <div className="App">
        { this.props.children }
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  dataFetcher: state.dataFetcher
});

export default connect(mapStateToProps)(AppDiv);
