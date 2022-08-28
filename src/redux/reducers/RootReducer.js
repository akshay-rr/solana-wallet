import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import OnboardingReducer from "./OnboardingReducer";

export default combineReducers({
    onboarding: OnboardingReducer,
    account: AccountReducer
});
