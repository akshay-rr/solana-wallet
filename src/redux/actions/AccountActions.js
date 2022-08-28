export const SET_SELECTED_ACCOUNT_ACTION = 'SET_SELECTED_ACCOUNT';


export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const REQUEST_WALLET_BALANCE = 'REQUEST_WALLET_BALANCE';
export const SET_WALLET_BALANCE = 'SET_WALLET_BALANCE';
export const SET_WALLET_BALANCE_ERROR = 'SET_WALLET_BALANCE_ERROR';


export const setSelectedAccount = (account) => ({
    type: SET_SELECTED_ACCOUNT_ACTION,
    payload: account
});


export const getWalletBalanceAction = (walletAddress) => ({
    type: GET_WALLET_BALANCE,
    payload: walletAddress
});

export const requestAccountBalanceAction = () => ({
    type: REQUEST_WALLET_BALANCE
});

export const setWalletBalanceAction = (walletBalance) => ({
    type: SET_WALLET_BALANCE,
    payload: walletBalance
});

export const setWalletBalanceErrorAction = () => ({
    type: SET_WALLET_BALANCE_ERROR
});