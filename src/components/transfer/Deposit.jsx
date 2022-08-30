import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DEPOSIT_STEPS } from "../../constants/Constants";
import Topbar from "../common/Topbar";
import { setDepositStepAction, setSelectedTokenAction } from "../../redux/actions/TransferActions";
import { QRCodeSVG } from 'qrcode.react';
import { getWalletAddressFromSeed } from "../../services/Web3Service";


const DepositTokenSelect = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nextStep = () => {
        dispatch(setSelectedTokenAction('SOL'));
        dispatch(setDepositStepAction(DEPOSIT_STEPS.DEPOSIT_ADDRESS));
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

const DepositAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);
    
    const close = () => {
        dispatch(setDepositStepAction(DEPOSIT_STEPS.TOKEN_SELECT));
        navigate('/');
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child page-heading-center">
                    <h2>Deposit SOL</h2>
                </div>
                <br />
                <div className="content-child" id={'qrCodeContainer'}>
                    <QRCodeSVG value={walletAddress} />
                </div>
                <br />
                <div className="content-child">
                    <div id="depositWalletAddressContainer">
                        <div id={'depositWalletAddressValue'}>
                            {walletAddress}
                        </div>
                        <button 
                            class="btn btn-outline-secondary" type="button"
                            onClick={() => navigator.clipboard.writeText(walletAddress)}>
                            Copy
                        </button>
                    </div>
                </div>
                <br />
                <div className="content-child" id="depositMessage">
                    This address can only be used to receive SOL and SPL tokens on Solana.
                </div>
            </div>

            <div className="button-row">
                <button 
                    className="btn btn-primary btn-dark"
                    onClick={close}>Close</button>
            </div>
        </>
    )
}


const Deposit = () => {

    const transfer = useSelector((state) => state.transfer, shallowEqual);

    return (
        <div className="App">
            <div className="App-header">
                <Topbar />
                {
                    transfer.depositStep === DEPOSIT_STEPS.TOKEN_SELECT ?
                    <DepositTokenSelect /> :
                    <DepositAddress />
                }
            </div>
        </div>
    )

}

export default Deposit;