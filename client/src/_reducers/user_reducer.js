import {
    CONNECT_WALLET
} from '../_actions/types';

//reducer: state를 변환
export default function (state = {}, action) {
    //많은 type을 처리하기 위함.
    switch (action.type) {
        case CONNECT_WALLET:
            return { account: action.payload }
        default:
            return state;
    }
}