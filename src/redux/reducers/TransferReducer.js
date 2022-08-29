import { DEPOSIT_STEPS, SEND_STEPS } from "../../constants/Constants";
import { SET_DEPOSIT_STEP_ACTION, SET_SELECTED_TOKEN_ACTION, SET_SEND_STEP_ACTION } from "../actions/TransferActions";

const initialState = {
    sendStep: SEND_STEPS.TOKEN_SELECT,
    depositStep: DEPOSIT_STEPS.TOKEN_SELECT,
    selectedToken: null
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_DEPOSIT_STEP_ACTION:
            return {
                ...state,
                depositStep: payload
            }
        case SET_SEND_STEP_ACTION:
            return {
                ...state,
                sendStep: payload
            }
        case SET_SELECTED_TOKEN_ACTION:
            return {
                ...state,
                selectedToken: payload
            }
        default:
            return state;
    }
}