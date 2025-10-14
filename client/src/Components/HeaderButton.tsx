import "../styles/customButtons.css"

type HeaderButtonProps = {
  buttonTitle: string
  buttonHandler: () => void
}

const HeaderButton = ({ buttonTitle, buttonHandler }: HeaderButtonProps) => {
  return (
    <button className="header-button" onClick={buttonHandler}>
      {buttonTitle}
    </button>
  )
}

export default HeaderButton
