import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWalletAddressFromSeed } from "../services/Web3Service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faBoltLightning, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getWalletTransactionsAction } from "../redux/actions/AccountActions";
import { RetrievableDataStatus } from "../constants/AppConstants";
import Loading from "./common/Loading";
import TransactionCard from "./TransactionCard";
import NetworkBanner from "./NetworkBanner";

const RecentActivity = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);
    console.log(account);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    useEffect(() => {
        dispatch(getWalletTransactionsAction(walletAddress, account.selectedNetwork.url));
    }, []);

    return (
        <div className="App">
            <div className="App-header-main">

                <div id={'topbar'} className={'row'}>
                    <div className="col-sm-12">
                        <div 
                            id={'mainWalletAddress'} 
                            onClick={() => navigator.clipboard.writeText(walletAddress)}>
                            {walletAddress}
                        </div>
                    </div>
                </div>

                <NetworkBanner />

                <div id={'content'} className="row">
                    <div className="col-md-12">
                        <div className="content-heading">
                            <h2>Recent Activity</h2>
                        </div>

                        <div className="content-body">
                            {
                                account.transactions.status === RetrievableDataStatus.RETRIEVED ?
                                <>
                                    {
                                    account.transactions.data.map((transaction) => {
                                        return <TransactionCard tranaction={transaction} />
                                    })
                                    }
                                </> :
                                account.transactions.status === RetrievableDataStatus.ERROR ?
                                <div>Error</div> :
                                <Loading />
                            }
                        </div>
                    </div>
                </div>

                <div id={'navbar'} className="row">
                    <div className="col-md-12">
                        <div className="nav-button-container">
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBoltLightning} />
                            </div>
                            <div onClick={() => navigate('/settings')}>
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RecentActivity;