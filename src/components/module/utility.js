
const HEADER_MENU_CHANGE = "utility/HEADER_MENU_CHANGE";
const HEADER_MENU_DEFAULT = "utility/HEADER_MENU_DEFAULT";
const IS_TOGGLE_CLICKED = "utility/IS_TOGGLE_CLICKED";
const IS_HEART_FULLED = "utility/IS_HEART_FULLED";

const initialState = {
    headerMenu: {
        currentMenu: 0,
        isOpen: false,
    },
    list: {
        fullHeart: false,
    },
}

export const headerMenuChange = (e) => {
    let currentValue;
    if(!e.target){
        currentValue = e;
    }
    else {
        const { value } = e.target.dataset;
        currentValue = value;
    }
    return {
        type: HEADER_MENU_CHANGE,
        currentValue
    }
}
export const headerMenuDefault = () => {
    return {
        type: HEADER_MENU_DEFAULT,
    }
}
export const onToggleClick = () => {
    return {
        type: IS_TOGGLE_CLICKED,
    }
}
export const isHeartFull = ()=>{
    return {
        type: IS_HEART_FULLED,
    }
}

export default function utility (state= initialState, action){
    switch(action.type) {
        case HEADER_MENU_CHANGE:
            return {
                ...state,
                headerMenu: {
                    ...state.headerMenu,
                    currentMenu: action.currentValue,
                }
            }
        case HEADER_MENU_DEFAULT:
            return {
                ...state,
                headerMenu: {
                    ...state.headerMenu,
                    currentMenu: 0,
                }
            }
        case IS_TOGGLE_CLICKED:
            return {
                ...state,
                headerMenu: {
                    ...state.headerMenu,
                    isOpen: !state.headerMenu.isOpen,
                }
            }
        case IS_HEART_FULLED:
            return {
                ...state,
                list:{
                    ...state.list,
                    fullheart: !state.list.fullHeart,
                }
            }
        default:
            return state;
    }
}