import axios from "axios";
import { API_URL } from "../../config/contansts";
import { getCookie } from "../../util/cookie";

//액션 타입
const GET_PROJECT = "project/GET_PROJECT";
const GET_PROJECT_ERROR = "project/GET_PROJECT_ERROR";
const GET_PROJECT_SUCCESS = "project/GET_PROJECT_SUCCESS";
const SET_PROJECT_INPUT = "project/SET_PROJECT_INPUT";
const FIGURE_SELLER = "project/FIGURE_SELLER";
const RESET_PROJECT_INPUT = "project/RESET_PROJECT_INPUT";
const GET_PROJECT_DATA = "project/GET_PROJECT_DATA";
const GET_PROJECT_DATA_SUCCESS = "project/GET_PROJECT_DATA_SUCCESS";
const GET_PROJECT_DATA_ERROR = "project/GET_PROJECT_DATA_ERROR";
const GET_PROJECT_TYPE_DATA = "project/GET_PROJECT_TYPE_DATA";
const GET_PROJECT_TYPE_DATA_SUCCESS = "project/GET_PROJECT_TYPE_DATA_SUCCESS";
const GET_PROJECT_TYPE_DATA_ERROR = "project/GET_PROJECT_TYPE_DATA_ERROR";
const GET_PROJECT_LIST_DATA = "project/GET_PROJECT_LIST_DATA";
const GET_PROJECT_LIST_DATA_SUCCESS = "project/GET_PROJECT_LIST_DATA_SUCCESS";
const GET_PROJECT_LIST_DATA_ERROR = "project/GET_PROJECT_LIST_DATA_ERROR";
const IMAGE_CHANGING = "project/IMAGE_CHANGING";
const GET_MYPROJECT_LIST_DATA = "project/GET_MYPROJECT_LIST_DATA";
const GET_MYPROJECT_LIST_DATA_SUCCESS = "project/GET_MYPROJECT_LIST_DATA_SUCCESS";
const GET_MYPROJECT_LIST_DATA_ERROR = "project/GET_MYPROJECT_LIST_DATA_ERROR";
const GET_ALL_PROJECT_DATA = "project/GET_ALL_PROJECT_DATA";
const GET_ALL_PROJECT_DATA_SUCCESS = "project/GET_ALL_PROJECT_DATA_SUCCESS";
const GET_ALL_PROJECT_DATA_ERROR = "project/GET_ALL_PROJECT_DATA_ERROR";
const SET_EDIT_DEFAULT_VALUE = "project/SET_EDIT_DEFAULT_VALUE";

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
        sellerId: "",
        sellerName: "",
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
    myProjectListData: {
        loading: false,
        data: null,
        error: null
    },
    allProjectData: {
        loading: false,
        data: null,
        error: null,
    },
    typeProjectData: {
        loading: false,
        data: null,
        error: null,
    },
    isValid: {
        sellerIdValid: true,
        sellerNameValid: true,
        titleValid: false,
        priceValid: false,
        goalValid: false,
        endDataValid: false,
        typeValid: false
    }
}

//액션 생성 함수
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
    dispatch({ type: GET_PROJECT });
    try {
        const projectDatas = await axios.get(`${API_URL}/mainprintprojects`)
        const data = projectDatas.data;
        const project = {
            topData: data[0],
            immiData: data[1],
            themeData: data[2],
            newData: data[3],
            potenData: data[4],
            comData: data[5],
        }
        dispatch({ type: GET_PROJECT_SUCCESS, project });
    }
    catch (e) {
        dispatch({ type: GET_PROJECT_ERROR, error: e });
    }
}
//이미지 업로드
export const imageChange = (e) => async (dispatch) => {
    try {
        const { name } = e.target;
        const imageFormData = new FormData();
        imageFormData.append(name, e.target.files[0]);
        const response = await axios.post(`${API_URL}/upload`, imageFormData, {
            Headers: { 'content-type': 'multipart/form-data' },
        })
        const imgUrl = response.data.key;
        dispatch(setImageUrl(e, imgUrl));
    }
    catch (e) {
        console.log(e);
    }
}
//프로젝트 인풋 세팅
export const setProjectInput = (e) => {
    const { name, value } = e.target;
    return {
        type: SET_PROJECT_INPUT,
        name,
        value
    }
}
//프로젝트 타이틀 중복 검사
export const isTitleUnique = () => async (dispatch, getState) => {
    try {
        const addProject = getState().project.addProject;
        if (!addProject.projectTitle) return;
        const response = await axios.get(`${API_URL}/getprojecttitle/${addProject.projectTitle}`);
        const data = response.data;
        if (document.querySelector('.projectTitleAlert')) {
            if (data.length > 0) {
                document.querySelector('.projectTitleAlert').innerHTML = '중복된 제목입니다.';
            }
            else {
                document.querySelector('.projectTitleAlert').innerHTML = '';
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}
//프로젝트 등록
export const createProject = () => async (dispatch, getState) => {
    const addProject = getState().project.addProject;
    try {
        await axios.post(`${API_URL}/createproject`, addProject);
        dispatch({ type: RESET_PROJECT_INPUT });
    }
    catch (e) {
        console.log(e);
    }
}
//프로젝트 input value reset
export const resetProjectInput = () => {
    return {
        type: RESET_PROJECT_INPUT,
    }
}
//개별 프로젝트 데이터 불러와서 값 넣어주기(수정)
export const editDefaultValue = (id) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_DATA });
    try {
        const response = await axios.get(`${API_URL}/projectdetail/${id}`);
        const data = response.data;
        dispatch({ type: GET_PROJECT_DATA_SUCCESS, data });
        const { projectTitle, projectPrice, projectImg, projectGoal, deadLine, projectType } = data;
        dispatch({
            type: SET_EDIT_DEFAULT_VALUE,
            projectTitle,
            projectPrice,
            projectImg,
            projectGoal,
            deadLine,
            projectType
        })
    }
    catch (e) {
        dispatch({ type: GET_PROJECT_DATA_ERROR, error: e })
    }
}

//등록된 프로젝트 수정하기
export const editProject = (id) => async (dispatch, getState) => {
    const projectEditData = getState().project.addProject;
    try {
        await axios.put(`${API_URL}/editproject/${id}`, projectEditData);
    }
    catch (e) {
        console.log(e);
    }
}
//프로젝트 등록 시 등록한 user, id name 담기
export const figureSeller = () => {
    return {
        type: FIGURE_SELLER,
    }
}
//프로젝트 개별 상세 페이지
export const getProjectData = (id) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_DATA });
    try {
        const response = await axios.get(`${API_URL}/projectdetail/${id}`)
        const data = response.data;
        dispatch({ type: GET_PROJECT_DATA_SUCCESS, data })
    }
    catch (e) {
        dispatch({ type: GET_PROJECT_DATA_ERROR, error: e });
    }
}
//프로젝트 키워드별 리스트
export const getProjectKeyData = (name) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_LIST_DATA });
    try {
        const response = await axios.get(`${API_URL}/projectlist/${name}`);
        const data = response.data;
        dispatch({ type: GET_PROJECT_LIST_DATA_SUCCESS, data })
    }
    catch (e) {
        dispatch({ type: GET_PROJECT_LIST_DATA_ERROR, error: e });
    }
}
//프로젝트 타입별 리스트
export const getProjectTypeList = (type) => async (dispatch) => {
    dispatch({type: GET_PROJECT_TYPE_DATA});
    try {
        const response = await axios.get(`${API_URL}/projecttypelist/${type}`);
        const data = response.data;
        dispatch({type: GET_PROJECT_TYPE_DATA_SUCCESS, data});
    }
    catch(e){
        dispatch({type: GET_PROJECT_TYPE_DATA_ERROR, error: e});
    }
}
//내가 올린 프로젝트 리스트 불러오기
export const getMyProjectList = (userId) => async (dispatch) => {
    dispatch({ type: GET_MYPROJECT_LIST_DATA });
    try {
        const response = await axios.get(`${API_URL}/myproject/${userId}`);
        const data = response.data;
        dispatch({ type: GET_MYPROJECT_LIST_DATA_SUCCESS, data });
    }
    catch (e) {
        dispatch({ type: GET_MYPROJECT_LIST_DATA_ERROR, error: e })
    }
}
//모든 프로젝트 보기
export const getAllProject = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PROJECT_DATA });
    try {
        const response = await axios.get(`${API_URL}/getallproject`);
        const data = response.data;
        dispatch({ type: GET_ALL_PROJECT_DATA_SUCCESS, data })
    }
    catch (e) {
        dispatch({ type: GET_ALL_PROJECT_DATA_ERROR, error: e })
    }
}
//조회수 올리기
export const viewRaise = (id) => async () => {
    try {
        const response = await axios.get(`${API_URL}/projectdetail/${id}`);
        const view = response.data.projectHits;
        let newnum = { view: view + 1 };
        await axios.put(`${API_URL}/projectview/${id}`, newnum);
    }
    catch (e) {
        console.log(e);
    }
}
//프로젝트 삭제
export const deleteProject = (id) => async () => {
    try {
        await axios.delete(`${API_URL}/deleteproject/${id}`);
    }
    catch (e) {
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
                    error: null
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
        case FIGURE_SELLER:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    sellerId: getCookie('userId'),
                    sellerName: getCookie('userName'),
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
            case GET_PROJECT_TYPE_DATA:
                return {
                    ...state,
                    typeProjectData: {
                        loading: true,
                        data: null,
                        error: null
                    }
                }
            case GET_PROJECT_TYPE_DATA_SUCCESS:
                return {
                    ...state,
                    typeProjectData: {
                        loading: false,
                        data: action.data,
                        error: null
                    }
                }
            case GET_PROJECT_TYPE_DATA_ERROR:
                return {
                    ...state,
                    typeProjectData: {
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
        case GET_MYPROJECT_LIST_DATA:
            return {
                ...state,
                myProjectListData: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_MYPROJECT_LIST_DATA_SUCCESS:
            return {
                ...state,
                myProjectListData: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_MYPROJECT_LIST_DATA_ERROR:
            return {
                ...state,
                myProjectListData: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case GET_ALL_PROJECT_DATA:
            return {
                ...state,
                allProjectData: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_ALL_PROJECT_DATA_SUCCESS:
            return {
                ...state,
                allProjectData: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_ALL_PROJECT_DATA_ERROR:
            return {
                ...state,
                allProjectData: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case IMAGE_CHANGING:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    [action.name]: action.imgUrl
                }
            }
        case SET_EDIT_DEFAULT_VALUE:
            return {
                ...state,
                addProject: {
                    ...state.addProject,
                    projectTitle: action.projectTitle,
                    projectPrice: action.projectPrice,
                    projectGoal: action.projectGoal,
                    projectImg: action.projectImg,
                    projectEndDate: action.deadLine,
                    projectType: action.projectType,
                }
            }
        default:
            return state;
    }
} 