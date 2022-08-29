export const SET_SEND_STEP_ACTION = 'SET_SEND_STEP_ACTION';
export const SET_DEPOSIT_STEP_ACTION = 'SET_DEPOSIT_STEP_ACTION';
export const SET_SELECTED_TOKEN_ACTION = 'SET_SELECTED_TOKEN_ACTION';

export const setSendStepAction = (step) => ({
    type: SET_SEND_STEP_ACTION,
    payload: step
});

export const setDepositStepAction = (step) => ({
    type: SET_DEPOSIT_STEP_ACTION,
    payload: step
});

export const setSelectedTokenAction = (tokenSymbol) => ({
    type: SET_SELECTED_TOKEN_ACTION,
    payload: tokenSymbol
});