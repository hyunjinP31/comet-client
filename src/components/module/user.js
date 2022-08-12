import axios from 'axios';
import { API_URL } from '../../config/contansts';

//액션 타입
const GET_USER = "user/GET_USER";
const GET_USER_SUCCESS = "user/GET_USER_SUCCESS";
const GET_USER_ERROR = "user/GET_USER_ERROR";
const SET_USER_INPUT = "user/SET_USER_INPUT";
const RESET_USER_INPUT = "user/RESET_SUER_INPUT";
const INPUT_VALID_TRUE = "user/INPUT_VALID_TRUE";
const INPUT_VALID_FALSE = "user/INPUT_VALID_FALSE";
const RESET_INPUT_VALID = "user/RESET_INPUT_VALID";
const SET_LOGIN_INPUT = "user/SET_LOGIN_INPUT";
const RESET_LOGIN_INPUT = "user/RESET_LOGIN_INPUT";
const USER_LOGGED_IN = "user/USER_LOGGED_IN";
const USER_LOGGED_OUT = "user/USER_LOGGED_OUT";
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
        userGender: "선택하지 않음",
        userPhone: "",
        userName: "",
        userEmail: "",
        userAddr1: "",
        userAddr2: ""
    },
    isValid: {
        idValid: false,
        pwValid: false,
        pwChValid: false,
        emailValid: true,
        phoneValid: true,
        birthValid: true,
    },
    loginUser: {
        userId: "",
        userPw: "",
        isLogged: false,
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
//회원정보 받아오기(id중복여부 확인)
export const getUser = () => async (dispatch, getState) => {
    try {
        const addUser = getState().user.addUser;
        const response = await axios.get(`${API_URL}/user/${addUser.userId}`);
        const data = response.data;
        //data 받아와서 id 유효성 체크
        const idForm = /^(?=.*[a-z])[A-Za-z\d_]{8,16}$/; //영어 소문자를 포함한 8자 이상 16자 이하의 문자열(공백불가, 특수문자 언더바_ 만 사용가능)
        if (data.length > 0) {
            dispatch(validFalse('idValid'));
            return document.querySelector('.userIdAlert').innerHTML = '중복된 id입니다.';
        } else {
            if (idForm.test(addUser.userId) === false) {
                dispatch(validFalse('idValid'));
                document.querySelector('.userIdAlert').innerHTML = '영문 소문자, 대문자, 특수기호(_)로만 이루어진 8~16글자';
            } else {
                document.querySelector('.userIdAlert').innerHTML = '사용가능한 id 입니다.';
                dispatch(validTrue('idValid'));
            }
        }
        dispatch({ type: GET_USER_SUCCESS, data })
    }
    catch (error) {
        dispatch({ type: GET_USER_ERROR, error })
    }
}
//회원가입
export const createUser = () => async (dispatch, getState) => {
    const userData = getState().user.addUser;
    try {
        await axios.post(`${API_URL}/createuser`, userData);
    }
    catch (e) {
        console.log(e);
    }
}
//회원탈퇴
export const deleteUser = () => async (id) => {
    try {
        await axios.delete(`${API_URL}/deleteuser/${id}`);
    }
    catch (e) {
        console.log(e);
    }
}
//회원정보 받아오기(login 확인)
export const getLogin = () => async (dispatch, getState) => {
    const loginData = getState().user.loginUser;
    try {
        const response = await axios.post(`${API_URL}/loginuser`, loginData);
        const data = response.data;
        return data;
    }
    catch(e){
        console.log(e);
    }
}

//input정보 reset
export const addUserReset = () => {
    return {
        type: RESET_USER_INPUT,
    }
}
//input 유효성 검사 true 전환
export const validTrue = (name) => {
    return {
        type: INPUT_VALID_TRUE,
        name
    }
}
//유효성 검사 false 전환
export const validFalse = (name) => {
    return {
        type: INPUT_VALID_FALSE,
        name
    }
}
//유효성 검사 초기화
export const validReset = () => {
    return {
        type: RESET_INPUT_VALID
    }
}
//로그인 input 관리
export const setLoginInput = (e) => {
    const { name, value } = e.target;
    return {
        type: SET_LOGIN_INPUT,
        name,
        value
    }
}
//loginInput 초기화
export const resetLoginInput = () => {
    return {
        type: RESET_LOGIN_INPUT
    }
}
//login 확인
export const loggedIn = () => {
    return {
        type: USER_LOGGED_IN
    }
}
export const loggedOut = () => {
    return {
        type: USER_LOGGED_OUT
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
                    userGender: "선택하지 않음",
                    userPhone: "",
                    userName: "",
                    userEmail: "",
                    userAddr1: "",
                    userAddr2: ""
                }
            }
        case INPUT_VALID_TRUE:
            return {
                ...state,
                isValid: {
                    ...state.isValid,
                    [action.name]: true
                }
            }
        case INPUT_VALID_FALSE:
            return {
                ...state,
                isValid: {
                    ...state.isValid,
                    [action.name]: false
                }
            }
        case RESET_INPUT_VALID:
            return {
                ...state,
                isValid: {
                    idValid: false,
                    pwValid: false,
                    pwChValid: false,
                    emailValid: false,
                    phoneValid: true,
                    birthValid: true
                }
            }
        case SET_LOGIN_INPUT:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    [action.name]: action.value
                }
            }
        case RESET_LOGIN_INPUT:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    userId: "",
                    userPw: "",
                }
            }
        case USER_LOGGED_IN:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    isLogged: true,
                }
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    isLogged: false,
                }
            }
        default:
            return state;
    }
}