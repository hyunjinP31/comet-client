import { combineReducers } from "redux";
import project from "./project";
import user from "./user";
import utility from "./utility";

const rootReducer = combineReducers({project, user, utility});
export default rootReducer;