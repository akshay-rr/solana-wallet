import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import OnboardingReducer from "./OnboardingReducer";
import TransferReducer from "./TransferReducer";
import TransactionReducer from "./TransactionReducer";

export default combineReducers({
    onboarding: OnboardingReducer,
    account: AccountReducer,
    transfer: TransferReducer,
    transaction: TransactionReducer
});
