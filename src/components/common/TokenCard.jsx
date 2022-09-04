const TokenCard = (props) => {
    const { name, symbol, amount } = props;
    return (
        <div className="token-balance-card">
            <div>{name}</div>
            <div>
                <span className="token-amount">{amount}</span>
                <span className="token-symbol">{symbol}</span>
            </div>
        </div>
    )
}

export default TokenCard;