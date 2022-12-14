import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { isValidString } from "../utils/Utils";
import Topbar from "./common/Topbar";
import NetworkBanner from "./common/NetworkBanner";
import { getAssociatedTokenAccountAction } from "../redux/actions/SPLTokenActions";
import { getKeypairFromSeed } from "../services/Web3Service";
import { saveTokenMetadata } from "../services/DataStorageService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { RetrievableDataStatus } from "../constants/AppConstants";
import Loading from "./common/Loading";


const AddSPLTokenFailure = () => {

    const navigate = useNavigate();

    const close = () => {
        navigate('/');
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />

                <div id="content">
                    <div className="content-chCild">
                        <h2>Error</h2>
                    </div>
                    <div className="conent-child">
                        <FontAwesomeIcon icon={faCircleXmark} color={'red'} />
                    </div>
                </div>
                
                <div className="button-row">
                    <button 
                        className="btn btn-primary btn-dark"
                        onClick={close}>Close</button>
                </div>
            </div>    
        </div>
    )
}


const AddSPLTokenSuccess = () => {

    const navigate = useNavigate();

    const close = () => {
        navigate('/');
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />

                <div id="content">
                    <div className="content-child">
                        <h2>Created Associated Token Account</h2>
                    </div>
                    <div className="conent-child">
                        <FontAwesomeIcon icon={faCircleCheck} color={'green'} />
                    </div>
                </div>
                
                <div className="button-row">
                    <button 
                        className="btn btn-primary btn-dark"
                        onClick={close}>Close</button>
                </div>
            </div>    
        </div>
    )
}


const AddSPLTokenLoading = () => {
    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div id="content">
                    <div className="content-child">
                        <h2>Creating Associated Token Account</h2>
                        <Loading />
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddSPLTokenForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account, shallowEqual);


    const [mintAddress, setMintAddress] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const cancel = () => {
        navigate('/token-list');
    };

    const next = () => {
        dispatch(getAssociatedTokenAccountAction(
            getKeypairFromSeed(account.selectedAccount.wallet.seed),
            account.selectedNetwork.url, 
            mintAddress
        ));
        saveTokenMetadata({
            mintAddress,
            name,
            symbol
        });
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div id={'content'}>
                    <div className="content-child page-heading">
                        <h2>Add Token Metadata</h2>
                    </div>
                    <div className="content-child">
                        <input 
                            id={'tokenMintAddress'} type="text"
                            className="form-control form-input-field add-token-input" placeholder="Mint Address" 
                            onKeyUp={(e) => setMintAddress(e.currentTarget.value)}
                            required />
                        <input 
                            id={'tokenName'} type="text"
                            className="form-control form-input-field add-token-input" placeholder="Name" 
                            onKeyUp={(e) => setName(e.currentTarget.value)}
                            required />
                        <input 
                            id={'tokenSymbol'} type="text"
                            className="form-control form-input-field add-token-input" placeholder="Symbol" 
                            onKeyUp={(e) => setSymbol(e.currentTarget.value)}
                            required />
                    </div>
                </div>

                <div className="button-row">
                    <div className="button-row-child">
                        <button 
                            className="btn btn-primary"
                            onClick={cancel}>Cancel</button>
                    </div>
                    <div className="button-row-child">
                        <button 
                            className="btn btn-primary"
                            disabled={!(isValidString(mintAddress) && isValidString(name) && isValidString(symbol))}
                            onClick={next}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const AddSPLToken = () => {

    const createSplTokenAccount = useSelector((state) => state.createSplTokenAccount, shallowEqual);

    switch(createSplTokenAccount.status){
        case RetrievableDataStatus.INIT:
            return <AddSPLTokenForm />
        case RetrievableDataStatus.REQUESTED:
            return <AddSPLTokenLoading />
        case RetrievableDataStatus.RETRIEVED:
            return <AddSPLTokenSuccess />
        default:
            return <AddSPLTokenFailure />
    }
}

export default AddSPLToken;