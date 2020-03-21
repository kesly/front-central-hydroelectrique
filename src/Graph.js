import React from "react";
import { Scatter, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TURBINES_COMMON_PROPERTIES, delGraph } from './Stores/GraphActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Graph extends React.Component{

    delGraph = (hydraulicID, turbineID, attribute1, attribute2 = null) => {
      let { graphs, dataFetcher } = this.props;
      this.props.dispatch(delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    }

    constructor(props) {
        super(props);

        this.state = {
            options: this.configOptions(),
            type: this.getType(),
            attribute1: {
                turbineID: TURBINES_COMMON_PROPERTIES.includes(this.props.attribute1) ? "all" : this.props.turbineID,
                value: this.props.attribute1
            }
        };

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

        const {data, hydraulicID, turbineID} = this.props;
        const {attribute1, attribute2} = this.state;

        if(Object.keys(data).length <1){
            return [];
        }

        if (this.props.attribute2) {
            let dataKeys = Object.keys(data[hydraulicID][attribute1.turbineID][attribute1.value].data);
            let twoData = [];
            let pointBackgroundColorArray = [];

            dataKeys.forEach((timestamp, index) => {
              twoData.push({
                x: data[hydraulicID][attribute1.turbineID][attribute1.value].data[timestamp],
                y:data[hydraulicID][attribute2.turbineID][attribute2.value].data[timestamp]
              });

              if (index === (dataKeys.length -1)) {
                pointBackgroundColorArray.push("red");
              }
              else {
                pointBackgroundColorArray.push("rgba(75,192,192,1)");
              }
            });

            // for (const timestamp in data[hydraulicID][attribute1.turbineID][attribute1.value].data) {
            //   twoData.push({
            //     x: data[hydraulicID][attribute1.turbineID][attribute1.value].data[timestamp],
            //     y:data[hydraulicID][attribute2.turbineID][attribute2.value].data[timestamp]
            //   });
            // }

            return {
              datasets: [{
                label: `Nuage des points: ${attribute2.value}/${attribute1.value}`,
                pointRadius: 5,
                pointBackgroundColor: pointBackgroundColorArray,
                data: twoData
              }]
            }
        }

        else {
          return {
            labels: Object.keys(data).length?[...Object.keys(data[hydraulicID][attribute1.turbineID][attribute1.value].data)]: [],
            datasets: [
              {
                label: `${hydraulicID} - ${turbineID} - ${attribute1.value}` ,
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
                data: Object.keys(data).length?[...Object.values(data[hydraulicID][attribute1.turbineID][attribute1.value].data)]: []
              }
            ]
          };
        }
    }

    getType(){
        return (this.props.attribute2)?'Scatter':'Line';
    }

    configOptions(){

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
        const { hydraulicID, turbineID } = this.props;
        const { attribute1, attribute2 } = this.state;
        
        let graph;
        if (this.state.type === 'Scatter') {
            graph = <Scatter data={this.getDataDebit()} options={this.state.options}/>
        } else if (this.state.type === 'Line'){
            graph = <Line data={this.getDataDebit()}/>;
        }

        return(
          <div>
            <Button className="absolute-top-right" variant="danger" onClick={() => this.delGraph(hydraulicID, turbineID, attribute1.value, (attribute2 ? attribute2.value : null))}>
              <FontAwesomeIcon icon={ faTrash }/>
            </Button>
            {graph}
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    graphs: state.graphs,
    data: state.data,
    dataFetcher: state.dataFetcher
});

export default connect(mapStateToProps)(Graph);
