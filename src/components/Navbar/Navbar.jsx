import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbarInner">
        <Logo />
        <SearchBar />
        <Button text="Give Feedback" />
      </div>
    </header>
  );
};

export default Navbar;
