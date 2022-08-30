import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SEND_STEPS } from "../../constants/Constants";
import Topbar from "../common/Topbar";
import { setSendStepAction, setSelectedTokenAction } from "../../redux/actions/TransferActions";
import { validateSolAddress } from "../../services/Web3Service";


const SendTokenSelect = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nextStep = () => {
        dispatch(setSelectedTokenAction('SOL'));
        dispatch(setSendStepAction(SEND_STEPS.SEND_ADDRESS));
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child">
                    <div className="token-balance-card" onClick={nextStep}>
                        <div>Solana</div>
                    </div>
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
    const dispatch = useDispatch();

    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState();

    const isValidAddress = validateSolAddress(toAddress);
    const isValidAmount = !isNaN(parseFloat(amount));

    const cancel = () => {
        dispatch(setSendStepAction(SEND_STEPS.TOKEN_SELECT));
        navigate('/');
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child page-heading-center">
                    <h2>Send SOL</h2>
                </div>

                <div className="content-child">
                    <input type="text" className="form-control form-input-field" placeholder="Recepient's SOL address"
                        onChange={(e) => setToAddress(e.currentTarget.value)} value={toAddress} />

                    <br />
                    <input type="number" className="form-control form-input-field" placeholder="Amount"
                        onChange={(e) => setAmount(e.currentTarget.value)} value={amount} />
                    <br />
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
                        disabled={!(isValidAddress && isValidAmount)}
                        onClick={() => alert(amount)}>Next</button>
                </div>
            </div>
        </>
    )
}


const Send = () => {
    
    const transfer = useSelector((state) => state.transfer, shallowEqual);

    return (
        <div className="App">
            <div className="App-header">
                <Topbar />
                {
                    transfer.sendStep === SEND_STEPS.TOKEN_SELECT ?
                    <SendTokenSelect /> :
                    <SendSolana />
                }
            </div>
        </div>
    )

}

export default Send;