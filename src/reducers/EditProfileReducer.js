import { EDIT_USERNAME, EDIT_EMAIL,PROFILE_UPDATE, PROFILE_UPDATE_FAILED } from "../actions/types";

const INITIAL_STATE = {username:'',email: '' }

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case EDIT_USERNAME:
            return { ...state, username: action.payload }
        case EDIT_EMAIL:
            return { ...state, email: action.payload }
       
        case PROFILE_UPDATE_FAILED: 
            return{...state,loading: false,error: action.payload,displayModal: true}
        case PROFILE_UPDATE: 
            return {...state, data: action.payload, loading: false}
        default:
            return state
    }
}

