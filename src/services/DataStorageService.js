export const saveAccount = (account) => {
    localStorage.setItem('account', JSON.stringify(account));
};

export const loadAccount = () => {
    let accountString = localStorage.getItem('account');
    if(accountString){
        return JSON.parse(accountString);
    }
    return null;
}

export const saveNetwork = (networkObject) => {
    localStorage.setItem('network', JSON.stringify(networkObject));
}

export const loadNetwork = () => {
    return JSON.parse(localStorage.getItem('network'));
}

export const deleteAccount = () => {
    localStorage.removeItem('account');
}

export const setLoginStatus = (status) => {
    localStorage.setItem('loggedIn', status);
}

export const loadLoginStatus = () => {
    localStorage.getItem('loggedIn');
}