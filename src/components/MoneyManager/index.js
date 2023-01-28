import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

const balanceObj = {
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  altText: 'balance',
}
const incomeObj = {
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  altText: 'income',
}
const expensesObj = {
  imgUrl:
    'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  altText: 'expenses',
}

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  updateTitle = e => this.setState({titleInput: e.target.value})

  updateAmount = e => this.setState({amountInput: e.target.value})

  updateType = e => this.setState({optionId: e.target.value})

  getTotalAmount = (transactionsList, amountType) => {
    const amountList = transactionsList
      .filter(eachAmount => eachAmount.type === amountType)
      .map(eachItem => parseInt(eachItem.amount))

    return amountList.reduce((acc, curr) => acc + curr, 0)
  }

  addTransaction = e => {
    e.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const selectedType = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )
    if (titleInput !== '' && amountInput !== '') {
      this.setState(prevState => ({
        transactionList: [
          ...prevState.transactionList,
          {
            id: uuidv4(),
            title: prevState.titleInput,
            amount: prevState.amountInput,
            type: selectedType.displayText,
          },
        ],
        titleInput: '',
        amountInput: '',
        optionId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  deleteTransactionItem = id =>
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state

    const getTotalIncome = this.getTotalAmount(transactionList, 'Income')

    const getTotalExpenses = this.getTotalAmount(transactionList, 'Expenses')

    return (
      <div className="bg-container">
        <div className="main-wrapper">
          <div className="header">
            <h1 className="user-heading">Hi, Richard</h1>
            <p className="user-para">
              Welcome back to your
              <span className="blue-text">Money manager</span>
            </p>
          </div>

          <ul className="money-details-container">
            {[
              <MoneyDetails
                amount={getTotalIncome - getTotalExpenses}
                imgData={balanceObj}
                typeText="Balance"
                key="1"
                dataTestId="balanceAmount"
              />,
              <MoneyDetails
                amount={getTotalIncome}
                imgData={incomeObj}
                typeText="Income"
                key="2"
                dataTestId="incomeAmount"
              />,
              <MoneyDetails
                amount={getTotalExpenses}
                imgData={expensesObj}
                typeText="Expenses"
                key="3"
                dataTestId="expensesAmount"
              />,
            ]}
          </ul>

          <div className="bottom-section-wrapper">
            <form onSubmit={this.addTransaction}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                placeholder="TITLE"
                type="text"
                id="title"
                value={titleInput}
                onChange={this.updateTitle}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                placeholder="AMOUNT"
                type="text"
                id="amount"
                value={amountInput}
                onChange={this.updateAmount}
              />
              <label htmlFor="type">TYPE</label>
              <select
                name="typeSelect"
                id="type"
                className="types-select"
                value={optionId}
                onChange={this.updateType}
              >
                <option value={transactionTypeOptions[0].optionId}>
                  {transactionTypeOptions[0].displayText}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <div className="transactions-container">
              <h1 className="history-text">History</h1>
              <div className="transactions">
                <div className="transaction-headers">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </div>
                <ul className="transaction-items-container">
                  {transactionList.map(eachItem => (
                    <TransactionItem
                      key={eachItem.id}
                      transactionDetails={eachItem}
                      deleteTransactionItem={this.deleteTransactionItem}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
