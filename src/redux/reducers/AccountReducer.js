import { RetrievableDataStatus } from "../../constants/AppConstants";
import { REQUEST_WALLET_BALANCE, SET_SELECTED_ACCOUNT_ACTION, SET_WALLET_BALANCE, SET_WALLET_BALANCE_ERROR } from "../actions/AccountActions";

const initialState = {
    selectedAccount: null,
    balance: {
        data: 0,
        status: RetrievableDataStatus.INIT
    },
    transactions: {
        data: [],
        status: RetrievableDataStatus.INIT
    }
};

export default(state = initialState, {type, payload}) => {
    switch(type) {
        case SET_SELECTED_ACCOUNT_ACTION:
            return {
                ...state,
                selectedAccount: payload
            }
        case SET_WALLET_BALANCE:
            return {
                ...state,
                balance: {
                    data: payload,
                    status: RetrievableDataStatus.RETRIEVED
                }
            }
        case REQUEST_WALLET_BALANCE:
            return {
                ...state,
                balance: {
                    ...state.balance,
                    status: RetrievableDataStatus.REQUESTED
                }
            }
        case SET_WALLET_BALANCE_ERROR:
            return {
                ...state,
                balance: {
                    ...state.balance,
                    status: RetrievableDataStatus.ERROR
                }
            }
        default:
            return state;
    }
}