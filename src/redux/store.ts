import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer, { initialState } from './rootReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    composeEnhancers(),
];

const store =  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware()),
);

export default store;