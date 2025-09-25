import { createStore } from 'redux';

const defaultState = {
    passwords: [],
    currentPassword: [],
    favorites: [],
    passwordParamForChange: "",
    theme: "dark",
};

const reducer:any = (state = defaultState, action:any) => {
    switch (action.type) {
        case "SET_PASSWORDS":
            return {
                ...state,
                passwords: action.payload,
            }

        case "SET_CURRENT_PASSWORD":
            return {
                ...state,
                currentPassword: action.payload,
            }

        case "SET_FAVORITES":
            return {
                ...state,
                favorites: action.payload,
            }
        case "ADD_IN_FAVORITE":
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            }
        case "DELETE_FROM_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter((item:any) => item.passwordId !== action.payload.passwordId),
            }

        case "SET_PASSWORD_PARAM_FOR_CHANGE":
            return {
                ...state,
                passwordParamForChange: action.payload,
            }

        case "SET_THEME":
            return {
                ...state,
                theme: action.payload,
            }
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
