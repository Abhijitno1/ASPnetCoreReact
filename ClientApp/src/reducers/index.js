import { combineReducers } from 'redux';
import LeftMenuReducer from './leftMenuReducer';
import RotateReducer from './rotateReducer';

const rootReducer = combineReducers({
    leftMenuReducer: LeftMenuReducer,
    rotateReducer: RotateReducer
});
export default rootReducer;