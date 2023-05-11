import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import App from './App';
import logger from 'redux-logger';
import axios from 'axios';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

function* fetchPlants() {
  const response = yield axios.get('/api/plant');
  yield put({ type: 'SET_PLANTS', payload: response.data });
}

function* rootSaga() {
  yield takeLatest('FETCH_PLANTS', fetchPlants);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);