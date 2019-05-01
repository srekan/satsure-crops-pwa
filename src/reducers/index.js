import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import crops from './crops';
const rootReducer = combineReducers({
  fuelSavings,
  crops,
});

export default rootReducer;
