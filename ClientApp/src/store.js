import { createStore } from "redux";
import rootReducer from "./reducers";
import rotateReducer from "./reducers/rotateReducer";
function configureStore(state = { showMenu: true, rotating: true }) {
    return createStore(rotateReducer, state);
}
export default configureStore;
