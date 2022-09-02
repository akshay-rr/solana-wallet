import { getExplorerUrl } from "../services/Web3Service";
import { useSelector, shallowEqual } from "react-redux";

const TransactionCard = ({ transactionDetail }) => {

    console.log(transactionDetail);

    const account = useSelector((state) => state.account, shallowEqual);

    const signature = transactionDetail.transaction.signatures[0];
    const err = transactionDetail.meta.err;
    const blockTime = transactionDetail.blockTime;

    const transactionCardStatusClass = (err) ? "transaction-card-status transaction-failure" : "transaction-card-status transaction-success";


    const explorerUrl = getExplorerUrl(signature, account.selectedNetwork);

    const openExplorer = () => {
        window.open(explorerUrl, "_blank");
    }    

    return (
        <div className="transaction-card" onClick={openExplorer}>
            <div className="transaction-card-meta">
                <div className={transactionCardStatusClass}>
                    { (err) ? "Failed" : "Success" }
                </div>
                <div className="transaction-card-time">
                    {blockTime}
                </div>
            </div>
            <div className="transaction-card-signature">{signature}</div>
        </div>
    )
}

export default TransactionCard;