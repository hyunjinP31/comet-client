import axios from "axios";
import { API_URL } from "../../config/contansts";

//액션 타입
const GET_PROJECT = "project/GET_PROJECT";
const GET_PROJECT_ERROR = "project/GET_PROJECT_ERROR";
const GET_PROJECT_SUCCESS = "project/GET_PROJECT_SUCCESS";
const SET_PROJECT_INPUT = "project/SET_PROJECT_INPUT";
const RESET_PROJECT_INPUT = "project/RESET_PROJECT_INPUT";
const SET_PROJECT_COUNT = "project/SET_PROJECT_ADD";

const initialState = {
    project: {
        loading: false,
        data: null,
        error: null,
    },
    addProject: {
        sellerId: "",
        sellerName: "",
        projectName: "",
        projectVolume: 0,
        projectPrice: 0,
        projectGoal: 0,
        projectImg: "",
        projectStartDate: "",
        projectEndDate: "",
        projectType: "",
        projectKeyword: "",
    }
}

//액션 생성 함수
export const setProjectInput = (e) => {
    const { name, value } = e.target;
    return {
        type: SET_PROJECT_INPUT,
        name,
        value
    }
}
export const setProjectCount = (number) => {
    return {
        type: SET_PROJECT_COUNT,
        number
    }
}

export const printMain = () => async (dispatch, kind) => {
    dispatch({type:GET_PROJECT});
    try{
        const response = await axios.get(`${API_URL}/${kind}`);
        const res =  response.data
        dispatch({type:GET_PROJECT_SUCCESS, res});
    }
    catch(e){
        dispatch({type:GET_PROJECT_ERROR, error: e});
    }
}
export const createProject = () => async ( dispatch, getState ) => {
    const projectData = getState().project.addProject;
    try{
        const response = await axios.post(`${API_URL}/createproject`, projectData);
        console.log('projectData successfully created');
        dispatch({ type: RESET_PROJECT_INPUT });
    }
    catch(e){
        console.log(e);
    }
}

//리듀서
export default function project(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                project: {
                    loading: true,
                    data: null,
                    error: null,
                }
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                project: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_PROJECT_ERROR:
            return {
                ...state,
                project: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case SET_PROJECT_INPUT:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    [action.name]: action.value
                }
            }
        case RESET_PROJECT_INPUT:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    sellerId: "",
                    sellerName: "",
                    projectName: "",
                    projectVolume: 0,
                    projectPrice: 0,
                    projectGoal: 0,
                    projectImg: "",
                    projectStartDate: "",
                    projectEndDate: "",
                    projectType: "",
                    projectKeyword: "",
                }
            }
        case SET_PROJECT_COUNT:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    projectVolume: state.addProject.projectVolume + action.number
                }
            }
        default:
            return state;
    }
} 