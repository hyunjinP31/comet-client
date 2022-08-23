import { getCookie } from "../../util/cookie";
import axios from 'axios';
import { API_URL } from "../../config/contansts";

const GIVE_HEART = "heart/GIVEN_HEART";
const RESET_GIVE_HEART = "heart/RESET_GIVE_HEART";
const GET_HEART_DATA = "heart/GET_HEART_DATA";
const GET_HEART_DATA_SUCCESS = "heart/GET_HEART_DATA_SUCCESS";
const GET_HEART_DATA_ERROR = "heart/GET_HEART_DATA_ERROR";
const TRICK_FULL_HEART = "heart/TRICK_FULL_HEART";
const RESET_TRICK_FULL_HEART = "heart/RESET_TRICK_FULL_HEART";
const DELETE_TRICK_FULL_HEART = "heart/DELETE_TRICK_FULL_HEART";
const TRICK_EMPTY_HEART = "heart/TRICK_EMPTY_HEART";
const RESET_TRICK_EMPTY_HEART = "heart/RESET_TRICK_EMPTY_HEART";
const DELETE_TRICK_EMPTY_HEART = "heart/DELETE_TRICK_EMPTY_HEART";
const EMPTY_HEART_DATA = "heart/EMPTY_HEART_DATA";



const initialState = {
    projectGivenHeart: {
        userId: getCookie('userId'),
        sellerId: "",
        projectPrice: "",
        projectAchieve: "",
        projectTitle: "",
        projectImg: "",
        releaseDate: "",
        deadLine: "",
        projectId: "",
    },
    heartData: {
        loading: false,
        data: null,
        error: null
    },
    trickHeart: {
        empty: [],
        full: [],
    },
}
//좋아요 데이터 리셋
export const resetHeartData = () => {
    return {
        type: RESET_GIVE_HEART,
    }
}
//좋아요 데이터 담기
export const giveHeart = (data) => {
    const { projectTitle, projectImg, releaseDate, deadLine, projectPrice, projectAchieve, sellerId, id } = data;
    return {
        type: GIVE_HEART,
        projectTitle,
        projectImg,
        releaseDate,
        deadLine,
        projectAchieve,
        projectPrice,
        sellerId,
        id,
    }
}
//하트 데이터 서버로 보내기
export const addHeart = () => async (dispatch, getState) => {
    const heartData = getState().heart.projectGivenHeart;
    try {
        await axios.post(`${API_URL}/addheart`, heartData);
        dispatch(resetHeartData());
    }
    catch (e) {
        console.log(e)
    }
}
//유저의 찜 목록 불러오기
export const getHeart = () => async (dispatch) => {
    dispatch({ type: GET_HEART_DATA });
    try {
        const response = await axios.get(`${API_URL}/getheart/${getCookie('userId')}`);
        const data = response.data;
        dispatch({ type: GET_HEART_DATA_SUCCESS, data })
    }
    catch (e) {
        dispatch({ type: GET_HEART_DATA_ERROR, e });
    }
}
//하트 삭제하기
export const deleteHeart = (title) => async () => {
    try {
        await axios.delete(`${API_URL}/deleteHeart/${title}`);
    }
    catch (e) {
        console.log(e);
    }
}
//눈속임 풀하트 그려주기
export const fullHeartTrick = (title) => {
    return {
        type: TRICK_FULL_HEART,
        title
    }
}
//눈속임 풀하트 지우기
export const fullHeartTrickDelete = (title) => {
    return {
        type: DELETE_TRICK_FULL_HEART,
        title
    }
}
//눈속임 풀하트 배열 초기화
export const fullHeartTrickReset = () => {
    return {
        type: RESET_TRICK_FULL_HEART
    }
}
//눈속임 빈 하트 그려주기
export const emptyHeartTrick = (title) => {
    return {
        type: TRICK_EMPTY_HEART,
        title
    }
}
//눈속임 빈 하트 지워주기
export const emptyHeartTrickDelete = (title) => {
    return {
        type: DELETE_TRICK_EMPTY_HEART,
        title
    }
}
//눈속임 빈 하트 배열 초기화
export const emptyHeartTrickReset = () => {
    return {
        type: RESET_TRICK_EMPTY_HEART
    }
}
export const emptyHeartData = () => {
    return {
        type: EMPTY_HEART_DATA
    }
}

export default function heart(state = initialState, action) {
    switch (action.type) {
        case GIVE_HEART:
            return {
                ...state,
                projectGivenHeart: {
                    ...state.projectGivenHeart,
                    projectTitle: action.projectTitle,
                    projectImg: action.projectImg,
                    releaseDate: action.releaseDate,
                    deadLine: action.releaseDate,
                    projectAchieve: action.projectAchieve,
                    projectPrice: action.projectPrice,
                    sellerId: action.sellerId,
                    projectId: action.id,
                }
            }
        case RESET_GIVE_HEART:
            return {
                ...state,
                projectGivenHeart: {
                    userId: getCookie('userId'),
                    sellerId: "",
                    projectPrice: "",
                    projectAchieve: "",
                    projectTitle: "",
                    projectImg: "",
                    releaseDate: "",
                    deadLine: "",
                    projectId: "",
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
        case EMPTY_HEART_DATA: {
            return {
                ...state,
                heartData: {
                    loading: false,
                    data: null,
                    error: null
                }
            }
        }
        case TRICK_FULL_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    full: [
                        ...state.trickHeart.full,
                        action.title
                    ]
                }
            }
        case RESET_TRICK_FULL_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    full: []
                }
            }
        case DELETE_TRICK_FULL_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    full: state.trickHeart.full.filter(like => action.title !== like)
                }
            }
        case TRICK_EMPTY_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    empty: [
                        ...state.trickHeart.empty,
                        action.title
                    ]
                }
            }
        case RESET_TRICK_EMPTY_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    empty: []
                }
            }
        case DELETE_TRICK_EMPTY_HEART:
            return {
                ...state,
                trickHeart: {
                    ...state.trickHeart,
                    empty: state.trickHeart.empty.filter(like => action.title !== like)
                }
            }
        default:
            return state;
    }
}