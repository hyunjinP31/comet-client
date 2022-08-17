import { combineReducers } from "redux";
import project from "./project";
import user from "./user";
import utility from "./utility";
import heart from "./heart";
import support from "./support";

const rootReducer = combineReducers({project, user, utility, heart, support});
export default rootReducer;