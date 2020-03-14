import React from 'react'
import Turbine from './Turbine'
import './Accordion.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Accordion extends React.Component {

    constructor(props) {
        super(props);
        console.log('++++++++++++++++++++++++++++' + props.index);
        this.state = {
            folded : false,
            name: props.name,
            id: props.index,
            size: 0,
            turbineList: [],
        };
        
    }

    renderTurbine(index){

        return (
            <div className="main-hydrolic">
                
                <Turbine
                    name={this.state.name}
                    index={index}
                    key={index}
                    onDelete={this.deleteTurbine}
                />
            </div>
        );
    }

    deleteTurbine = (index) => {
        
        const turbineList = this.state.turbineList.filter(turbine => turbine.id!==index);
        if(this.state.size === 0){
            this.props.onDelete(this.state.id);
        }
        this.setState({
            turbineList: turbineList,
        });
    }

    addTurbine(){
        let size = this.state.size;
        const turbineList = this.state.turbineList;
        
        turbineList.push({
            id: this.state.size,
            name: this.state.name,
            attribute: {x: 'hauteur', y: 'debit'}
        });

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
            <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button onClick={() => this.clicAccordion()} className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Group {this.state.id}
              </button>
            </h2>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                { this.state.folded &&
                    this.state.turbineList.map(turbine => (
                        <Turbine
                            name={turbine.name}
                            index={turbine.id}
                            key={turbine.id}
                            onDelete={this.deleteTurbine}
                        />
                    ))
                }
            </div>
          </div>
        </div>
        <button className='add-hydrolyc' onClick={() => this.addTurbine()}>Add Turbine</button>
        <button className='add-hydrolyc' onClick={() => this.props.onDelete(this.state.id)}>Delete Turbine</button>
      </div>
        

           
        )
    };
};



export default Accordion;