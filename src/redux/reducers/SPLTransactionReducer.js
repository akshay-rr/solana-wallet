import { RetrievableDataStatus } from "../../constants/AppConstants";
import { 
    SET_SPL_TRANSACTION_ACTION, 
    REQUEST_SPL_TRANSACTION_RESPONSE_ACTION,
    SET_SPL_TRANSACTION_RESPONSE_ACTION,
    SET_SPL_TRANSACTION_RESPONSE_ERROR_ACTION
} from "../actions/SPLTransactionActions";

const initialState = {
    transactionDetails: null,
    response: {
        data: null,
        status: RetrievableDataStatus.INIT
    }
};

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_SPL_TRANSACTION_ACTION:
            return {
                ...state,
                transactionDetails: payload
            }

        case REQUEST_SPL_TRANSACTION_RESPONSE_ACTION:
            return {
                ...state,
                response: {
                    ...state.response,
                    status: RetrievableDataStatus.REQUESTED
                }
            }
        case SET_SPL_TRANSACTION_RESPONSE_ACTION:
            return {
                ...state,
                response: {
                    data: payload,
                    status: RetrievableDataStatus.RETRIEVED
                }
            }
        case SET_SPL_TRANSACTION_RESPONSE_ERROR_ACTION:
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