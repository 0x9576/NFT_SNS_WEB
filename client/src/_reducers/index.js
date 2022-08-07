import { combineReducers } from 'redux'
import account from './user_reducer';

const rootReducer = combineReducers({
    account
})

export default rootReducer;