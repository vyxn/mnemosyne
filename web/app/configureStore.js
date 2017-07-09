import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import createLogger from 'redux-logger';
import rootReducer from './login/reducers';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(sagaMiddleware)
      // applyMiddleware(
      //   thunkMiddleware,
      //   loggerMiddleware
      // )
    ),
    runSaga: sagaMiddleware.run
  };
}