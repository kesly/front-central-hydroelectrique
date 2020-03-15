import React from 'react'
import Turbine from './Turbine'
import './Accordion.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folded : true,
            name: props.hydraulic,
            turbine: props.turbine,
            attr1: props.attr1,
            attr2: props.attr2,
            id: props.index,
            size: 0,
            turbineList: [],
        };
        this.addTurbine();
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
            name: this.state.turbine,
            hydraulic: this.state.name,
            attr1: this.state.attr1,
            attr2: this.state.attr2,
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
        
        return (
            <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button onClick={() => this.clicAccordion()} className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {this.state.name}
              </button>
            </h2>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                { this.state.folded &&
                    this.state.turbineList.map(turbine => (
                        <Turbine
                            index={turbine.id}
                            hydraulic={turbine.hydraulic}
                            name={turbine.name}
                            attr1={turbine.attr1}
                            attr2={turbine.attr2}
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