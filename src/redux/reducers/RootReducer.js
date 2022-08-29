import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import OnboardingReducer from "./OnboardingReducer";
import TransferReducer from "./TransferReducer";

export default combineReducers({
    onboarding: OnboardingReducer,
    account: AccountReducer,
    transfer: TransferReducer
});
