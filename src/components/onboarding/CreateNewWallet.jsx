import { CREATE_NEW_WALLET_STEPS } from "../../constants/Constants";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { setCreateNewWalletStep, setAccountPassword } from "../../redux/actions/OnboardingActions";
import { generateNewWallet } from "../../services/Web3Service";
import { saveAccount } from "../../services/DataStorageService";
import { setSelectedAccount } from "../../redux/actions/AccountActions";
import AccountCredentials from "./AccountCredentials";
import Loading from "../common/Loading";

const SeedPhraseStep = () => {
    const dispatch = useDispatch();
    const onboarding = useSelector((state) => state.onboarding, shallowEqual);
    const [wallet, setWallet] = useState();

    let mnemonicArray;

    if(wallet) {
        mnemonicArray = wallet.seedPhrase.split(' ');
    }

    useEffect(() => {
        setWallet(generateNewWallet());
    }, []);

    const finish = () => {
        // Save account
        let account = {
            loginCredential: onboarding.password,
            wallet: wallet,
            loggedIn: true
        };

        saveAccount(account);
        dispatch(setSelectedAccount(account));
        // Set account in global state
    };

    const copyMnemonic = () => {
        navigator.clipboard.writeText(wallet.seedPhrase);
    };

    return (
        <div className="App">
            <div className="App-header">
                {
                    (wallet) ?
                    <div>
                        <table className={'new-wallet-mnemonic-table'}>
                            <tbody>
                                <tr>
                                    <td className="mnemonic-item"><div>{mnemonicArray[0]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[1]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[2]}</div></td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item"><div>{mnemonicArray[3]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[4]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[5]}</div></td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item"><div>{mnemonicArray[6]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[7]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[8]}</div></td>
                                </tr>
                                <tr>
                                    <td className="mnemonic-item"><div>{mnemonicArray[9]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[10]}</div></td>
                                    <td className="mnemonic-item"><div>{mnemonicArray[11]}</div></td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <span className="copy-to-clipboard-button" onClick={copyMnemonic}>Copy to clipboard</span>
                        <br />
                        <button 
                            className="btn btn-primary onboarding-button"
                            onClick={finish}>Finish</button>
                    </div> :
                    <Loading />
                }  
            </div>
        </div>
    )
}

const CreateNewWallet = () => {

    const dispatch = useDispatch();
    const onboarding = useSelector((state) => state.onboarding, shallowEqual);

    const nextStep = (password) => {
        dispatch(setAccountPassword(password));
        dispatch(setCreateNewWalletStep(CREATE_NEW_WALLET_STEPS.SEED_PHRASE));
    };

    switch(onboarding.createNewWalletStep) {
        case CREATE_NEW_WALLET_STEPS.ACCOUNT_CREDENTIALS:
            return <AccountCredentials callback={nextStep} />
        case CREATE_NEW_WALLET_STEPS.SEED_PHRASE:
            return <SeedPhraseStep />
        case CREATE_NEW_WALLET_STEPS.COMPLETE:
            return <div></div>
    }
}

export default CreateNewWallet;