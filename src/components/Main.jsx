import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RetrievableDataStatus } from "../constants/AppConstants";
import { getWalletBalanceAction } from "../redux/actions/AccountActions";
import Loading from "./common/Loading";
import { getWalletAddressFromSeed } from "../services/Web3Service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faBoltLightning, faGear } from "@fortawesome/free-solid-svg-icons";
import NetworkBanner from "./common/NetworkBanner";
import Topbar from "./common/Topbar";

const Main = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    useEffect(() => {
        console.log('Fetch account details');
        dispatch(getWalletBalanceAction(walletAddress, account.selectedNetwork.url));
    }, []);

    return (
        <div className="App">
            <div className="App-header-main">

                <Topbar />

                <NetworkBanner />


                <div id={'content'}>
                    <div className="button-row">
                        <div className="button-row-child">
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate('/deposit')}>Deposit</button>
                        </div>
                        <div className="button-row-child">
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate('/send')}>Send</button>
                        </div>
                    </div>
                    {
                        account.balance.status === RetrievableDataStatus.REQUESTED 
                        || account.balance.status === RetrievableDataStatus.INIT ?
                        <Loading /> :
                        account.balance.status === RetrievableDataStatus.RETRIEVED ?
                        <div className="content-child">
                            <div className="token-balance-card">
                                <div>Solana</div>
                                <div>
                                    <span className="token-amount">{account.balance.data}</span>
                                    <span className="token-symbol">SOL</span>
                                </div>
                            </div>
                        </div> :
                        account.balance.status === RetrievableDataStatus.ERROR ?
                        <div>Error</div> :
                        <div>Unknown</div>
                    }
                </div>

                <div id={'navbar'} className="row">
                    <div className="col-md-12">
                        <div className="nav-button-container">
                            <div className="navbar-element">
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                            <div className="navbar-element" onClick={() => navigate('/activity')}>
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

export default Main;