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
import NetworkBanner from "./common/NetworkBanner";
import Topbar from "./common/Topbar";

const RecentActivity = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    useEffect(() => {
        dispatch(getWalletTransactionsAction(walletAddress, account.selectedNetwork.url));
    }, []);

    return (
        <div className="App">
            <div className="App-header-main">

                <Topbar />

                <NetworkBanner />

                <div id={'content'}>
                    <div className="content-child page-heading">
                        <h2>Recent Activity</h2>
                    </div>

                    <div className="content-child">
                        {
                            account.transactions.status === RetrievableDataStatus.RETRIEVED ?
                            <>
                                {
                                account.transactions.data.map((transaction) => {
                                    return <TransactionCard transaction={transaction} />
                                })
                                }
                            </> :
                            account.transactions.status === RetrievableDataStatus.ERROR ?
                            <div>Error</div> :
                            <Loading />
                        }
                    </div>
                </div>

                <div id={'navbar'} className="row">
                    <div className="col-md-12">
                        <div className="nav-button-container">
                            <div className="navbar-element" onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                            <div className="navbar-element">
                                <FontAwesomeIcon icon={faBoltLightning} />
                            </div>
                            <div className="navbar-element" onClick={() => navigate('/settings')}>
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