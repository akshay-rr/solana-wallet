import { call, put, takeLatest } from "redux-saga/effects";
import { getAssociatedTokenAccounts } from "../../services/Web3Service";
import { GET_SPL_TOKEN_LIST_ACTION, requestSPLTokenListAction, setSPLTokenListAction, setSPLTokenListErrorAction } from "../actions/SPLTokenActions";


export function* getSPLTokenList(action) {
    const { wallet, network } = action.payload;
    try {
        yield put(requestSPLTokenListAction());
        const tokenList = yield call(getAssociatedTokenAccounts, wallet, network);
        yield put(setSPLTokenListAction(tokenList));
    } catch (e) {
        console.log(e);
        yield put(setSPLTokenListErrorAction());
    }
}

export default function* SPLTokenListSaga() {
    yield takeLatest(GET_SPL_TOKEN_LIST_ACTION, getSPLTokenList);
}