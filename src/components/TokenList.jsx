import NetworkBanner from "./common/NetworkBanner";
import Topbar from "./common/Topbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TokenList = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="App">
            <div className="App-header-main">
                <Topbar />
                <NetworkBanner />
                <div id={'content'}>
                    <div className="content-child token-list-search-container">
                        <input 
                            id={'tokenSearch'} type="text"
                            className="form-control form-input-field" placeholder="Search for tokens" 
                            aria-label="token-search"
                            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
                            required />
                        <button className="btn btn-primary" onClick={() => navigate('/add-spl-token')}>+</button>
                    </div>
                </div>

                <div className="button-row">
                    <button 
                        className="btn btn-primary btn-dark"
                        onClick={() => navigate('/')}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default TokenList;