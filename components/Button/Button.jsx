import Style from './Button.module.css'

const Button = ({btnName, handleClick, classStyles}) => {
    return (
        <button className={Style.button + ' ' + classStyles} type="button" onClick={handleClick} name={btnName}>
            {btnName}
        </button>
    );
};

export default Button;