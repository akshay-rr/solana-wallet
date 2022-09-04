import { RetrievableDataStatus } from "../../constants/AppConstants";
import { REQUEST_ASSOCIATED_TOKEN_ACCOUNT_ACTION, SET_ASSOCIATED_TOKEN_ACCOUNT_ACTION, SET_ASSOCIATED_TOKEN_ACCOUNT_ERROR_ACTION } from "../actions/SPLTokenActions";

const initialState = {
    data: null,
    status: RetrievableDataStatus.INIT
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case REQUEST_ASSOCIATED_TOKEN_ACCOUNT_ACTION:
            return {
                ...state,
                status: RetrievableDataStatus.REQUESTED
            }
        case SET_ASSOCIATED_TOKEN_ACCOUNT_ACTION:
            return {
                data: payload,
                status: RetrievableDataStatus.RETRIEVED
            }
        case SET_ASSOCIATED_TOKEN_ACCOUNT_ERROR_ACTION:
            return {
                ...state,
                status: RetrievableDataStatus.ERROR
            }
        default: 
            return state;
    }
}