import axios from "axios";
import { API_URL } from "../../config/contansts";
import { getCookie } from "../../util/cookie";

//액션 타입
const GET_PROJECT = "project/GET_PROJECT";
const GET_PROJECT_ERROR = "project/GET_PROJECT_ERROR";
const GET_PROJECT_SUCCESS = "project/GET_PROJECT_SUCCESS";
const SET_PROJECT_INPUT = "project/SET_PROJECT_INPUT";
const RESET_PROJECT_INPUT = "project/RESET_PROJECT_INPUT";
const GET_PROJECT_DATA = "project/GET_PROJECT_DATA";
const GET_PROJECT_DATA_SUCCESS = "project/GET_PROJECT_DATA_SUCCESS";
const GET_PROJECT_DATA_ERROR = "project/GET_PROJECT_DATA_ERROR";
const GET_PROJECT_LIST_DATA = "project/GET_PROJECT_LIST_DATA";
const GET_PROJECT_LIST_DATA_SUCCESS = "project/GET_PROJECT_LIST_DATA_SUCCESS";
const GET_PROJECT_LIST_DATA_ERROR = "project/GET_PROJECT_LIST_DATA_ERROR";
const IMAGE_CHANGING = "project/IMAGE_CHANGING";
const CURRENT_MOVE = "project/CURRENT_MOVE";

//초깃값
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
        projectPrice: "",
        projectGoal: "",
        projectImg: "",
        projectStartDate: "",
        projectEndDate: "",
        projectType: "",
    },
    projectData: {
        loading: false,
        data: null,
        error: null
    },
    projectListData: {
        loading: false,
        data: null,
        error: null
    },
    isValid: {
        sellerIdValid: true,
        sellerNameValid: true, 
        titleValid: false,
        priceValid: false,
        goalValid: false,
        endDataValid: false,
        typeValid: false
    },
    projectSideSwipe:{
        currentTop: 0,
        currentTheme: 0,
        currentNew: 0,
        currentPoten: 0,
        currentCom: 0,
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
//이미지 url 값 넣어주기
export const setImageUrl = (e, imgUrl) => {
    const { name } = e.target;
    return {
        type: IMAGE_CHANGING,
        name,
        imgUrl
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
//이미지 업로드
export const imageChange = (e) => async ( dispatch )=> {
    try{
        const { name } = e.target;
        const imageFormData = new FormData();
        imageFormData.append(name, e.target.files[0]);
        const response = await axios.post(`${API_URL}/upload`, imageFormData, {
            Headers: { 'content-type': 'multipart/form-data'},
        })
        const imgUrl = response.data.projectImg;
        dispatch(setImageUrl(e, imgUrl));
    }
    catch(e){
        console.log(e);
    }
}
//프로젝트 등록
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
//프로젝트 개별 상세 페이지
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
//프로젝트 키워드별 상세 페이지
export const getProjectKeyData = (name) => async (dispatch) => {
    dispatch({type: GET_PROJECT_LIST_DATA});
    try{
        const response = await axios.get(`${API_URL}/projectlist/${name}`);
        const data = response.data;
        dispatch({type: GET_PROJECT_LIST_DATA_SUCCESS, data})
    }
    catch(e){
        dispatch({type: GET_PROJECT_LIST_DATA_ERROR, error: e});
    }
}
//조회수 올리기
export const viewRaise = (id) => async () => {
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
//좌우 스와이프
export const sideSwipe = (e) => {
    const {name, value} = e.target.dataset;
    const current = parseInt(value);
    return {
        type: CURRENT_MOVE,
        name,
        current
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
                    projectTitle: "",
                    projectPrice: "",
                    projectGoal: "",
                    projectImg: "",
                    projectStartDate: "",
                    projectEndDate: "",
                    projectType: "",
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
            case GET_PROJECT_LIST_DATA:
                return {
                    ...state,
                    projectListData: {
                         loading: true,
                         data: null,
                         error: null
                    }
                }
            case GET_PROJECT_LIST_DATA_SUCCESS:
                return {
                    ...state,
                    projectListData: {
                        loading: false,
                        data: action.data,
                        error: null
                    }
                }
            case GET_PROJECT_LIST_DATA_ERROR:
                return {
                    ...state,
                    projectListData: {
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
        case CURRENT_MOVE:
            return {
                ...state,
                projectSideSwipe:{
                    ...state.projectSideSwipe,
                    [action.name]: state.projectSideSwipe[action.name] + action.current
                }
            }
        default:
            return state;
    }
} 