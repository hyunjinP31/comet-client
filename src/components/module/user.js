import axios from 'axios';
import { API_URL } from '../../config/contansts';

//액션 타입
const GET_USER = "user/GET_USER";
const GET_USER_SUCCESS = "user/GET_USER_SUCCESS";
const GET_USER_ERROR = "user/GET_USER_ERROR";
const SET_USER_INPUT = "user/SET_USER_INPUT";
const RESET_USER_INPUT = "user/RESET_SUER_INPUT";

const initialState = {
    user: {
        loading: false,
        data: null,
        error: null,
    },
    addUser: {
        userId: "",
        userPw: "",
        userBirth: "",
        userGender: "",
        userPhone: "",
        userName: "",
        userEmail: "",
        userAddr1: "",
        userAddr2: ""
    }
}

//액션 생성 함수
//input값 가져오기
export const setUserInput = (e) => {
    const { name, value } = e.target;
    return {
        type: SET_USER_INPUT,
        name,
        value
    }
}
//회원정보 받아오기
export const getUser = () => async (dispatch, getState) => {
    const addUser = getState().user.addUser;
    try {
        const response = await axios.get(`${API_URL}/user/${addUser.userId}`);
        const data = response.data;
        dispatch({ type: GET_USER_SUCCESS, data})
    }
    catch(error){
        dispatch({type:GET_USER_ERROR, error})
    }
}
//회원가입
export const createUser = () => async (dispatch, getState) => {
    const userData = getState().user.addUser;
    try {
        const response = await axios.post(`${API_URL}/createuser`, userData);
    }
    catch(e){
        console.log(e);
    }
}
//회원탈퇴
export const deleteUser = () => async (id) => {
    try {
        await axios.delete(`${API_URL}/deleteUser/${id}`);
    }
    catch (e) {
        console.log(e);
    }
}
//input정보 reset
export const addUserReset = () => {
    return {
        type: RESET_USER_INPUT,
    }
}

// 리듀서
export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_USER_ERROR:
            return {
                ...state,
                user: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case SET_USER_INPUT:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    [action.name]: action.value
                }
            }
        case RESET_USER_INPUT:
            return {
                ...state,
                addUser: {
                    userId: "",
                    userPw: "",
                    userBirth: "",
                    userGender: "",
                    userPhone: "",
                    userName: "",
                    userEmail: "",
                    userAddr1: "",
                    userAddr2: ""
                }
            }
        default:
            return state;
    }
}