import { createStore } from "redux";
import rootReducer from "./reducers";
import rotateReducer from "./reducers/rotateReducer";
import leftMenuReducer from "./reducers/leftMenuReducer";

const initialState = {
    rotateReducer: { showMenu: true },
    leftMenuReducer: { rotating: true }
};
function configureStore(state = initialState) {
    return createStore(rootReducer, state);
}
export default configureStore;
