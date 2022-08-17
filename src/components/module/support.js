import axios from 'axios';
import { API_URL } from '../../config/contansts';
import { getCookie } from '../../util/cookie';


const SET_SUPPORT = "support/SET_SUPPORT";
const RESET_SUPPORTED = "support/RESET_SUPPORTED";
const SET_SUPPORT_USERID = "support/SET_SUPPORT_USERID";
const GET_SUPPORT_DATA = "support/GET_SUPPORT_DATA";
const GET_SUPPORT_DATA_SUCCESS = "support/GET_SUPPORT_DATA_SUCCESS";
const GET_SUPPORT_DATA_ERROR = "support/GET_SUPPORT_DATA_ERROR";

const initialState = {
    supported: {
        userId: "",
        sellerId: "",
        projectTitle: "",
        projectPrice: "",
        projectImg: "",
        releaseDate: "",
        deadLine: "",
        projectAchieve: "",
    },
    supportData: {
        loading: false,
        data: null,
        error: null,
    }
}

//후원할 프로젝트 값 담기
export const setSupprot = (data) => {
    const { sellerId, projectTitle, projectPrice, projectImg, releaseDate, deadLine, projectAchieve } = data;
    return {
        type: SET_SUPPORT,
        sellerId,
        projectTitle,
        projectPrice,
        projectImg,
        releaseDate,
        deadLine,
        projectAchieve
    }
}
//후원 프로젝트 값 리셋
export const resetSupported = () => {
    return {
        type: RESET_SUPPORTED
    }
}
export const setSupportUserId = () => {
    const userId = getCookie('userId');
    return {
        type: SET_SUPPORT_USERID,
        userId,
    }
}
//후원하기
export const giveSupport = () => async (dispatch, getState) => {
    try {
        const supported = getState().support.supported;
        console.log(supported)
        await axios.post(`${API_URL}/givesupport`, supported);
        dispatch({type: RESET_SUPPORTED});
    }
    catch(e){
        console.log(e);
    }
}
//내 후원내역 불러오기
export const getMySupportData = (userId) => async (dispatch) => {
    dispatch({type: GET_SUPPORT_DATA});
    try{
        const response = await axios.get(`${API_URL}/mysupported/${userId}`);
        const data = response.data;
        dispatch({type: GET_SUPPORT_DATA_SUCCESS, data});
    }
    catch(e){
        dispatch({type: GET_SUPPORT_DATA_ERROR, error: e});
    }
}

export default function support (state=initialState, action) {
    switch(action.type){
        case SET_SUPPORT:
            return {
                ...state,
                supported: {
                    ...state.supported,
                    sellerId: action.sellerId,
                    projectTitle: action.projectTitle,
                    projectPrice: action.projectPrice,
                    projectImg: action.projectImg,
                    releaseDate: action.releaseDate,
                    deadLine: action.deadLine,
                    projectAchieve: action.projectAchieve,
                }
            }
        case SET_SUPPORT_USERID:
            return{
                ...state,
                supported: {
                    ...state.supported,
                    userId: action.userId
                }
            }
        case RESET_SUPPORTED:
            return {
                ...state,
                supported: {
                    userId: "",
                    sellerId: "",
                    projectTitle: "",
                    projectPrice: "",
                    projectImg: "",
                    releaseDate: "",
                    deadLine: "",
                    projectAchieve: "",
                }
            }
        case GET_SUPPORT_DATA:
            return {
                ...state,
                supportData: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_SUPPORT_DATA_SUCCESS:
            return {
                ...state,
                supportData: {
                    loading: false,
                    data: action.data,
                    error: null,
                }
            }
        case GET_SUPPORT_DATA_ERROR:
            return {
                ...state,
                supportData: {
                    loading: false,
                    data: null,
                    error: null
                }
            }
        default:
            return state
    }
}