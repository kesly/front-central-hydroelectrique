import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {  Scatter, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { addGraph, delHydraulic, delTurbine, fetchData } from './Stores/DataActions';
//import PropTypes from 'prop-types'

class Graph extends React.Component{


    addGraph = (hydraulicID, turbineID) => {
        this.props.addGraph(hydraulicID, turbineID);
    };

    delHydraulic = (hydraulicID) => {
        this.props.delHydraulic(hydraulicID);
    };

    delTurbine = (hydraulicID, turbineID) => {
        this.props.delTurbine(hydraulicID, turbineID);
    };

    fetchData = (hydraulicID, turbineID, attribute, lastData) => {
        this.props.fetchData(hydraulicID, turbineID, attribute, lastData);
    };



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

    getDataDebit(){
        return {
            labels: [...Object.keys(this.props.data.Avignon.Groupe1.debit.data)],
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
                    data: [...Object.values(this.props.data.Avignon.Groupe1.debit.data)]
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

        // add new graph
        this.addGraph(this.props.hydraulicID, this.props.turbineID);

        //get data from store

        this.state= {
            data : this.getData(),
            options: this.configOptions(),
            type: this.getType(),
        }

    }

    static defaultProps = {
        title: {},
    };

    static propTypes = {
         //title: PropTypes.array.isRequired,
         //turbine: PropTypes.string.isRequired,
    };


    getData2(){
        return [20, 10, 30];
    }

    configGraph(){

    }


    render() {

        const { data } = this.props;


        let graph;
        if (this.state.type === 'Scatter') {
             graph = <Scatter data={this.state.data} options={this.state.options}/>
        } else if (this.state.type === 'Line'){
             graph = <Line data={this.state.data}/>;
        }

        return(
            <div>
                <button onClick={ () => {
                    if(Object.entries(data).length > 0) {
                        this.fetchData(this.props.hydraulicID, this.props.turbineID, this.props.attribute, Object.entries(data.Avignon.Groupe1.debit.data).length);
                        this.setState({data: this.getDataDebit()});
                    }
                } }>Load Data</button>

                {graph}
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    data: state.data.data
});
const mapDispatchToProps = { addGraph, delHydraulic, delTurbine, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(Graph);