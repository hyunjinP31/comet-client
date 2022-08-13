import { getCookie } from "../../util/cookie";
import axios from 'axios';
import { API_URL } from "../../config/contansts";

const GIVE_HEART = "heart/GIVEN_HEART";
const RESET_GIVE_HEART = "heart/RESET_GIVE_HEART"; 
const GET_HEART_DATA = "heart/GET_HEART_DATA";
const GET_HEART_DATA_SUCCESS = "heart/GET_HEART_DATA_SUCCESS";
const GET_HEART_DATA_ERROR = "heart/GET_HEART_DATA_ERROR";
const TRICK_HEART = "heart/TRICK_HEART";


const initialState = {
    projectGivenHeart: {
        userId: getCookie('userId'),
        projectTitle: "",
        projectImg: "",
        releaseDate: "",
        deadLine: "",
    },
    heartData: {
        loading: false,
        data: null,
        error: null
    },
    trickHeart: [],
}
//좋아요 데이터 리셋
export const resetHeartData = () => {
    return {
        type: RESET_GIVE_HEART,
    }
}
//좋아요 데이터 담기
export const giveHeart = (data) => {
    const { projectTitle, projectImg, releaseDate, deadLine } = data;
    return {
        type: GIVE_HEART,
        projectTitle,
        projectImg,
        releaseDate,
        deadLine
    }
}
export const addHeart = () => async (dispatch, getState) => {
    const heartData = getState().heart.projectGivenHeart;
    try{
        await axios.post(`${API_URL}/addheart`, heartData);
        dispatch(resetHeartData());
    }
    catch(e){
        console.log(e)
    }
}
export const getHeart = () => async (dispatch) => {
    dispatch({type: GET_HEART_DATA});
    try{
        const response = await axios.get(`${API_URL}/getheart/${getCookie('userId')}`);
        const data = response.data;
        dispatch({type: GET_HEART_DATA_SUCCESS, data})
    }
    catch(e){
        dispatch({type: GET_HEART_DATA_ERROR, e});
    }
}
export const heartTrick = (title) => {
    console.log(title)
    return {
        type: TRICK_HEART,
        title
    }
}

export default function heart (state=initialState, action) {
    switch(action.type){
        case GIVE_HEART:
            return {
                ...state,
                projectGivenHeart: {
                    ...state.projectGivenHeart,
                    projectTitle: action.projectTitle,
                    projectImg: action.projectImg,
                    releaseDate: action.releaseDate,
                    deadLine: action.releaseDate,
                }
            }
        case RESET_GIVE_HEART:
            return {
                ...state,
                projectGivenHeart: {
                    userId: getCookie('userId'),
                    projectTitle: "",
                    projectImg: "",
                    releaseDate: "",
                    deadLine: "",
                }
            }
        case GET_HEART_DATA:
            return {
                ...state,
                heartData: {
                    loading: true,
                    data: null,
                    error: null,
                }
            }
        case GET_HEART_DATA_SUCCESS:
            return {
                ...state,
                heartData: {
                    loading: false,
                    data: action.data,
                    error: null,
                }
            }
        case GET_HEART_DATA_ERROR:
            return {
                ...state,
                heartData: {
                    loading: false,
                    data: null,
                    error: action.error,
                }
            }
        case TRICK_HEART:
            return {
                ...state,
                trickHeart: [
                    ...state.trickHeart,
                    action.title
                ]
            }
        default:
            return state;
    }
}