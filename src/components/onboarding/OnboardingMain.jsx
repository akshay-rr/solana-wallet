import { useNavigate } from "react-router-dom";


const OnboardingMain = () => {

    const navigate = useNavigate();

    return (
        <div className="App">
            <div className="App-header">
                <div id={'createWalletContainer'} className='conatiner'>
                    <button 
                        className="btn btn-primary onboarding-button"
                        onClick={() => navigate('/create-new')}>Create a new wallet</button>
                    <br />
                    <button 
                        className="btn btn-primary onboarding-button"
                        onClick={() => navigate('/import')}>I already have a wallet</button>
                </div>
            </div>
        </div>
    )
}

export default OnboardingMain;