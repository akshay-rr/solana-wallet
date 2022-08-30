import { GET_WALLET_TRANSACTIONS, requestAccountTransactionsAction, setWalletTransactionsAction, setWalletTransactionsErrorAction } from "../actions/AccountActions";
import { put, call, takeLatest } from 'redux-saga/effects';
import { getWalletTransactions } from "../../services/Web3Service";

export function* getSelectedWalletTransactions(action) {
    const {walletAddress, network} = action.payload;
    try {
        yield put(requestAccountTransactionsAction());
        const walletTransactionsResponse = yield call(getWalletTransactions, walletAddress, network);
        yield put(setWalletTransactionsAction(walletTransactionsResponse));
    } catch (e) {
        yield put(setWalletTransactionsErrorAction());
    }
}

export default function* AccountTransactionsSaga() {
    yield takeLatest(GET_WALLET_TRANSACTIONS, getSelectedWalletTransactions);
}