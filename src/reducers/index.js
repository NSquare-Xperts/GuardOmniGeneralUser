import { combineReducers } from 'redux'
import NewAuthReducer from './NewAuthReducer'
import CodesReducer from './codesReducer'
import AddVisitorRequestReducer from './AddVisitorRequestReducer';
import AddComplaintReducer from './AddComplaintReducer';
import EditProfileReducer from './EditProfileReducer';
import EditComplaintReducer from './EditComplaintReducer';
import EditVisitorRequestReducer from './EditVisitorRequestReducer';

export default combineReducers ({
     auth: NewAuthReducer,
     addVisitor: AddVisitorRequestReducer,
     addComplaint: AddComplaintReducer,
     editProfile: EditProfileReducer,
     editComplaint: EditComplaintReducer,
     editVisitorRequest: EditVisitorRequestReducer,
     
     codes: CodesReducer,
})