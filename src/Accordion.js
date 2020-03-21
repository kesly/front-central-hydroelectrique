import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class Accordion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folded : "show",
            size: 0,
            turbineList: [],
        };
    }

    clicAccordion = () => {
        this.setState({
            folded: !this.state.folded ? "show" : "",
        })
    }

    render() {
        return (
          <div className={ `accordion ${this.props.className}` }>
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" onClick={this.clicAccordion}>
                    { this.props.hydraulicID }
                  </button>
                </h2>
              </div>
              <div className={ `collapse ${this.state.folded}` }>
                <div className="card-body">
                    { this.props.children }
                </div>
              </div>
            </div>
          </div>
        );
    }

}


export default Accordion;
