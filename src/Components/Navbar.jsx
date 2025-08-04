import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import reactLogo from './image/logoChitra.png';
import clsx from 'clsx';
import '../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle scroll shadow + close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      if (scrollY > 10) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // JWT decode user
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || 'User');
        setIsAdmin(decoded.is_admin || decoded.is_staff || decoded.role === 'admin');
      } catch (err) {
        console.error('Token decode error', err);
      }
    }
  }, [location]);

  // Dark mode toggle and storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-black', 'text-white');
      document.body.classList.remove('bg-gray-100', 'text-black');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black', 'text-white');
      document.body.classList.add('bg-gray-100', 'text-black');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUsername('');
    setIsAdmin(false);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const navLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={clsx(
          'relative px-2 py-1 transition-all hover:text-blue-300',
          darkMode ? 'text-white' : 'text-white',
          'no-underline'
        )}
        onClick={() => setMenuOpen(false)}
      >
        <span className={clsx(isActive && 'font-semibold text-blue-300')}>
          {label}
        </span>
        {isActive && (
          <span
            className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-300 animate-[slideIn_0.4s_ease-in-out]"
            style={{ borderRadius: 9999 }}
          />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300 px-6',
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-400 text-gray-700',
        scrolled && 'shadow-md backdrop-blur-sm bg-opacity-90'
      )}
    >
      <div className="flex justify-between items-center py-3">
        <Link to="/" className="text-2xl font-bold no-underline">
          <img src={reactLogo} className="logo h-10" alt="logo" />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          {navLink('/', 'Home')}
          {navLink('/gallery', 'Gallery')}
          {navLink('/order', 'Order')}
          {navLink('/about', 'About Artist')}
          {navLink('/contact', 'Contact')}
          {isAdmin && navLink('/admin', 'Admin Panel')}

          {!isAuthenticated ? (
            <>
              {navLink('/login', 'Login')}
              {navLink('/register', 'Register')}
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="font-medium text-sm hover:text-blue-300"
              >
                👤 {username} ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow p-2 z-10 text-black dark:text-white min-w-[120px]">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className="block w-full text-left px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-2 pb-4 md:hidden text-sm">
          {navLink('/', 'Home')}
          {navLink('/gallery', 'Gallery')}
          {navLink('/order', 'Order')}
          {navLink('/about', 'About Artist')}
          {navLink('/contact', 'Contact')}
          {isAdmin && navLink('/admin', 'Admin Panel')}

          {!isAuthenticated ? (
            <>
              {navLink('/login', 'Login')}
              {navLink('/register', 'Register')}
            </>
          ) : (
            <>
              <span className="font-medium text-sm">👤 {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={toggleDarkMode}
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
