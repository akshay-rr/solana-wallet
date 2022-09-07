import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SEND_STEPS, SOLANA_NATIVE_ACCOUNT_DETAIL } from "../../constants/Constants";
import Topbar from "../common/Topbar";
import { setSendStepAction, setSelectedTokenAction } from "../../redux/actions/TransferActions";
import { createSolTransferTransaction, validateSolAddress, getWalletAddressFromSeed, constructAssociatedTokenDetails } from "../../services/Web3Service";
import { setTransactionAction } from "../../redux/actions/TransactionActions";
import NetworkBanner from "../common/NetworkBanner";
import { loadTokenAccountMetadata } from "../../services/DataStorageService";
import { setSPLTransactionAction } from "../../redux/actions/SPLTransactionActions";


const SendTokenSelect = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const splTokenList = useSelector((state) => state.splTokenList, shallowEqual);
    const tokenMetaData = loadTokenAccountMetadata();

    const associatedTokenDetails = constructAssociatedTokenDetails(splTokenList, tokenMetaData);

    const nextStep = (tokenAddr) => {
        dispatch(setSelectedTokenAction(tokenAddr));
        dispatch(setSendStepAction(SEND_STEPS.SEND_ADDRESS));
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
                            const {mintAddress, name} = associatedTokenDetail;
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

const SendSolana = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);
    const transfer = useSelector((state) => state.transfer, shallowEqual);

    console.log(transfer);

    const isSolanaTransfer = transfer.selectedToken.mintAddress === '0';

    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState();

    const isValidAddress = validateSolAddress(toAddress);
    const isValidAmount = !isNaN(parseFloat(amount));

    const cancel = () => {
        dispatch(setSendStepAction(SEND_STEPS.TOKEN_SELECT));
        navigate('/');
    }

    const next = () => {

        if(isSolanaTransfer) {
            let txn = createSolTransferTransaction(walletAddress, toAddress, parseFloat(amount));
            let transactionDetails = {
                transactionObject: txn,
                from: walletAddress,
                to: toAddress,
                amount: parseFloat(amount)
            }
            dispatch(setTransactionAction(transactionDetails));
            navigate('/transaction');
        } else {
            dispatch(setSPLTransactionAction({
                to: toAddress,
                amount: parseFloat(amount),
                mintAddress: transfer.selectedToken.mintAddress 
            }));
            navigate('/spl-token-transaction');
        }
    }

    return (
        <>
            <div id={'content'}>
                <div className="content-child page-heading-center">
                    <h2>
                        {'Send '} 
                        {isSolanaTransfer ? 
                        'SOL' : transfer.selectedToken.symbol}
                    </h2>
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
                        onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}


const SendSPLToken = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.account, shallowEqual);
    const walletAddress = getWalletAddressFromSeed(account.selectedAccount.wallet.seed);

    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState();

    const isValidAddress = validateSolAddress(toAddress);
    const isValidAmount = !isNaN(parseFloat(amount));

    const cancel = () => {
        dispatch(setSendStepAction(SEND_STEPS.TOKEN_SELECT));
        navigate('/');
    }

    const next = () => {
        let txn = createSolTransferTransaction(walletAddress, toAddress, parseFloat(amount));
        let transactionDetails = {
            transactionObject: txn,
            from: walletAddress,
            to: toAddress,
            amount: parseFloat(amount)
        }
        dispatch(setTransactionAction(transactionDetails));
        navigate('/transaction');
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
                        onClick={next}>Next</button>
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
                <NetworkBanner />
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