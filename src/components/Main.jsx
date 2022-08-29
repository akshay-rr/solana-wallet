import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RetrievableDataStatus } from "../constants/AppConstants";
import { getWalletBalanceAction } from "../redux/actions/AccountActions";
import Loading from "./common/Loading";
import { getWalletAddressFromSeed } from "../services/Web3Service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faBoltLightning, faGear } from "@fortawesome/free-solid-svg-icons";
import NetworkBanner from "./NetworkBanner";

const Main = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const account = useSelector((state) => state.account, shallowEqual);
    console.log(account);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    useEffect(() => {
        console.log('Fetch account details');
        dispatch(getWalletBalanceAction(walletAddress, account.selectedNetwork.url));
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

                        <div></div>
                        
                        <div className="button-row">
                            <div className="button-row-child">
                                <button className="btn btn-primary">Deposit</button>
                            </div>
                            <div className="button-row-child">
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </div>
                        {
                            account.balance.status === RetrievableDataStatus.REQUESTED 
                            || account.balance.status === RetrievableDataStatus.INIT ?
                            <Loading /> :
                            account.balance.status === RetrievableDataStatus.RETRIEVED ?
                            <div className="token-balance-card">
                                <div>Solana</div>
                                <div>
                                    <span className="token-amount">{account.balance.data}</span>
                                    <span className="token-symbol">SOL</span>
                                </div>
                            </div> :
                            account.balance.status === RetrievableDataStatus.ERROR ?
                            <div>Error</div> :
                            <div>Unknown</div>
                        }
                    </div>
                </div>

                <div id={'navbar'} className="row">
                    <div className="col-md-12">
                        <div className="nav-button-container">
                            <div>
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                            <div onClick={() => navigate('/activity')}>
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

export default Main;