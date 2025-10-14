import type { MouseEvent } from "react"
import "../styles/customButtons.css"

type PrimaryButtonProps = {
  buttonTitle: string
  buttonHandler: () => void
}

const PrimaryButton = ({ buttonTitle, buttonHandler }: PrimaryButtonProps) => {
  const createRippleEffect = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget
    const rippleElement = document.createElement("span")

    const rippleDiameter = Math.max(
      buttonElement.clientWidth,
      buttonElement.clientHeight
    )
    const buttonRect = buttonElement.getBoundingClientRect()

    rippleElement.style.width =
      rippleElement.style.height = `${rippleDiameter}px`
    rippleElement.style.left = `${
      event.clientX - buttonRect.left - rippleDiameter / 2
    }px`
    rippleElement.style.top = `${
      event.clientY - buttonRect.top - rippleDiameter / 2
    }px`
    rippleElement.className = "ripple"

    buttonElement.appendChild(rippleElement)

    setTimeout(() => {
      rippleElement.remove()
    }, 600)
  }

  const handlePrimaryButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    createRippleEffect(event)
    buttonHandler()
  }

  return (
    <button className="primary-button" onClick={handlePrimaryButtonClick}>
      {buttonTitle}
    </button>
  )
}

export default PrimaryButton
