import { put, call, takeLatest } from 'redux-saga/effects';
import { GET_TRANSACTION_ESTIMATE_ACTION, requestTransactionEstimateAction, setTransactionEstimateAction, setTransactionEstimateErrorAction } from '../actions/TransactionActions';
import { getTransactionEstimate } from '../../services/Web3Service';

export function* getSelectedTransactionEstimate(action) {
    const {transaction, wallet, network} = action.payload;
    try {
        yield put(requestTransactionEstimateAction());
        const transactionEstimate = yield call(getTransactionEstimate, transaction, wallet, network);
        yield put(setTransactionEstimateAction(transactionEstimate));
    } catch (e) {
        console.log(e);
        yield put(setTransactionEstimateErrorAction());
    }
}

export default function* TransactionEstimateSaga() {
    yield takeLatest(GET_TRANSACTION_ESTIMATE_ACTION, getSelectedTransactionEstimate);
}