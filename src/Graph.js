import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {  Scatter, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { TURBINES_COMMON_PROPERTIES } from "./Stores/GraphActions";
import PropTypes from 'prop-types';

class Graph extends React.Component{


    // addGraph = (graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
    //     this.props.addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2);
    // };



    getDataFromStore(){
      return {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }]
            }]
        };
    }

    getDataDebit(){

        const { data, hydraulicID, turbineID } = this.props;
        const { attribute1, attribute2 } = this.state;
console.log(data)
console.log(attribute1.turbineID)
console.log(attribute1.value)
        return {
            labels: Object.keys(data).length!==0?[...Object.keys(data[hydraulicID][attribute1.turbineID][attribute1.value].data)]: [],
            datasets: [
                {
                    label: `${hydraulicID} - ${turbineID} - ${attribute1}` ,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Object.keys(data).length!==0?[...Object.values(data[hydraulicID][attribute1.turbineID][attribute1.value].data)]: []
                }
            ]
        };
    }

    getType(){
        return (this.props.attribute2)?'Scatter':'Line';
    }

    configOptions(){

    }

    constructor(props) {
        super(props);

        // let { graphs, data, dataFetcher, hydraulicID, turbineID, attribute1 } = this.props;

        // add new graph
        // this.addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1);

        this.state= {
            options: this.configOptions(),
            type: this.getType(),
            attribute1: {
              turbineID: TURBINES_COMMON_PROPERTIES.includes(this.props.attribute1) ? "all" : this.props.turbineID,
              value: this.props.attribute1
            }
        }

        if (this.props.attribute2) {
          this.state = {
            ...this.state,
            attribute2: {
              turbineID: TURBINES_COMMON_PROPERTIES.includes(this.props.attribute2) ? "all" : this.props.turbineID,
              value: this.props.attribute2
            }
          }
        }

    }

    static defaultProps = {
        title: {},
        type: 'Line'
    };

    static propTypes = {
         //title: PropTypes.array.isRequired,
        turbineID: PropTypes.string.isRequired,
    };


    getData2(){
        return [20, 10, 30];
    }

    configGraph(){

    }

    render() {

        let graph;
        if (this.state.type === 'Scatter') {
            graph = <Scatter data={this.getDataDebit()} options={this.state.options}/>
        } else if (this.state.type === 'Line'){
            graph = <Line data={this.getDataDebit()}/>;
        }

        return(
            <div>
                {graph}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    // dataFetcher: state.dataFetcher,
    // graphs: state.graphs
});

// const mapDispatchToProps = { addGraph };

export default connect(mapStateToProps/* , mapDispatchToProps */)(Graph);
