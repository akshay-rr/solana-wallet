import { getExplorerUrl } from "../services/Web3Service";
import { useSelector, shallowEqual } from "react-redux";

const TransactionCard = ({ transaction }) => {

    console.log(transaction.signature);

    const account = useSelector((state) => state.account, shallowEqual);

    console.log(account.selectedNetwork);

    const explorerUrl = getExplorerUrl(transaction.signature, account.selectedNetwork);

    console.log(explorerUrl);

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