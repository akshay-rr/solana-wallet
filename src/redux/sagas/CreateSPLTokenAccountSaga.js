import { call, put, takeLatest } from "redux-saga/effects";
import { createAssociatedTokenAccount } from "../../services/Web3Service";
import { GET_ASSOCIATED_TOKEN_ACCOUNT_ACTION, requestAssociatedTokenAccountAction, setAssociatedTokenAccountAction, setAssociatedTokenErrorAccountAction } from "../actions/SPLTokenActions";


export function* createSplTokenAccount(action) {
    const {walletKeypair, network, mintAddress} = action.payload;
    try {
        yield put(requestAssociatedTokenAccountAction());
        const tokenAccount = yield call(createAssociatedTokenAccount, walletKeypair, network, mintAddress);
        yield put(setAssociatedTokenAccountAction(tokenAccount));
    } catch(e) {
        console.log(e);
        yield put(setAssociatedTokenErrorAccountAction());
    }
}

export default function* CreateSPLTokenAccountSaga() {
    yield takeLatest(GET_ASSOCIATED_TOKEN_ACCOUNT_ACTION, createSplTokenAccount);
}