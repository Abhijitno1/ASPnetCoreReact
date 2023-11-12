import { combineReducers } from 'redux';
import leftMenuReducer from './leftMenuReducer';
import rotateReducer from './rotateReducer';

const rootReducer = combineReducers({
    leftMenuReducer,
    rotateReducer
});
export default rootReducer;