import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Stores/RootReducer';
import AppDiv from './Components/AppDiv';
import NavBar from './Components/NavBar';
import ReduxTester from './Components/ReduxTester';

import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logo from './logo.svg';
import './App.css';
import rootReducer from './RootReducer';
import Hydraulics from './Hydraulics';

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
          <ReduxTester />
        </AppDiv>
      </Provider>
    );
  }

}

export default App;
