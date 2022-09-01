import { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setSelectedAccount } from "../redux/actions/AccountActions";
import { saveAccount } from "../services/DataStorageService";

const Login = () => {

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    const account = useSelector((state) => state.account, shallowEqual);

    const isPasswordValid = () => {
        return password !== null && password !== undefined && password.trim().length > 0;
    }

    const confirm = () => {
        if(password === account.selectedAccount.loginCredential) {

            let newSelectedAccountState = {
                ...account.selectedAccount,
                loggedIn: true
            };
            
            saveAccount(newSelectedAccountState);
            dispatch(setSelectedAccount(newSelectedAccountState));
        } else {
            alert('Invalid Login Credential');
        }
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <div id={'topbar'} className={'row'}>
                    <div className="col-sm-12">
                        Unlock Account
                    </div>
                </div>

                <div id={'onboardingContent'}>
                    <div className="content-child">
                        <input 
                            id={'password'} type="password"
                            className="form-control account-setup-input form-input-field" placeholder="Enter Password" 
                            aria-label="password"
                            onKeyUp={(e) => setPassword(e.currentTarget.value)}
                            required />
                    </div>
                </div>

                <div className="button-row">
                    <button 
                        className="btn btn-primary onboarding-button" 
                        disabled={!isPasswordValid()}
                        onClick={confirm}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;