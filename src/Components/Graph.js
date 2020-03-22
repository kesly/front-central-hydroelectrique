import React from "react";

import { connect } from 'react-redux';
import { Scatter, Line } from 'react-chartjs-2';

import { TURBINES_COMMON_PROPERTIES, delGraph } from '../Stores/GraphActions';

import { Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Graph extends React.Component{

    delGraph = (hydraulicID, turbineID, attribute1, attribute2 = null) => {
      let { graphs, dataFetcher } = this.props;
      this.props.dispatch(delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    }

    getAttributeObjectFromProps() {
      return {
        attribute1: {
            turbineID: TURBINES_COMMON_PROPERTIES.includes(this.props.attribute1) ? "all" : this.props.turbineID,
            value: this.props.attribute1
        },
        attribute2: (
          this.props.attribute2 ? {
            turbineID: TURBINES_COMMON_PROPERTIES.includes(this.props.attribute2) ? "all" : this.props.turbineID,
            value: this.props.attribute2
          } : null
        )
      }
    }

    getDataDebit() {
        const { data, hydraulicID, turbineID } = this.props;
        const { attribute1, attribute2 } = this.getAttributeObjectFromProps();

        let attributeForTitle = {
          debit: "Débit",
          power: "Énergie produite",
          high: "Hauteur de chute",
          position: "Position des pâles"
        };

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

            return {
              datasets: [{
                label: `${hydraulicID} - ${turbineID} - ${attributeForTitle[attribute2.value]} / ${attributeForTitle[attribute1.value]}`,
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
                label: `${hydraulicID} - ${turbineID} - ${attributeForTitle[attribute1.value]}` ,
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

    render() {
        const { hydraulicID, turbineID } = this.props;
        const { attribute1, attribute2 } = this.getAttributeObjectFromProps();

        let graph;
        if (attribute2) {
            graph = <Scatter data={this.getDataDebit()}/>
        } else {
            graph = <Line data={this.getDataDebit()}/>;
        }

        return(
          <div>
            <Button className="absolute-top-right" variant="danger" onClick={() => this.delGraph(hydraulicID, turbineID, attribute1.value, (attribute2 ? attribute2.value : null))}>
              <FontAwesomeIcon icon={ faTrash }/>
            </Button>

            { graph }
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
