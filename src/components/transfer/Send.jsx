import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEND_STEPS } from "../../constants/Constants";
import Topbar from "../common/Topbar";


const SendTokenSelect = () => {

    const navigate = useNavigate();

    return (
        <>
            <div id={'content'} className="row">
                <div className="token-balance-card" onClick={() => navigate()}>
                    <div>Solana</div>
                </div>
            </div>

            <div className="button-row">
                <button 
                    className="btn btn-primary btn-dark"
                    onClick={() => navigate('/')}>Close</button>
            </div>
        </>
    )
}

const SendSolana = () => {

    const navigate = useNavigate();

    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState();

    return (
        <>
            <div id={'content'} className="row">
                <h2>Send SOL</h2>
                <input type="text" className="form-control" placeholder="Recepient's SOL address"
                    onKeyUp={(e) => setToAddress(e.currentTarget.value)} value={toAddress} />

                <br />
                <input type="number" className="form-control" placeholder="Recepient's SOL address"
                    onKeyUp={(e) => setAmount(e.currentTarget.value)} value={amount} />
                <br />
            </div>

            <div className="button-row">
                <div className="button-row-child">
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/')}>Cancel</button>
                </div>
                <div className="button-row-child">
                    <button 
                        className="btn btn-primary"
                        onClick={() => alert(amount)}>Next</button>
                </div>
            </div>
        </>
    )
}


const Send = () => {
    const [step, setStep] = useState(SEND_STEPS.TOKEN_SELECT);
    const [selectedToken, setSelectedToken] = useState();

    return (
        <div className="App">
            <div className="App-header">
                <Topbar />
                <SendTokenSelect />
            </div>
        </div>
    )

}

export default Send;