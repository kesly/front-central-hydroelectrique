import React from 'react'
import Graph from './Graph'
import 'bootstrap/dist/css/bootstrap.min.css';

class Turbine extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            id: props.index,
        }
    }

    onDelete= index=> {
        this.props.deleteTurbine(index);
    }



    render() {
        
        return (
            <div className="mainAccordion" key={this.state.id}>
                
                <div className="graphe">
                    <span className="grapheContainer">
                        <h4>{this.state.name}</h4> 
                        <Graph />
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