import { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTransactionEstimateAction, sendTransactionAction } from "../redux/actions/TransactionActions";
import Topbar from "./common/Topbar";
import { getKeypairFromSeed, getWalletAddressFromSeed } from "../services/Web3Service";
import { RetrievableDataStatus } from "../constants/AppConstants";
import Loading from "./common/Loading";
import TransactionCard from "./TransactionCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import NetworkBanner from "./common/NetworkBanner";

const ConfirmTransaction = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const transaction = useSelector((state) => state.transaction, shallowEqual);

    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);
    
    const cancel = () => {
        navigate('/send');
    };

    const send = () => {
        dispatch(sendTransactionAction(
            transaction.transaction,
            getKeypairFromSeed(account.selectedAccount.wallet.seed),
            account.selectedNetwork.url
        ))
    }

    useEffect(() => {
        dispatch(getTransactionEstimateAction(
            transaction.transaction,
            getKeypairFromSeed(account.selectedAccount.wallet.seed),
            account.selectedNetwork.url
        ));
    }, []);

    return (
        <div className="App">
            <div className="App-header-main">

                <Topbar />
                <NetworkBanner />

                <div id="content">
                    <div className="content-child page-heading-center">
                        <h2>Confirm Send</h2>
                    </div>

                    <div className="content-child">
                        <div className="transaction-details">
                            <div className="transaction-details-amount">
                                <h1>{transaction.transaction.amount} SOL</h1>
                            </div>
                            <div className="transaction-details-arrow">&darr;</div>
                            <div className="transaction-details-to-address">
                                {transaction.transaction.to}
                            </div>
                        </div>
                    </div>

                    <div className="content-child transaction-network-fee-container">
                        <div>Network Fee</div>
                        <div>
                            {
                                (transaction.estimate.status === RetrievableDataStatus.RETRIEVED) ?
                                transaction.estimate.data :
                                <Loading />
                            }
                        </div>
                    </div>
                </div>

                <div className="button-row">
                    <div className="button-row-child">
                        <button 
                            className="btn btn-primary"
                            onClick={cancel}>Cancel</button>
                    </div>
                    <div className="button-row-child">
                        <button 
                            className="btn btn-primary"
                            disabled={transaction.estimate.status !== RetrievableDataStatus.RETRIEVED}
                            onClick={send}>Send</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export const TransactionLoading = () => {
    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div className="content-child">
                    <h2>Transaction</h2>
                    <Loading />
                </div>
            </div>
        </div>
    )
}

const TransactionSuccess = () => {

    const navigate = useNavigate();

    const transaction = useSelector((state) => state.transaction, shallowEqual);

    const close = () => {
        navigate('/');
    };

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div className="content-child page-heading-center">
                    <h2>Transaction</h2>
                </div>
                <div className="conent-child">
                    <FontAwesomeIcon icon={faCircleCheck} color={'green'} />
                </div>
                <div className="content-child">
                    <TransactionCard transactionDetail={transaction.response.data}/>
                </div>

                <div className="button-row">
                    <button 
                        className="btn btn-primary btn-dark"
                        onClick={close}>Close</button>
                </div>
            </div>
        </div>
    )
}

export const TransactionFailure = () => {

    const navigate = useNavigate();

    const close = () => {
        navigate('/');
    };

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div className="content-child page-heading-center">
                    <h2>Transaction</h2>
                </div>
                <div className="conent-child">
                    <FontAwesomeIcon icon={faCircleXmark} color={'red'} />
                </div>

                <div className="button-row">
                    <button 
                        className="btn btn-primary btn-dark"
                        onClick={close}>Close</button>
                </div>
            </div>
        </div>
    )
}

const Transaction = () => {
    const transaction = useSelector((state) => state.transaction, shallowEqual);

    switch(transaction.response.status) {
        case RetrievableDataStatus.INIT:
            return <ConfirmTransaction />
        case RetrievableDataStatus.REQUESTED:
            return <TransactionLoading />
        case RetrievableDataStatus.RETRIEVED:
            return <TransactionSuccess />
        default:
            return <TransactionFailure />
    }

}

export default Transaction;