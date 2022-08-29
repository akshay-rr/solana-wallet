import { GET_WALLET_BALANCE, requestAccountBalanceAction, setWalletBalanceAction, setWalletBalanceErrorAction } from "../actions/AccountActions";
import { put, call, takeLatest } from 'redux-saga/effects';
import { getWalletBalance } from "../../services/Web3Service";

export function* getSelectedWalletBalance(action) {
    const {walletAddress, network} = action.payload;
    try {
        yield put(requestAccountBalanceAction());
        const walletBalanceResponse = yield call(getWalletBalance, walletAddress, network);
        yield put(setWalletBalanceAction(walletBalanceResponse));
    } catch (e) {
        yield put(setWalletBalanceErrorAction());
    }
}

export default function* AccountBalanceSaga() {
    yield takeLatest(GET_WALLET_BALANCE, getSelectedWalletBalance);
}