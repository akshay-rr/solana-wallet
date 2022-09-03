import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isValidString } from "../utils/Utils";
import Topbar from "./common/Topbar";
import NetworkBanner from "./common/NetworkBanner";

const AddSPLToken = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [mintAddress, setMintAddress] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const cancel = () => {
        navigate('/token-list');
    };

    const next = () => {
        alert('Add');
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

export default AddSPLToken;