import './App.css';
import Main from './components/Main';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { loadAccount, loadNetwork } from './services/DataStorageService';
import { setSelectedAccount, setSelectedNetwork } from './redux/actions/AccountActions';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateNewWallet from './components/onboarding/CreateNewWallet';
import ImportExistingWallet from './components/onboarding/ImportExistingWallet';
import OnboardingMain from './components/onboarding/OnboardingMain';
import RecentActivity from './components/RecentActivity';
import Settings from './components/Settings';
import Deposit from './components/transfer/Deposit';
import Send from './components/transfer/Send';

function App() {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account, shallowEqual);


    console.log('APP X');
    console.log(account);

    useEffect(() => {
        console.log('App Start');
        let retrievedAccount = loadAccount();
        let retrievedNetwork = loadNetwork();
        if(retrievedNetwork) {
            dispatch(setSelectedNetwork(retrievedNetwork));
        }
        if(retrievedAccount) {
            // retrievedAccount.wallet.seed = Uint8Array.of(retrievedAccount.wallet.seed.data);
            dispatch(setSelectedAccount(retrievedAccount));
        }
    }, []);

    // if (account.selectedAccount) {
    //     console.log('We are in');
    //     console.log(account.selectedAccount);
        return (
            <MemoryRouter>
                <Routes>
                    <Route path={'/'} element={
                        (account.selectedAccount) ?
                        <Main />:
                        <OnboardingMain />
                    } />
                    <Route path={'/activity'} element={<RecentActivity />} />
                    <Route path={'/settings'} element={<Settings />} />
                    <Route path={'/deposit'} element={<Deposit />} />
                    <Route path={'/send'} element={<Send />} />
                    <Route path={'/create-new'} element={<CreateNewWallet />} />
                    <Route path={'/import'} element={<ImportExistingWallet />} />
                </Routes>
            </MemoryRouter>
        )
    // }

    // return (
    //     <MemoryRouter>
    //         <Routes>
    //             <Route path={'/onboarding'} element={<OnboardingMain />} />
    //             <Route path={'/create-new'} element={<CreateNewWallet />} />
    //             <Route path={'/import'} element={<ImportExistingWallet />} />
    //         </Routes>
    //     </MemoryRouter>
    // );
}

export default App;
