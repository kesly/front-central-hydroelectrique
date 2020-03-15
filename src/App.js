import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Stores/RootReducer';
import AppDiv from './Components/AppDiv';
import NavBar from './Components/NavBar';
import ReduxTester from './Components/ReduxTester';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Hydraulics from './Hydraulics';
import Graph from "./Graph";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <AppDiv>
          <NavBar />
          <Graph hydraulicID="Avignon" turbineID="Groupe1" attribute="debit"/>
        </AppDiv>
      </Provider>
    );
  }

}

export default App;
