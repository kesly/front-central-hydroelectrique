import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {  Scatter, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { addGraph, delHydraulic, delTurbine } from './Stores/DataFetcherActions';
import { fetchData } from './Stores/DataActions';
import PropTypes from 'prop-types'

class Graph extends React.Component{


    addGraph = (data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) => {
        this.props.addGraph(data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2);
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

    getDataDebit(){

        const {data, hydraulicID, turbineID, attribute} = this.props;

        return {
            labels: Object.keys(data).length!==0?[...Object.keys(data[hydraulicID][turbineID][attribute].data)]: [],
            datasets: [
                {
                    label: `${hydraulicID} - ${turbineID} - ${attribute}` ,
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
                    data: Object.keys(data).length!==0?[...Object.values(data[hydraulicID][turbineID][attribute].data)]: []
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
        // add new graph
        this.addGraph(this.props.data, this.props.dataFetcher, this.props.hydraulicID, this.props.turbineID,  this.props.attribute);

        this.state= {

            options: this.configOptions(),
            type: this.getType(),
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
    dataFetcher: state.dataFetcher
});

const mapDispatchToProps = { addGraph, delHydraulic, delTurbine, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(Graph);