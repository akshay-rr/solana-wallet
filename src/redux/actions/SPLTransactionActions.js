export const SET_SPL_TRANSACTION_ACTION = 'SET_SPL_TRANSACTION_ACTION';

export const SEND_SPL_TRANSACTION_ACTION = 'SEND_SPL_TRANSACTION_ACTION';
export const REQUEST_SPL_TRANSACTION_RESPONSE_ACTION = 'REQUEST_SPL_TRANSACTION_RESPONSE_ACTION';
export const SET_SPL_TRANSACTION_RESPONSE_ACTION = 'SET_SPL_TRANSACTION_RESPONSE_ACTION';
export const SET_SPL_TRANSACTION_RESPONSE_ERROR_ACTION = 'SET_SPL_TRANSACTION_RESPONSE_ERROR_ACTION';

export const setSPLTransactionAction = (transaction) => ({
    type: SET_SPL_TRANSACTION_ACTION,
    payload: transaction
});

export const sendSPLTransactionAction = (transactionDetails) => ({
    type: SEND_SPL_TRANSACTION_ACTION,
    payload: transactionDetails
});

export const requestSPLTransactionResponseAction = () => ({
    type: REQUEST_SPL_TRANSACTION_RESPONSE_ACTION
});

export const setSPLTransactionResponseAction = (transactionResponse) => ({
    type: SET_SPL_TRANSACTION_RESPONSE_ACTION,
    payload: transactionResponse
});

export const setSPLTransactionResponseErrorAction = () => ({
    type: SET_SPL_TRANSACTION_RESPONSE_ERROR_ACTION
});

