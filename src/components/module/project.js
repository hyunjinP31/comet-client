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
        data: {
            topData: null,
            immiData: null,
            themeData: null,
            newData: null,
            potenData: null,
            comData: null,
        },
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

export const printMain = () => async (dispatch) => {
    dispatch({type:GET_PROJECT});
    try{
        const topResponse = await axios.get(`${API_URL}/topranking`);
        const topRes =  topResponse.data;
        const immiResponse = await axios.get(`${API_URL}/imminent`);
        const immiRes =  immiResponse.data;
        const themeResponse = await axios.get(`${API_URL}/theme`);
        const themeRes =  themeResponse.data;
        const newResponse = await axios.get(`${API_URL}/newproject`);
        const newtopRes =  newResponse.data;
        const potenResponse = await axios.get(`${API_URL}/potenup`);
        const potenRes =  potenResponse.data;
        const comResponse = await axios.get(`${API_URL}/commingsoon`);
        const comRes =  comResponse.data;
        const project = {
            topData: topRes,
            immiData: immiRes,
            themeData: themeRes,
            newData: newtopRes,
            potenData: potenRes,
            comData: comRes,
        }
        dispatch({type:GET_PROJECT_SUCCESS, project});
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
                    ...state.project,
                    loading: true,
                }
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                project: {
                    loading: false,
                    data: action.project,
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