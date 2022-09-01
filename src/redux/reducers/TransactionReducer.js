import { RetrievableDataStatus } from "../../constants/AppConstants";
import { REQUEST_TRANSACTION_ESTIMATE_ACTION, SET_TRANSACTION_ACTION, SET_TRANSACTION_ESTIMATE_ACTION, SET_TRANSACTION_ESTIMATE_ERROR_ACTION, SET_TRANSACTION_RESPONSE_ACTION, REQUEST_TRANSACTION_RESPONSE_ACTION, SET_TRANSACTION_RESPONSE_ERROR_ACTION } from "../actions/TransactionActions";

const initialState = {
    transaction: null,
    estimate: {
        data: null,
        status: RetrievableDataStatus.INIT
    },
    response: {
        data: null,
        status: RetrievableDataStatus.INIT
    }
};

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_TRANSACTION_ACTION:
            return {
                ...state,
                transaction: payload
            }

        case REQUEST_TRANSACTION_ESTIMATE_ACTION:
            return {
                ...state,
                estimate: {
                    ...state.estimate,
                    status: RetrievableDataStatus.REQUESTED
                }
            }
        case SET_TRANSACTION_ESTIMATE_ACTION:
            return {
                ...state,
                estimate: {
                    data: payload,
                    status: RetrievableDataStatus.RETRIEVED
                }
            }
        case SET_TRANSACTION_ESTIMATE_ERROR_ACTION:
            return {
                ...state,
                estimate: {
                    ...state.estimate,
                    status: RetrievableDataStatus.ERROR
                }
            }

        case REQUEST_TRANSACTION_RESPONSE_ACTION:
            return {
                ...state,
                response: {
                    ...state.response,
                    status: RetrievableDataStatus.REQUESTED
                }
            }
        case SET_TRANSACTION_RESPONSE_ACTION:
            return {
                ...state,
                response: {
                    data: payload,
                    status: RetrievableDataStatus.RETRIEVED
                }
            }
        case SET_TRANSACTION_RESPONSE_ERROR_ACTION:
            return {
                ...state,
                response: {
                    ...state.response,
                    status: RetrievableDataStatus.ERROR
                }
            }
        default:
            return state;
    }
}