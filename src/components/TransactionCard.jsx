import { getExplorerUrl } from "../services/Web3Service";
import { useSelector, shallowEqual } from "react-redux";

const TransactionCard = ({ transaction }) => {

    const account = useSelector((state) => state.account, shallowEqual);

    const explorerUrl = getExplorerUrl(transaction.signature, account.selectedNetwork);

    const openExplorer = () => {
        window.open(explorerUrl, "_blank");
    }    

    return (
        <div className="transaction-card" onClick={openExplorer}>
            {transaction.signature}
        </div>
    )
}

export default TransactionCard;