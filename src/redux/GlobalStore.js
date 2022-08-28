/**
  @desc createStore is used for creating a store for our redux
  @desc applyMiddleware is used for applying some middleware to redux, in this case we gonna using redux-saga
*/
import { createStore, applyMiddleware } from 'redux' 

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser
import { composeWithDevTools } from 'redux-devtools-extension'

// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects';

// This is the root saga that will contain our sagas, or I should say model? XD
// import rootSaga from './sagas'

// This will be contain our reducer for the application
import RootReducer from './reducers/RootReducer';
import AccountBalanceSaga from './sagas/AccountBalanceSaga';


function* rootSaga() {
    yield all([
        fork(AccountBalanceSaga)
    ])
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  RootReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

// Run redux-saga
sagaMiddleware.run(rootSaga);

export default store