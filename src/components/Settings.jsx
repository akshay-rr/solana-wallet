import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWalletAddressFromSeed } from "../services/Web3Service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faBoltLightning, faGear } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {

    const navigate = useNavigate();

    const account = useSelector((state) => state.account, shallowEqual);
    console.log(account);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

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



                <div id={'content'} className="row">
                    <div className="col-md-12">
                        <div className="content-heading">
                            <h2>Settings</h2>
                        </div>
                    </div>
                </div>

                <div id={'navbar'} className="row">
                    <div className="col-md-12">
                        <div className="nav-button-container">
                            <div onClick={() => navigate('/')}>
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                            <div onClick={() => navigate('/activity')}>
                                <FontAwesomeIcon icon={faBoltLightning} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Settings;