import { useState } from "react";

const AccountCredentials = ({ callback, mode }) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');

    const confirm = () => {
        callback(password);
    }

    const isPasswordValid = () => {
        return password && confirmPassword && password === confirmPassword;
    }

    return (
        <div className="App">
            <div className="App-header-main">
                <div id={'topbar'} className={'row'}>
                    <div className="col-sm-12">
                        {mode}
                    </div>
                </div>

                <div id={'onboardingContent'}>
                    <div className="content-child">
                        <input 
                            id={'password'} type="password"
                            className="form-control account-setup-input form-input-field" placeholder="Password" 
                            aria-label="password"
                            onKeyUp={(e) => setPassword(e.currentTarget.value)}
                            required />
                        
                        <input 
                            id={'confirmPassword'} type="password" 
                            className="form-control account-setup-input  form-input-field" placeholder="Confirm Password" 
                            aria-label="password"
                            onKeyUp={(e) => setConfirmPassowrd(e.currentTarget.value)}
                            required />
                    </div>
                </div>

                <div className="button-row">
                    <button 
                        className="btn btn-primary onboarding-button" 
                        disabled={!isPasswordValid()}
                        onClick={confirm}>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default AccountCredentials;