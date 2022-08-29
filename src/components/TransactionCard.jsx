const TransactionCard = ({ tranaction }) => {
    return (
        <div className="transaction-card">
            {tranaction.signature}
        </div>
    )
}

export default TransactionCard;