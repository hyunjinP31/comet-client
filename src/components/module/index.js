import { combineReducers } from "redux";
import project from "./project";
import user from "./user";

const rootReducer = combineReducers({project, user});
export default rootReducer;