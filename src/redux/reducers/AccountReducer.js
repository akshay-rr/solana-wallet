import { RetrievableDataStatus } from "../../constants/AppConstants";
import { NETWORKS } from "../../constants/Constants";
import { REQUEST_WALLET_BALANCE, REQUEST_WALLET_TRANSACTIONS, SET_SELECTED_ACCOUNT_ACTION, SET_SELECTED_NETWORK_ACTION, SET_WALLET_BALANCE, SET_WALLET_BALANCE_ERROR, SET_WALLET_TRANSACTIONS, SET_WALLET_TRANSACTIONS_ERROR } from "../actions/AccountActions";

const initialState = {
    selectedAccount: null,
    selectedNetwork: NETWORKS.DEV,
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
        case SET_SELECTED_NETWORK_ACTION:
            return {
                ...state,
                selectedNetwork: payload
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

        case SET_WALLET_TRANSACTIONS:
            return {
                ...state,
                transactions: {
                    data: payload,
                    status: RetrievableDataStatus.RETRIEVED
                }
            }
        case REQUEST_WALLET_TRANSACTIONS:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    status: RetrievableDataStatus.REQUESTED
                }
            }
        case SET_WALLET_TRANSACTIONS_ERROR: 
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    status: RetrievableDataStatus.ERROR
                }
            }
        default:
            return state;
    }
}