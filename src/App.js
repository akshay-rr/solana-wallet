import './App.css';
import Main from './components/Main';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { loadAccount, loadNetwork } from './services/DataStorageService';
import { setSelectedAccount, setSelectedNetwork } from './redux/actions/AccountActions';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateNewWallet from './components/onboarding/CreateNewWallet';
import ImportExistingWallet from './components/onboarding/ImportExistingWallet';
import OnboardingMain from './components/onboarding/OnboardingMain';
import RecentActivity from './components/RecentActivity';
import Settings from './components/Settings';
import Deposit from './components/transfer/Deposit';
import Send from './components/transfer/Send';
import Transaction from './components/Transaction';
import Login from './components/Login';
import TokenList from './components/TokenList';
import AddSPLToken from './components/AddSPLToken';
import SPLTransaction from './components/SPLTransaction';

function App() {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account, shallowEqual);

    console.log('Account');
    console.log(account);

    useEffect(() => {
        let retrievedAccount = loadAccount();
        let retrievedNetwork = loadNetwork();
        if(retrievedNetwork) {
            dispatch(setSelectedNetwork(retrievedNetwork));
        }
        if(retrievedAccount) {
            dispatch(setSelectedAccount(retrievedAccount));
        }
    }, []);

    return (
        <MemoryRouter>
            <Routes>
                <Route path={'/'} element={
                    (account.selectedAccount) ?
                    (account.selectedAccount.loggedIn) ?
                    <Main />:
                    <Login /> :
                    <OnboardingMain />
                } />
                <Route path={'/activity'} element={<RecentActivity />} />
                <Route path={'/settings'} element={<Settings />} />
                <Route path={'/deposit'} element={<Deposit />} />
                <Route path={'/send'} element={<Send />} />
                <Route path={'/create-new'} element={<CreateNewWallet />} />
                <Route path={'/import'} element={<ImportExistingWallet />} />
                <Route path={'/transaction'} element={<Transaction />} />
                <Route path={'/token-list'} element={<TokenList />} />
                <Route path={'/add-spl-token'} element={<AddSPLToken />} />
                <Route path={'/spl-token-transaction'} element={<SPLTransaction />} />
            </Routes>
        </MemoryRouter>
    )
}

export default App;
