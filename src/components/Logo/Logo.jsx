import logo from '../../assets/qtify-logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logoWrapper">
      <img src={logo} alt="QTify logo" className="logoImage" />
      <span className="logoText">QTify</span>
    </div>
  );
};

export default Logo;
