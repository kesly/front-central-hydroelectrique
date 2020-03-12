import React from 'react';
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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Hydraulics />
      </div>
    </Provider>
  );
}

export default App;
