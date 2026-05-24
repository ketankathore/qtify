import styles from './Button.module.css';

const Button = ({ text = 'Give Feedback', type = 'button', onClick, className = '' }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
