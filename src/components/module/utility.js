
const HEADER_MENU_CHANGE = "utility/HEADER_MENU_CHANGE";
const HEADER_MENU_DEFAULT = "utility/HEADER_MENU_DEFAULT";

const initialState = {
    headerMenu: {
        currentMenu: 0,
    }
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

export default function utility (state= initialState, action){
    switch(action.type) {
        case HEADER_MENU_CHANGE:
            return {
                ...state,
                headerMenu: {
                    currentMenu: action.currentValue,
                }
            }
        case HEADER_MENU_DEFAULT:
            return {
                ...state,
                headerMenu: {
                    currentMenu: 0,
                }
            }
        default:
            return state;
    }
}