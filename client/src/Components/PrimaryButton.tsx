import "../styles/customButtons.css"

type PrimaryButtonProps = {
  buttonTitle: string
  buttonHandler: () => void
}

const PrimaryButton = ({ buttonTitle, buttonHandler }: PrimaryButtonProps) => {
  return (
    <button className="primary-button" onClick={buttonHandler}>
      {buttonTitle}
    </button>
  )
}

export default PrimaryButton
