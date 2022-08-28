import { CREATE_NEW_WALLET_STEPS, IMPORT_WALLET_STEPS } from "../../constants/Constants";
import { SET_ACCOUNT_PASSWORD_ACTION, SET_CREATE_NEW_WALLET_STEP_ACTION, SET_IMPORT_WALLET_STEP_ACTION, SET_WALLET_ACTION } from "../actions/OnboardingActions";

const initialState = {
    newUser: true,
    createNewWalletStep: CREATE_NEW_WALLET_STEPS.ACCOUNT_CREDENTIALS,
    importWalletStep: IMPORT_WALLET_STEPS.SEED_PHRASE,
    wallet: null,
    password: null
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_CREATE_NEW_WALLET_STEP_ACTION:
            return {
                ...state,
                createNewWalletStep: payload
            }
        case SET_IMPORT_WALLET_STEP_ACTION:
            return {
                ...state,
                importWalletStep: payload
            }
        case SET_ACCOUNT_PASSWORD_ACTION:
            return {
                ...state,
                password: payload
            }
        case SET_WALLET_ACTION:
            return {
                ...state,
                wallet: payload
            }
        default:
            return state;
    }
}