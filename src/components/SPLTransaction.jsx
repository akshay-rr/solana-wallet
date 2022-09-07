import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendSPLTransactionAction } from "../redux/actions/SPLTransactionActions";
import Topbar from "./common/Topbar";
import { getKeypairFromSeed } from "../services/Web3Service";
import { RetrievableDataStatus } from "../constants/AppConstants";
import TransactionCard from "./TransactionCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import NetworkBanner from "./common/NetworkBanner";
import { TransactionLoading, TransactionFailure } from "./Transaction";
import { loadTokenAccountMetadata } from "../services/DataStorageService";

const ConfirmSPLTransaction = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const splTransaction = useSelector((state) => state.splTransaction, shallowEqual);
    const { transactionDetails } = splTransaction;
    const tokenMetaData = loadTokenAccountMetadata();
    const { symbol } = tokenMetaData[transactionDetails.mintAddress];

    const account = useSelector((state) => state.account, shallowEqual);

    const wallet = getKeypairFromSeed(account.selectedAccount.wallet.seed);
    
    const cancel = () => {
        navigate('/send');
    };

    const send = () => {
        dispatch(sendSPLTransactionAction({
            wallet: wallet,
            to: transactionDetails.to,
            amount: transactionDetails.amount,
            mintAddress: transactionDetails.mintAddress,
            network: account.selectedNetwork.url
        }))
    }

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
                                <h1>{transactionDetails.amount} {symbol}</h1>
                            </div>
                            <div className="transaction-details-arrow">&darr;</div>
                            <div className="transaction-details-to-address">
                                {transactionDetails.to}
                            </div>
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
                            onClick={send}>Send</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const SPLTransactionSuccess = () => {

    const navigate = useNavigate();

    const splTransaction = useSelector((state) => state.splTransaction, shallowEqual);

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
                    <TransactionCard transactionDetail={splTransaction.response.data} />
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

const SPLTransaction = () => {
    const splTransaction = useSelector((state) => state.splTransaction, shallowEqual);

    switch(splTransaction.response.status) {
        case RetrievableDataStatus.INIT:
            return <ConfirmSPLTransaction />
        case RetrievableDataStatus.REQUESTED:
            return <TransactionLoading />
        case RetrievableDataStatus.RETRIEVED:
            return <SPLTransactionSuccess />
        default:
            return <TransactionFailure />
    }

}

export default SPLTransaction;