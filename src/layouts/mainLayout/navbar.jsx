import {
  HomeOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  TagOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Logo from "../../components/logo";
import { Tooltip } from "antd";
import Search from "../../components/search";
import { useState } from "react";
import ChangeTheme from "../../components/changeTheme";
import { useTheme } from "../../contexts/themeContext";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ onLogoutClick }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const handleLogoutClick = () => {
    setTooltipVisible(false);
    onLogoutClick();
  };

  const tooltipChangeColor = (theme) => {
    if (theme === "dark") {
      return "rgba(0,0,0,0.9)";
    } else {
      return "rgba(224,224,224,1)";
    }
  };

  const isActive = (path) => location.pathname === path;

  // Common nav links
  const navLinks = (
    <>
      <Link
        onClick={() => setMobileMenuOpen(false)}
        to='/'
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 xl:m-6 ${
          isActive("/")
            ? "text-main-color-hover border-b-2"
            : "border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"
        } transition-all duration-300 outline-0`}
        style={{
          borderColor: isActive("/")
            ? theme === "dark"
              ? "rgb(236,236,236)"
              : "rgb(36,36,36)"
            : "",
        }}>
        <HomeOutlined className='mb-1 mr-1' /> Home
      </Link>

      <Link
        onClick={() => setMobileMenuOpen(false)}
        to='/movies'
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${
          isActive("/movies")
            ? "text-main-color-hover border-b-2"
            : "border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"
        } transition-all duration-300 outline-0`}
        style={{
          borderColor: isActive("/movies")
            ? theme === "dark"
              ? "rgb(236,236,236)"
              : "rgb(36,36,36)"
            : "",
        }}>
        <VideoCameraOutlined className='mr-1' /> Movies
      </Link>

      <Link
        onClick={() => setMobileMenuOpen(false)}
        to='/tv-shows'
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${
          isActive("/tv-shows")
            ? "text-main-color-hover border-b-2"
            : "border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"
        } transition-all duration-300 outline-0`}
        style={{
          borderColor: isActive("/tv-shows")
            ? theme === "dark"
              ? "rgb(236,236,236)"
              : "rgb(36,36,36)"
            : "",
        }}>
        <PlayCircleOutlined className='mr-1' /> Tv Shows
      </Link>

      <Link
        onClick={() => setMobileMenuOpen(false)}
        to='/new&popular'
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${
          isActive("/new&popular")
            ? "text-main-color-hover border-b-2"
            : "border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"
        } transition-all duration-300 outline-0`}
        style={{
          borderColor: isActive("/new&popular")
            ? theme === "dark"
              ? "rgb(236,236,236)"
              : "rgb(36,36,36)"
            : "",
        }}>
        <TagOutlined className='mr-1' style={{ fontSize: "20px" }} /> New &
        Popular
      </Link>
    </>
  );

  return (
    <nav
      className='flex flex-row items-center justify-between font-display 
         bg-navBack overflow-hidden 
       px-4 h-24 sm:px-6 md:px-16 lg:px-20 xl:px-24 2xl:px-32 relative'>
      {/* Logo */}
      <div className=' text-2xl sm:text-3xl lg:text-5xl flex justify-center items-center'>
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <div className='hidden xl:flex items-center justify-center text-[1rem]'>
        {navLinks}
      </div>

      {/* Search Component(visible on Desktop) */}
      <div className='hidden xl:block'>
        <Search type='movie' />
      </div>

      {/* User actions */}
      <div className=' flex items-center gap-4 sm:gap-6 xl:m-8 '>
        <Tooltip
          arrow={false}
          color={tooltipChangeColor(theme)}
          overlayInnerStyle={{
            border: `${
              theme === "dark"
                ? "1px solid rgba(224,224,224,1)"
                : "1px solid rgba(0,0,0,1)"
            }`,
            borderRadius: "10px",
          }}
          title={
            <div className='flex flex-col items-center text-center w-full px-4 py-4 bg-navBack border-1 border-gray-600 rounded-lg overflow-hidden'>
              <Link
                to={"/my-list"}
                className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <UnorderedListOutlined className='w-7 h-7 flex items-center' />{" "}
                My List
              </Link>
              <Link
                to={"/watch-later"}
                className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <ClockCircleOutlined className='w-7 h-7 flex items-center' />{" "}
                Watch Later
              </Link>
              <Link
                to={"/my-favorite"}
                className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <UnorderedListOutlined className='w-7 h-7 flex items-center ' />{" "}
                My Favorite
              </Link>

              <a
                onClick={handleLogoutClick}
                type='submit'
                className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-7 h-7 flex items-center '>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H8.25'
                  />
                </svg>
                Log out
              </a>
            </div>
          }
          placement='bottom'
          trigger='click'
          open={tooltipVisible}
          onOpenChange={(visible) => setTooltipVisible(visible)}>
          <p
            type='text'
            className='flex items-center justify-center text-main-color hover:text-main-color-hover transform active:scale-110 transition-transform duration-200 cursor-pointer '
            onClick={() => setTooltipVisible(!tooltipVisible)}>
            <UserOutlined className='text-2xl sm:text-3xl text-main-color hover:text-main-color-hover' />
          </p>
        </Tooltip>

        {/* Change theme */}
        <div className=' flex items-center justify-center mt-1'>
          <ChangeTheme />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className='xl:hidden flex items-center justify-center relative w-8 sm:w-12 h-8 sm:h-12'>
          <AnimatePresence exitBeforeEnter>
            {mobileMenuOpen ? (
              <motion.div
                key='closeIcon'
                onClick={() => setMobileMenuOpen(false)}
                className='absolute inset-0 flex items-center justify-center cursor-pointer'
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                transition={{ duration: 0.3 }}>
                <FiX className='text-2xl sm:text-3xl text-main-color hover:text-main-color-hover cursor-pointer transition-all duration-300' />
              </motion.div>
            ) : (
              <motion.div
                key='menuIcon'
                onClick={() => setMobileMenuOpen(true)}
                className='absolute inset-0 flex items-center justify-center cursor-pointer'
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                transition={{ duration: 0.3 }}>
                <FiMenu
                  className='text-2xl sm:text-3xl text-main-color hover:text-main-color-hover cursor-pointer'
                  onClick={() => setMobileMenuOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>

      
    </nav>
  );
};

export default Navbar;
