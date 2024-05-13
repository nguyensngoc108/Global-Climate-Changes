import { createStore, combineReducers } from 'redux';
import {countryReducer} from './reducers/countryReducers.js';

const rootReducer = combineReducers({
  country: countryReducer,
});

const store = createStore(rootReducer);

export default store;