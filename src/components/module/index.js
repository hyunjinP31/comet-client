import { combineReducers } from "redux";
import project from "./project";
import user from "./user";
import utility from "./utility";
import heart from "./heart";

const rootReducer = combineReducers({project, user, utility, heart});
export default rootReducer;