import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaTrello, FaSignOutAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <FaTrello className="trello-icon" />
            <span className="logo-text">Trello Clone</span>
          </Link>
        </div>

        {user && (
          <div className="navbar-right">
            <div 
              className="user-profile"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-info">
                <FaUserCircle className="user-icon" />
                <span className="user-name">{user.name}</span>
                <FaChevronDown className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <FaUserCircle className="dropdown-user-icon" />
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{user.name}</span>
                      <span className="dropdown-user-email">{user.email}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;