import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DEPOSIT_STEPS, SOLANA_NATIVE_ACCOUNT_DETAIL } from "../../constants/Constants";
import Topbar from "../common/Topbar";
import { setDepositStepAction, setSelectedTokenAction } from "../../redux/actions/TransferActions";
import { QRCodeSVG } from 'qrcode.react';
import { constructAssociatedTokenDetails, getWalletAddressFromSeed } from "../../services/Web3Service";
import NetworkBanner from "../common/NetworkBanner";
import { loadTokenAccountMetadata } from "../../services/DataStorageService";


const DepositTokenSelect = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);

    const solBalance = account.balance.data;

    const splTokenList = useSelector((state) => state.splTokenList, shallowEqual);
    const tokenMetaData = loadTokenAccountMetadata();

    const associatedTokenDetails = constructAssociatedTokenDetails(splTokenList, tokenMetaData);

    const nextStep = (tokenAddr) => {
        dispatch(setSelectedTokenAction(tokenAddr));
        dispatch(setDepositStepAction(DEPOSIT_STEPS.DEPOSIT_ADDRESS));
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child">
                    <div className="token-balance-card" onClick={() => nextStep(SOLANA_NATIVE_ACCOUNT_DETAIL)}>
                        <div>Solana</div>
                    </div>
                    {
                        associatedTokenDetails.map((associatedTokenDetail) => {
                            const {name} = associatedTokenDetail;
                            return (
                                <div className="token-balance-card" onClick={() => nextStep(associatedTokenDetail)}>
                                    <div>{name}</div>
                                </div>
                            )
                        })
                    }

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
    const transfer = useSelector((state) => state.transfer, shallowEqual); 

    const isSolanaTransfer = transfer.selectedToken.mintAddress === '0';

    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    const userAccount = isSolanaTransfer ? walletAddress : transfer.selectedToken.userAccount;
    
    const close = () => {
        dispatch(setDepositStepAction(DEPOSIT_STEPS.TOKEN_SELECT));
        navigate('/');
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child page-heading-center">
                    <h2>
                        {'Deposit '} 
                        {isSolanaTransfer ? 
                        'SOL' : transfer.selectedToken.symbol}
                    </h2>
                </div>
                <br />
                <div className="content-child" id={'qrCodeContainer'}>
                    <QRCodeSVG value={userAccount} />
                </div>
                <br />
                <div className="content-child">
                    <div id="depositWalletAddressContainer">
                        <div id={'depositWalletAddressValue'}>
                            {userAccount}
                        </div>
                        <button 
                            class="btn btn-outline-secondary" type="button"
                            onClick={() => navigator.clipboard.writeText(userAccount)}>
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
                <NetworkBanner />
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