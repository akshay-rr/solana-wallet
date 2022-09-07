import { put, call, takeLatest } from 'redux-saga/effects';
import { transferSPLToken } from '../../services/Web3Service';
import { requestSPLTransactionResponseAction, SEND_SPL_TRANSACTION_ACTION, setSPLTransactionResponseAction, setSPLTransactionResponseErrorAction } from '../actions/SPLTransactionActions';

export function* sendSPLTokenTransaction(action) {
    const {wallet, to, amount, mintAddress, network} = action.payload;
    try {
        yield put(requestSPLTransactionResponseAction());
        const transactionResponse = yield call(transferSPLToken, wallet, to, amount, mintAddress, network);
        yield put(setSPLTransactionResponseAction(transactionResponse));
    } catch (e) {
        console.log(e);
        yield put(setSPLTransactionResponseErrorAction());
    }
}

export default function* SPLTransactionResponseSaga() {
    yield takeLatest(SEND_SPL_TRANSACTION_ACTION, sendSPLTokenTransaction);
}