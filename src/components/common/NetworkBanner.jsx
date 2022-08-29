import { useSelector, shallowEqual } from "react-redux";

const NetworkBanner = () => {
    const account = useSelector((state) => state.account, shallowEqual);

    return (
        <div id="banner">
            <div className="banner-child">You are on {account.selectedNetwork.name}</div>
        </div>
    )
}

export default NetworkBanner;