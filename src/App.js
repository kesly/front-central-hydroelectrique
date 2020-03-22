import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Stores/RootReducer';
import DataFetcher from './Components/DataFetcher';
import AccordionWarpper from './Components/AccordionWarpper';
import Configuration from './Components/Configuration';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <DataFetcher/>
          <Configuration>
            <AccordionWarpper/>
          </Configuration>
        </div>
      </Provider>
    );
  }

}

export default App;
