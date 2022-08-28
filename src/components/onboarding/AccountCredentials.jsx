import { useState } from "react";

const AccountCredentials = ({ callback }) => {

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
            <div className="App-header">
                <div>
                    <input 
                        id={'password'} type="password"
                        className="form-control account-setup-input" placeholder="Password" 
                        aria-label="password"
                        onKeyUp={(e) => setPassword(e.currentTarget.value)}
                        required />
                    
                    <input 
                        id={'confirmPassword'} type="password" 
                        className="form-control account-setup-input" placeholder="Confirm Password" 
                        aria-label="password"
                        onKeyUp={(e) => setConfirmPassowrd(e.currentTarget.value)}
                        required />

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