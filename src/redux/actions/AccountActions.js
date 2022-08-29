export const SET_SELECTED_ACCOUNT_ACTION = 'SET_SELECTED_ACCOUNT';

export const SET_SELECTED_NETWORK_ACTION = 'SET_SELECTED_NETWORK_ACTION';


export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const REQUEST_WALLET_BALANCE = 'REQUEST_WALLET_BALANCE';
export const SET_WALLET_BALANCE = 'SET_WALLET_BALANCE';
export const SET_WALLET_BALANCE_ERROR = 'SET_WALLET_BALANCE_ERROR';

export const GET_WALLET_TRANSACTIONS = 'GET_WALLET_TRANSACTIONS';
export const REQUEST_WALLET_TRANSACTIONS = 'REQUEST_WALLET_TRANSACTIONS';
export const SET_WALLET_TRANSACTIONS = 'SET_WALLET_TRANSACTIONS';
export const SET_WALLET_TRANSACTIONS_ERROR = 'SET_WALLET_TRANSACTIONS_ERROR';


export const setSelectedAccount = (account) => ({
    type: SET_SELECTED_ACCOUNT_ACTION,
    payload: account
});

export const setSelectedNetwork = (networkObject) => ({
    type: SET_SELECTED_NETWORK_ACTION,
    payload: networkObject
});

// Balance
export const getWalletBalanceAction = (walletAddress, network) => ({
    type: GET_WALLET_BALANCE,
    payload: {
        walletAddress: walletAddress,
        network: network
    }
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

// Transactions
export const getWalletTransactionsAction = (walletAddress, network) => ({
    type: GET_WALLET_TRANSACTIONS,
    payload: {
        walletAddress: walletAddress,
        network: network
    }
});

export const requestAccountTransactionsAction = () => ({
    type: REQUEST_WALLET_TRANSACTIONS
});

export const setWalletTransactionsAction = (walletBalance) => ({
    type: SET_WALLET_TRANSACTIONS,
    payload: walletBalance
});

export const setWalletTransactionsErrorAction = () => ({
    type: SET_WALLET_TRANSACTIONS_ERROR
});