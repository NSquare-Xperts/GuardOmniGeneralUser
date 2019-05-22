//import { State } from "react-native-gesture-handler";
import { COMPLAINT_TITLE,COMPLAINT_COMMENTS, ADD_COMPLAINT_FAILED, ADD_COMPLAINT } from "../actions/types";

const INITIAL_STATE = { title: '', comments : '' }

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case COMPLAINT_TITLE:
            return { ...state, title: action.payload }
        case COMPLAINT_COMMENTS:
            return {...state, comments: action.payload}
        case ADD_COMPLAINT_FAILED: 
            return{...state,loading: false,error: action.payload,displayModal: true}
        case ADD_COMPLAINT: 
            return {...state, data: action.payload, loading: false}
      
        default:
            return state
    }
}