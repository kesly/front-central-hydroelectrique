import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Stores/RootReducer';
import AppDiv from './Components/AppDiv';
import NavBar from './Components/NavBar';
import Hydraulics from './Hydraulics';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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
          <Hydraulics />
        </AppDiv>
      </Provider>
    );
  }

}

export default App;
