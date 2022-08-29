import { useSelector, shallowEqual } from "react-redux";
import { getWalletAddressFromSeed } from "../../services/Web3Service";

const Topbar = () => {

    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    return (
        <div id={'topbar'} className={'row'}>
            <div className="col-sm-12">
                <div 
                    id={'mainWalletAddress'} 
                    onClick={() => navigator.clipboard.writeText(walletAddress)}>
                    {walletAddress}
                </div>
            </div>
        </div>
    )
}

export default Topbar;