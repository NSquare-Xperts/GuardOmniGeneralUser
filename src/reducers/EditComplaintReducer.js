import { COMPLAINT_TITLE,COMPLAINT_COMMENTS,EDIT_COMPLAINT_COMMENTS, EDIT_COMPLAINT_FAILED, EDIT_COMPLAINT } from "../actions/types";

const INITIAL_STATE = { title: '', comments : '' }

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case COMPLAINT_TITLE:
            return { ...state, title: action.payload }
        case COMPLAINT_COMMENTS:            
            return {...state, comments: action.payload}
            case EDIT_COMPLAINT_COMMENTS:
            return {...state, comments: action.payload}
        case EDIT_COMPLAINT_FAILED: 
            return{...state,loading: false,error: action.payload,displayModal: true}
        case EDIT_COMPLAINT: 
            return {...state, data: action.payload, loading: false}
      
        default:
            return state
    }
}