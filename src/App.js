import './App.css';
import Main from './components/Main';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { loadAccount } from './services/DataStorageService';
import { setSelectedAccount } from './redux/actions/AccountActions';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateNewWallet from './components/onboarding/CreateNewWallet';
import ImportExistingWallet from './components/onboarding/ImportExistingWallet';
import OnboardingMain from './components/onboarding/OnboardingMain';
import RecentActivity from './components/RecentActivity';
import Settings from './components/Settings';

function App() {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account, shallowEqual);

    useEffect(() => {
        let retrievedAccount = loadAccount();
        dispatch(setSelectedAccount(retrievedAccount));
    }, []);

    if (account.selectedAccount) {
        return (
            <MemoryRouter>
                <Routes>
                    <Route path={'/'} element={<Main />} />
                    <Route path={'/activity'} element={<RecentActivity />} />
                    <Route path={'/settings'} element={<Settings />} />
                </Routes>
            </MemoryRouter>
        )
    }

    return (
        <MemoryRouter>
            <Routes>
                <Route path={'/'} element={<OnboardingMain />} />
                <Route path={'/create-new'} element={<CreateNewWallet />} />
                <Route path={'/import'} element={<ImportExistingWallet />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
