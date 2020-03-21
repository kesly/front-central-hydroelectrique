 import { saveAs } from 'file-saver';
 import {connect} from "react-redux";
 import {Component} from "react";



const GRAPH_KEY = "graphs";
class Configuration extends Component{


    constructor(props) {
        super(props);
    }

    static saveConfiguration(graphs){
        console.log("enreigistre");
        // sauvegarde la config actuelle dans le store
        localStorage.setItem(GRAPH_KEY, JSON.stringify(graphs));
    }

    static restoreConfiration(){
        // modify the graph


        return JSON.parse(localStorage.getItem(GRAPH_KEY) );
    }

    static importConfiguration(graphs){
        let reader = new FileReader();
        reader.onload = ()=>{
            let text = reader.result;
            console.log(text);
            Object.assign(graphs, JSON.parse(text));
        };
        let input = document.querySelector("#monBouton");
        reader.readAsText(input.files[0]);

    }

    static exportConfiration(graphs){
        console.log("enreigistre 2");

        // get the graph obj

        let blob = new Blob([JSON.stringify(graphs)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "export.txt");
    }
}

 const mapStateToProps = (state) => ({
     graphs: state.graphs,
 });


 export default connect(mapStateToProps)(Configuration);
