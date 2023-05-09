import "./button.style.css";

const Button = ({onButtonClick, buttonName, buttonClass=""}) => {
  return (
    <button
      className={`btn ${buttonClass}`}
      onClick={onButtonClick}
    >{buttonName}</button>
  )
}

export default Button;
