 import React from 'react';
 import { saveAs } from 'file-saver';
 import { connect } from "react-redux";
 import NavBar from './Components/NavBar'
 import { addGraph, delGraph } from './Stores/GraphActions';

const GRAPH_KEY = "graphs";

class Configuration extends React.Component {

    addGraph = (hydraulicID, turbineID, attribute1, attribute2 = null) => {
      let { graphs, data, dataFetcher } = this.props;
      this.props.dispatch(addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    };

    delGraph = (hydraulicID, turbineID, attribute1, attribute2 = null) => {
      let { graphs, dataFetcher } = this.props;
      this.props.dispatch(delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    }

    constructor(props) {
        super(props);
    }

    static saveConfiguration = (graphs) => {
        console.log("enreigistre");
        // sauvegarde la config actuelle dans le store
        localStorage.setItem(GRAPH_KEY, JSON.stringify(graphs));
    }

    static restoreConfiration = () => {
        // modify the graph


        return JSON.parse(localStorage.getItem(GRAPH_KEY) );
    }

    importConfiguration = () => {
      let reader = new FileReader();

      reader.onload = () => {
        let dataToImport = JSON.parse(reader.result);

        Object.keys(this.props.graphs).forEach((hydraulicID, index) => {
          this.props.graphs[hydraulicID].forEach((graphParameters, index) => {
            let { turbineID, attribute1, attribute2 } = graphParameters;
            this.delGraph(hydraulicID, turbineID, attribute1, attribute2);
          });
        });

        Object.keys(dataToImport).forEach((hydraulicID, index) => {
          dataToImport[hydraulicID].forEach((graphParameters, index) => {
            let { turbineID, attribute1, attribute2 } = graphParameters;
            this.addGraph(hydraulicID, turbineID, attribute1, attribute2);
          });
        });
      };

      reader.readAsText(document.getElementById("importFileSelector").files[0]);
    }

    exportConfiguration = () => {
      let blob = new Blob(
        [JSON.stringify(this.props.graphs)],
        { type: "text/plain;charset=utf-8" }
      );

      saveAs(blob, "export.txt");
    }

    render() {
      return (
        <div>
          <NavBar onImport={ this.importConfiguration } onExport={ this.exportConfiguration }/>
          { this.props.children }
        </div>
      );
    }
}

 const mapStateToProps = (state) => ({
     graphs: state.graphs,
     data: state.data,
     dataFetcher: state.dataFetcher
 });

 export default connect(mapStateToProps)(Configuration);
