import React from 'react'
import PropType from 'prop-type'
import Turbine from './Turbine'
import Graph from './Graph'
import './Accordion.css'

class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folded : false,
            name: props.name,
            id: props.index,
            size: 0,
            turbineList: [],
        }
    }

    renderTurbine(index){

        return (
            <div className="main-hydrolic">
                
                <Turbine
                    name={this.state.name}
                    index={index}
                    key={index}
                    onDelete={() => this.deleteTurbine(index)}
                />
            </div>
        );
    }

    deleteTurbine(index){
        const turbineList = this.state.turbineList;

        turbineList.filter(function(value, index, arr){ return index != turbineList.index});

        console.log('Index : '+index);
        console.log('list Turbine : ' + turbineList);
        this.setState({
            turbineList: turbineList,
        });
    }

    addTurbine(){
        let size = this.state.size;
        const turbineList = this.state.turbineList.slice();
        //console.log(this.state.size);
        turbineList.push(this.renderTurbine(size));

        this.setState({
            turbineList: turbineList,
            size: (size+1),
        });
    }

    clicAccordion(){
        this.setState({
            folded: !this.state.folded,
        })
    }

    render() {
        console.log(this.state.turbineList);
        return (
            <div className="mainAccordion" key={this.state.id}>
                <h3>Group {this.state.id}</h3> 
                <div className="graphe">
                    <span className="grapheContainer">
                        {this.state.turbineList}
                    </span>
                </div>
                <button className='add-hydrolyc' onClick={() => this.addTurbine()}>Add Turbine</button>
                
            </div>
        )
    };
};



export default Accordion;