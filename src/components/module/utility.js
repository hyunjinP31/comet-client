const HEADER_MENU_CHANGE = "utility/HEADER_MENU_CHANGE";
const HEADER_MENU_DEFAULT = "utility/HEADER_MENU_DEFAULT";
const IS_TOGGLE_CLICKED = "utility/IS_TOGGLE_CLICKED";
const IS_MSGBOX_OPEN = "utility/IS_MSGBOX_OPEN";
const IS_MSGBOX_AIMING = "utility/IS_MSGBOX_AIMING";
const RESET_MSGBOX_AIMING = "utility/RESET_MSGBOX_AIMING";
const SET_CURRENT_PAGE = "utility/SET_CURRENT_PAGE";
const SET_ITEM_VOLUME = "utility/SET_ITEM_VOLUME";
const RESET_ITEM_VOLUME = "utility/SET_ITEM_VOLUME";

const initialState = {
    headerMenu: {
        currentMenu: 0,
        isOpen: false,
    },
    msgBoxOpen: {
        isOpen: false,
        msgBoxId: 0,
        msgBoxTitle: "",
    },
    paging: {
        currentPage: 1,
        itemVolume: 20,
    }
}


//페이지 이동
export const paginate = (number) => {
    return {
        type: SET_CURRENT_PAGE,
        number
    }
}
//한 페이지에 나타낼 아이템 수 조정
export const setItemVolumn = (volume) => {
    return {
        type: SET_ITEM_VOLUME,
        volume
    }
}
// 아이템 수 리셋
export const resetItemVolume = () => {
    return {
        type: RESET_ITEM_VOLUME
    }
}
//메인 화면으로 이동
export const goToHome = (navigate) => () => {
    navigate('/')
}
//상단 메뉴로 이동시 이동한 메뉴 밑에 라인으로 표시
export const headerMenuChange = (e) => {
    let currentValue;
    if (!e.target) {
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
//상단 메뉴 라인 없앰
export const headerMenuDefault = () => {
    return {
        type: HEADER_MENU_DEFAULT,
    }
}
//상단 토글 메뉴 open/close
export const onToggleClick = () => {
    return {
        type: IS_TOGGLE_CLICKED,
    }
}
//메세지 박스 open/close
export const msgBoxControl = () => {
    return {
        type: IS_MSGBOX_OPEN,
    }
}
// 메세지 박스 id 담기
export const msgBoxAiming = (id, title) => {
    return {
        type: IS_MSGBOX_AIMING,
        id,
        title
    }
}
//메세지 박스 id reset
export const resetMsgBoxAiming = () => {
    return {
        type: RESET_MSGBOX_AIMING,
    }
}


export default function utility(state = initialState, action) {
    switch (action.type) {
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
        case IS_MSGBOX_OPEN:
            return {
                ...state,
                msgBoxOpen: {
                    ...state.msgBoxOpen,
                    isOpen: !state.msgBoxOpen.isOpen
                }
            }
        case IS_MSGBOX_AIMING:
            return {
                ...state,
                msgBoxOpen: {
                    ...state.msgBoxOpen,
                    msgBoxId: action.id,
                    msgBoxTitle: action.title
                }
            }
        case RESET_MSGBOX_AIMING:
            return {
                ...state,
                msgBoxOpen: {
                    ...state.msgBoxOpen,
                    msgBoxId: 0,
                    msgBoxTitle: "",
                }
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    currentPage: action.number,
                }
            }
        case SET_ITEM_VOLUME:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    itemVolume: action.volume
                }
            }
        case RESET_ITEM_VOLUME:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    itemVolume: 20
                }
            }
        default:
            return state;
    }
}