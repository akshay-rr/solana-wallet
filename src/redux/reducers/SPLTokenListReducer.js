import { RetrievableDataStatus } from "../../constants/AppConstants";
import { REQUEST_SPL_TOKEN_LIST_ACTION, SET_SPL_TOKEN_LIST_ACTION, SET_SPL_TOKEN_LIST_ERROR_ACTION } from "../actions/SPLTokenActions";

const initialState = {
    data: [],
    status: RetrievableDataStatus.INIT
};

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case REQUEST_SPL_TOKEN_LIST_ACTION:
            return {
                ...state,
                status: RetrievableDataStatus.REQUESTED
            }
        case SET_SPL_TOKEN_LIST_ACTION:
            return {
                data: payload,
                status: RetrievableDataStatus.RETRIEVED
            }
        case SET_SPL_TOKEN_LIST_ERROR_ACTION:
            return {
                ...state,
                status: RetrievableDataStatus.ERROR
            }
        default:
            return state
    }
}