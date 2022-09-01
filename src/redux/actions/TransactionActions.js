export const SET_TRANSACTION_ACTION = 'SET_TRANSACTION_ACTION';

export const GET_TRANSACTION_ESTIMATE_ACTION = 'GET_TRANSACTION_ESTIMATE';
export const REQUEST_TRANSACTION_ESTIMATE_ACTION = 'REQUEST_TRANSACTION_ESTIMATE_ACTION';
export const SET_TRANSACTION_ESTIMATE_ACTION = 'SET_TRANSACTION_ESTIMATE_ACTION';
export const SET_TRANSACTION_ESTIMATE_ERROR_ACTION = 'SET_TRANSACTION_ESTIMATE_ERROR_ACTION';

export const SEND_TRANSACTION_ACTION = 'SEND_TRANSACTION_ACTION';
export const REQUEST_TRANSACTION_RESPONSE_ACTION = 'REQUEST_TRANSACTION_RESPONSE_ACTION';
export const SET_TRANSACTION_RESPONSE_ACTION = 'SET_TRANSACTION_RESPONSE_ACTION';
export const SET_TRANSACTION_RESPONSE_ERROR_ACTION = 'SET_TRANSACTION_RESPONSE_ERROR_ACTION';

export const setTransactionAction = (transaction) => ({
    type: SET_TRANSACTION_ACTION,
    payload: transaction
});

export const getTransactionEstimateAction = (transaction, wallet, network) => ({
    type: GET_TRANSACTION_ESTIMATE_ACTION,
    payload: {
        transaction: transaction,
        wallet: wallet,
        network: network
    }
});

export const requestTransactionEstimateAction = () => ({
    type: REQUEST_TRANSACTION_ESTIMATE_ACTION
});

export const setTransactionEstimateAction = (estimate) => ({
    type: SET_TRANSACTION_ESTIMATE_ACTION,
    payload: estimate
});

export const setTransactionEstimateErrorAction = () => ({
    type: SET_TRANSACTION_ESTIMATE_ERROR_ACTION
});

export const sendTransactionAction = (transaction, wallet, network) => ({
    type: SEND_TRANSACTION_ACTION,
    payload: {
        transaction: transaction,
        wallet: wallet,
        network: network
    }
});

export const requestTransactionResponseAction = () => ({
    type: REQUEST_TRANSACTION_RESPONSE_ACTION
});

export const setTransactionResponseAction = (transactionResponse) => ({
    type: SET_TRANSACTION_RESPONSE_ACTION,
    payload: transactionResponse
});

export const setTransactionResponseErrorAction = () => ({
    type: SET_TRANSACTION_RESPONSE_ERROR_ACTION
});

