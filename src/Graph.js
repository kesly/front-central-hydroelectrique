import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {  Scatter, Line } from 'react-chartjs-2';
//import PropTypes from 'prop-types'

class Graph extends React.Component{


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

    getData(){
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
            {
                label: 'My First dataset',
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
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
        };
    }

    getType(){
        return 'Line';
    }

    configOptions(){

    }

    constructor(props) {
        super(props);

        //get data from store

        this.state= {
            data : this.getData(),
            options: this.configOptions(),
            type: this.getType(),
        }

    }

    static defaultProps = {
        title: {},
    }

    static propTypes = {
         //title: PropTypes.array.isRequired,
         //turbine: PropTypes.string.isRequired,
    }


    getData2(){
        return [20, 10, 30];
    }

    configGraph(){

    }


    render() {

        let graph;
        if (this.state.type === 'Scatter') {
             graph = <Scatter data={this.state.data} options={this.state.options}/>
        } else if (this.state.type === 'Line'){
             graph = <Line data={this.state.data}/>;
        }


        return(
            <div>
                {graph}
            </div>
        )
    }


}

export default Graph;