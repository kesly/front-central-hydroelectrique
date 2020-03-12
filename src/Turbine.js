import React from 'react'
import Graph from './Graph'

class Turbine extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Delete',
            id: props.index,
        }
    }

    deleteTurbine = () => {

    }



    render() {
        console.log(this.state.id)
        return (
            <div className="mainAccordion" key={this.state.id}>
                
                <div className="graphe">
                    <span className="grapheContainer">
                        
                        <h4>Turbine {this.state.id}</h4> 
                        <p>Ceci est un test</p> 
                        <Graph entries={this} />
                    </span>
                </div>
                <button className="accordion" onClick={this.props.onDelete}>
                    Delete Turbine
                </button>
            </div>
        )
    };

}

export default Turbine