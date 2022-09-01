import { put, call, takeLatest } from 'redux-saga/effects';
import { SEND_TRANSACTION_ACTION, requestTransactionResponseAction, setTransactionResponseAction, setTransactionResponseErrorAction } from '../actions/TransactionActions';
import { getTransactionResponse } from '../../services/Web3Service';

export function* sendSelectedTransaction(action) {
    const {transaction, wallet, network} = action.payload;
    try {
        yield put(requestTransactionResponseAction());
        const transactionResponse = yield call(getTransactionResponse, transaction, wallet, network);
        yield put(setTransactionResponseAction(transactionResponse));
    } catch (e) {
        console.log(e);
        yield put(setTransactionResponseErrorAction());
    }
}

export default function* TransactionResponseSaga() {
    yield takeLatest(SEND_TRANSACTION_ACTION, sendSelectedTransaction);
}