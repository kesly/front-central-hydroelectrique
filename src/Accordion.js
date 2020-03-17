import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Accordion.css'

class Accordion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folded : true,
            name: props.hydraulic,
            graph: props.graph,
            id: props.index,
            size: 0,
            turbineList: [],
        };
    }

    clicAccordion = () => {
        this.setState({
            folded: !this.state.folded,
        })
    }

    render() {
        return (
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button onClick={ this.clicAccordion } className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    { this.state.name }
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
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
