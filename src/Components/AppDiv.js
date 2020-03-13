import React from 'react';
import { connect } from 'react-redux';

import { fetchCatalog } from '../Stores/CatalogActions';

class AppDiv extends React.Component {

  fetchCatalog = () => { this.props.fetchCatalog(); }

  componentDidMount() {
    this.fetchCatalog();
  }

  render() {
    return (
      <div className="App">
        { this.props.children }
      </div>
    );
  }

}

const mapDispatchToProps = { fetchCatalog };

export default connect(null, mapDispatchToProps)(AppDiv);
