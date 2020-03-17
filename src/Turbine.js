import React from 'react'
import Graph from './Graph'
import 'bootstrap/dist/css/bootstrap.min.css';

class Turbine extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            id: props.index,
            hydraulic: props.hydraulic,
            graph: props.graph,
            //attr1: props.attr1,
            //attr2: props.attr2,
        }
    }

    onDelete= index=> {
        this.props.deleteTurbine(index);
    }

    render() {
        console.log('+++++++++++++++'+ this.state.graph);
        return (
            <div className="mainAccordion" key={this.state.id}>
                
                <div className="graphe">
                    <span className="grapheContainer">
                        <h4>{this.state.graph.turbine}</h4> 
                        <Graph 
                            hydraulicID={this.state.hydraulic} 
                            turbineID={this.state.graph.turbine} 
                            attribute="debit"
                        />
                    </span>
                </div>
                <button className="accordion" onClick={()=>this.props.onDelete(this.state.id)}>
                    Delete Turbine
                </button>
            </div>
        )
    };

}

export default Turbine