import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import OnboardingReducer from "./OnboardingReducer";
import TransferReducer from "./TransferReducer";
import TransactionReducer from "./TransactionReducer";
import SPLTokenListReducer from "./SPLTokenListReducer";
import CreateSPLTokenAccountReducer from "./CreateSPLTokenAccountReducer";
import SPLTransactionReducer from "./SPLTransactionReducer";

export default combineReducers({
    onboarding: OnboardingReducer,
    account: AccountReducer,
    transfer: TransferReducer,
    transaction: TransactionReducer,
    splTokenList: SPLTokenListReducer,
    createSplTokenAccount: CreateSPLTokenAccountReducer,
    splTransaction: SPLTransactionReducer
});
