import { useEffect, useState } from "react";
import { IMPORT_WALLET_STEPS } from "../../constants/Constants";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getWalletAddressFromSeed, getWalletBalance, loadWalletFromMnemonic } from "../../services/Web3Service";
import { setImportWalletStep, setWallet } from "../../redux/actions/OnboardingActions";
import { saveAccount } from "../../services/DataStorageService";
import { setSelectedAccount } from "../../redux/actions/AccountActions";
import Loading from "../common/Loading";
import AccountCredentials from "./AccountCredentials";
import { useNavigate } from "react-router-dom";


const SeedPhraseEntry = () => {

    const dispatch = useDispatch();
    const [mnemonicArray, setMnemonicArray] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);

    const setMnemonic = (index, value) => {
        let newMnemonic = [...mnemonicArray];
        newMnemonic[index] = value;
        setMnemonicArray(newMnemonic);
    }

    const importWallet = () => {
        let mnemonicString = mnemonicArray.join(' ');
        let loadedWallet = loadWalletFromMnemonic(mnemonicString);
        dispatch(setWallet(loadedWallet));
        dispatch(setImportWalletStep(IMPORT_WALLET_STEPS.ACCOUNT_SELECT));
    }

    const isMnemonicValid = () => {
        let valid = true;
        mnemonicArray.forEach((item) => {
            if (item.trim().length === 0) {
                valid = false;
            }
        })
        return valid;
    }

    return (
        <div className="App">
            <div className="App-header">
                <div id={'topbar'} className={'row'}>
                    <div className="col-sm-12">
                        Import Wallet
                    </div>
                </div>
                <div id={'onboardingContent'}>
                    <div className="content-child">
                        <table className={'new-wallet-mnemonic-table'}>
                            <tbody>
                                <tr>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            1.
                                            <input type="text" class="form-control"  value={mnemonicArray[0]}
                                            onChange={(e) => setMnemonic(0, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            2.
                                            <input type="text" class="form-control" value={mnemonicArray[1]}
                                            onChange={(e) => setMnemonic(1, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            3.
                                            <input type="text" class="form-control" value={mnemonicArray[2]}
                                            onChange={(e) => setMnemonic(2, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            4.
                                            <input type="text" class="form-control" value={mnemonicArray[3]}
                                            onChange={(e) => setMnemonic(3, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            5.
                                            <input type="text" class="form-control" value={mnemonicArray[4]}
                                            onChange={(e) => setMnemonic(4, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            6.
                                            <input type="text" class="form-control" value={mnemonicArray[5]}
                                            onChange={(e) => setMnemonic(5, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            7.
                                            <input type="text" class="form-control" value={mnemonicArray[6]}
                                            onChange={(e) => setMnemonic(6, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            8.
                                            <input type="text" class="form-control" value={mnemonicArray[7]}
                                            onChange={(e) => setMnemonic(7, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            9.
                                            <input type="text" class="form-control" value={mnemonicArray[8]}
                                            onChange={(e) => setMnemonic(8, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            10.
                                            <input type="text" class="form-control" value={mnemonicArray[9]}
                                            onChange={(e) => setMnemonic(9, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            11.
                                            <input type="text" class="form-control" value={mnemonicArray[10]}
                                            onChange={(e) => setMnemonic(10, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                    <td className="mnemonic-item">
                                        <div className="mnemonic-item-input-container">
                                            12.
                                            <input type="text" class="form-control" value={mnemonicArray[11]}
                                            onChange={(e) => setMnemonic(11, e.currentTarget.value)} required/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
                <div className="button-row">
                    <button 
                        className="btn btn-primary onboarding-button"
                        onClick={importWallet} disabled={!isMnemonicValid()}>Import</button>
                </div>
            </div>
        </div>
    )
}

const AccountSelect = () => {

    const dispatch = useDispatch();
    const { wallet } = useSelector((state) => state.onboarding, shallowEqual);

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const walletAddress = getWalletAddressFromSeed(wallet.seed);

    useEffect(() => {
        // if(wallet) {
        setLoading(true);
        getWalletBalance(walletAddress).then((balance) => {
            setBalance(balance);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            setLoading(false);
        })
        // }
    }, []);

    const continueSetup = () => {
        dispatch(setImportWalletStep(IMPORT_WALLET_STEPS.ACCOUNT_CREDENTIALS));
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <div id={'topbar'} className={'row'}>
                    <div className="col-sm-12">
                        Import Wallet
                    </div>
                </div>
                <div id={'onboardingContent'}>
                    <div className="content-child">
                        <div className="account-select-container">
                            <div>{walletAddress}</div>
                            {
                                loading ?
                                <Loading /> :
                                <div>{balance}</div>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="button-row">
                    <button className="btn btn-primary onboarding-button" onClick={continueSetup}>Continue</button>
                </div>
            </div>
        </div>   
    )
}

const ImportExistingWallet = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const onboarding = useSelector((state) => state.onboarding, shallowEqual);

    const finish = (credential) => {
        // Save account
        let account = {
            loginCredential: credential,
            wallet: onboarding.wallet,
            loggedIn: true
        };

        saveAccount(account);
        dispatch(setSelectedAccount(account));
        navigate('/');
        // Set account in global state
    };


    switch(onboarding.importWalletStep) {
        case IMPORT_WALLET_STEPS.SEED_PHRASE:
            return <SeedPhraseEntry />
        case IMPORT_WALLET_STEPS.ACCOUNT_SELECT:
            return <AccountSelect />
        case IMPORT_WALLET_STEPS.ACCOUNT_CREDENTIALS:
            return <AccountCredentials callback={finish} mode={'Import Wallet'} />
    }
}

export default ImportExistingWallet;