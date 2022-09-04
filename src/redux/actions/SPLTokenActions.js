export const GET_SPL_TOKEN_LIST_ACTION = 'GET_SPL_TOKEN_LIST_ACTION';
export const REQUEST_SPL_TOKEN_LIST_ACTION = 'REQUEST_SPL_TOKEN_LIST_ACTION';
export const SET_SPL_TOKEN_LIST_ACTION = 'SET_SPL_TOKEN_LIST_ACTION';
export const SET_SPL_TOKEN_LIST_ERROR_ACTION = 'SET_SPL_TOKEN_LIST_ERROR_ACTION';

export const GET_ASSOCIATED_TOKEN_ACCOUNT_ACTION = 'GET_ASSOCIATED_TOKEN_ACCOUNT_ACTION';
export const REQUEST_ASSOCIATED_TOKEN_ACCOUNT_ACTION = 'REQUEST_ASSOCIATED_TOKEN_ACCOUNT_ACTION';
export const SET_ASSOCIATED_TOKEN_ACCOUNT_ACTION = 'SET_ASSOCIATED_TOKEN_ACCOUNT_ACTION';
export const SET_ASSOCIATED_TOKEN_ACCOUNT_ERROR_ACTION = 'SET_ASSOCIATED_TOKEN_ACCOUNT_ERROR_ACTION';


export const getSPLTokenListAction = (wallet, network) => ({
    type: GET_SPL_TOKEN_LIST_ACTION,
    payload: {
        wallet: wallet,
        network: network
    }
});

export const requestSPLTokenListAction = () => ({
    type: REQUEST_SPL_TOKEN_LIST_ACTION
});

export const setSPLTokenListAction = (tokenList) => ({
    type: SET_SPL_TOKEN_LIST_ACTION,
    payload: tokenList
});

export const setSPLTokenListErrorAction = () => ({
    type: SET_SPL_TOKEN_LIST_ERROR_ACTION
});

export const getAssociatedTokenAccountAction = (walletKeypair, network, mintAddress) => ({
    type: GET_ASSOCIATED_TOKEN_ACCOUNT_ACTION,
    payload: {
        walletKeypair,
        network,
        mintAddress
    }
});

export const requestAssociatedTokenAccountAction = () => ({
    type: REQUEST_ASSOCIATED_TOKEN_ACCOUNT_ACTION
});

export const setAssociatedTokenAccountAction = (tokenAccount) => ({
    type: SET_ASSOCIATED_TOKEN_ACCOUNT_ACTION,
    payload: tokenAccount
});

export const setAssociatedTokenErrorAccountAction = () => ({
    type: SET_ASSOCIATED_TOKEN_ACCOUNT_ERROR_ACTION
});

