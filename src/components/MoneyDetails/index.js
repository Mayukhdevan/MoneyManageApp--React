import './index.css'

const MoneyDetails = props => {
  const {amount, imgData, typeText, dataTestId} = props

  return (
    <div className={`money-details-item ${imgData.altText}`}>
      <img src={imgData.imgUrl} alt={imgData.altText} />
      <div className="amount-text-container">
        <p className="type-text">Your {typeText}</p>
        <p data-testid={dataTestId} className="amount-text">
          Rs {amount}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
