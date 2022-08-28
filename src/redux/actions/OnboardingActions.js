export const SET_CREATE_NEW_WALLET_STEP_ACTION = 'SET_CREATE_NEW_WALLET_STEP_ACTION';
export const SET_IMPORT_WALLET_STEP_ACTION = 'IMPORT_WALLET_STEP_ACTION';
export const SET_ACCOUNT_PASSWORD_ACTION = 'SET_ACCOUNT_PASSWORD_ACTION';
export const SET_WALLET_ACTION = 'SET_WALLET_ACTION';

export const setCreateNewWalletStep = (step) => ({
    type: SET_CREATE_NEW_WALLET_STEP_ACTION,
    payload: step
});

export const setImportWalletStep = (step) => ({
    type: SET_IMPORT_WALLET_STEP_ACTION,
    payload: step
});

export const setAccountPassword = (password) => ({
    type: SET_ACCOUNT_PASSWORD_ACTION,
    payload: password
});

export const setWallet = (wallet) => ({
    type: SET_WALLET_ACTION,
    payload: wallet
});