import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransactionItem} = props
  const {title, amount, type, id} = transactionDetails

  const onDelete = () => deleteTransactionItem(id)

  return (
    <li className="transaction-history-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
