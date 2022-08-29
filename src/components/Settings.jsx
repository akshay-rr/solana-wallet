import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWalletAddressFromSeed } from "../services/Web3Service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faBoltLightning, faGear } from "@fortawesome/free-solid-svg-icons";
import { NETWORKS } from "../constants/Constants";
import { setSelectedNetwork } from "../redux/actions/AccountActions";
import { getNetworkObjectByNetworkName } from "../utils/Utils";
import { saveNetwork } from "../services/DataStorageService";
import NetworkBanner from "./common/NetworkBanner";
import Topbar from "./common/Topbar";

const Settings = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);
    console.log(account);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    const changeNetwork = (networkName) => {
        const networkObj = getNetworkObjectByNetworkName(networkName)
        dispatch(setSelectedNetwork(networkObj));
        saveNetwork(networkObj);
    }

    const lockAccount = () => {
        alert('Lock');
    }

    const removeAccount = () => {
        alert('Remove');
    }

    return (
        <div className="App">
            <div className="App-header-main">

                <Topbar />

                <NetworkBanner />

                <div id={'content'} className="row">
                    <div className="col-md-12">
                        <div className="content-heading">
                            <h2>Settings</h2>
                        </div>

                        <div className="content-body">
                            <select 
                                class="form-select form-select-lg mb-3" 
                                aria-label=".form-select-lg example"
                                value={account.selectedNetwork.name}
                                onChange={(e) => changeNetwork(e.currentTarget.value)}>
                                {
                                    Object.values(NETWORKS).map((networkObject) => {
                                        return <option value={networkObject.name}>{networkObject.name}</option>
                                    })
                                }
                            </select>
                            <br />
                            <button className="btn btn-primary btn-warning">Lock Account</button>
                            <br />
                            <button className="btn btn-primary btn-danger">Remove Account</button>
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