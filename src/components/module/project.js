import axios from "axios";
import { API_URL } from "../../config/contansts";
import { getCookie } from "../../util/cookie";

//액션 타입
const GET_PROJECT = "project/GET_PROJECT";
const GET_PROJECT_ERROR = "project/GET_PROJECT_ERROR";
const GET_PROJECT_SUCCESS = "project/GET_PROJECT_SUCCESS";
const SET_PROJECT_INPUT = "project/SET_PROJECT_INPUT";
const RESET_PROJECT_INPUT = "project/RESET_PROJECT_INPUT";
const SET_PROJECT_COUNT = "project/SET_PROJECT_COUNT";
const GET_PROJECT_DATA = "project/GET_PROJECT_DETAIL";
const GET_PROJECT_DATA_SUCCESS = "project/GET_PROJECT_DATA_SUCCESS";
const GET_PROJECT_DATA_ERROR = "project/GET_PROJECT_DATA_ERROR";
const IMAGE_CHANGING = "project/IMAGE_CHANGING";

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
        sellerId: getCookie('userId'),
        sellerName: getCookie('userName'),
        projectTitle: "",
        projectVolume: 0,
        projectPrice: 0,
        projectGoal: 0,
        projectImg: "",
        projectStartDate: "",
        projectEndDate: "",
        projectType: "",
        projectKeyword: "",
    },
    projectData: {
        loading: false,
        data: null,
        error: null
    },
    projectView: {
        view: 0,
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
export const setImageUrl = (e, imgUrl) => {
    const { name } = e.target;
    return {
        type: IMAGE_CHANGING,
        [name] : imgUrl
    }
}
//메인 화면에 프로젝트 뿌리기
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
// export const imageUpload = (e) => async ( dispatch )=> {
//     try{
//         const { name } = e.target;
//         const imageFormData = new FormData();
//         imageFormData.append(name, e.target.files[0]);
//         await axios.post(`${API_URL}/upload`, imageFormData, {
//             Headers: { 'content-type': 'multipart/form-data'},
//         })
//         dispatch({type: SET_PROJECT_INPUT, })
//     }
//     catch(e){

//     }
// }
export const createProject = () => async ( dispatch, getState ) => {
    const projectData = getState().project.addProject;
    try{
        await axios.post(`${API_URL}/createproject`, projectData);
        dispatch({ type: RESET_PROJECT_INPUT });
    }
    catch(e){
        console.log(e);
    }
}
//프로젝트 개별
export const getProjectData = (id) => async ( dispatch ) => {
    dispatch({type: GET_PROJECT_DATA});
    try{
        const response = await axios.get(`${API_URL}/projectdetail/${id}`)
        const data = response.data;
        dispatch({type: GET_PROJECT_DATA_SUCCESS, data})
    }
    catch(e){
        dispatch({type: GET_PROJECT_DATA_ERROR, error: e});
    }
}
//조회수 올리기
export const viewRaise = (id) => async ( dispatch, getState ) => {
    try{
        const response = await axios.get(`${API_URL}/projectdetail/${id}`);
        const view = response.data.projectHits;
        let newnum = { view: view + 1 };
        await axios.put(`${API_URL}/projectview/${id}`, newnum);
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
                    projectTitle: "",
                    projectVolume: 1,
                    projectPrice: 0,
                    projectGoal: 0,
                    projectImg: "",
                    projectStartDate: "",
                    projectEndDate: "",
                    projectType: "",
                    projectKeyword: "",
                }
            }
        case GET_PROJECT_DATA:
            return {
                ...state,
                projectData: {
                     loading: true,
                     data: null,
                     error: null
                }
            }
        case GET_PROJECT_DATA_SUCCESS:
            return {
                ...state,
                projectData: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_PROJECT_DATA_ERROR:
            return {
                ...state,
                projectData: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case IMAGE_CHANGING:
            return {
                ...state,
                addProject:{
                    ...state.addProject,
                    [action.name]: action.imgUrl
                }
            }
        default:
            return state;
    }
} 