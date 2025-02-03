import {
  HomeOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  TagOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import Logo from "../../components/logo";
import { Tooltip } from "antd";
import Search from "../../components/search";
import { useState } from "react";
import ChangeTheme from "../../components/changeTheme";
import { useTheme } from "../../contexts/themeContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const Navbar = ({ onLogoutClick }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
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

  return (
    <nav
      className='flex flex-row items-center justify-between font-display 
         bg-navBack 
       px-11 h-24'>
      <div className=' text-5xl h-100 flex justify-center items-center'>
        <Logo />
      </div>

      <div className=' flex items-center justify-center font-display text-[1.1rem] '>

        <button
        onClick={()=>navigate("/")}
          className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${isActive("/") ? " text-main-color-hover border-main-color-hover": " border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"}transition-all duration-300 outline-0`}>
          <HomeOutlined className='mb-1 mr-1' /> Home
        </button>

        <button
        onClick={()=>navigate('/movies')}
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${isActive("/movies") ? "text-main-color-hover border-main-color-hover": " border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"}transition-all duration-300 outline-0`}>
          <VideoCameraOutlined className='mr-1' /> Movies
        </button>

        <button
        onClick={()=>navigate('/tv-shows')}
        className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${isActive("/tv-shows") ? "text-main-color-hover border-main-color-hover": " border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"}transition-all duration-300 outline-0`}>
          <PlayCircleOutlined className='mr-1' /> Tv Shows
        </button>

        <button
        onClick={()=>navigate('/new&popular')}
          className={`font-display bg-transparent border-b-2 flex items-center ml-1 mr-6 ${isActive("/new&popular") ? "text-main-color-hover border-main-color-hover": " border-transparent text-main-color hover:text-main-color-hover hover:border-main-color-hover hover:border-b-2"}transition-all duration-300 outline-0`}>
          <TagOutlined className='mr-1' style={{ fontSize: "20px " }} /> New &
          Popular
        </button>
      </div>

      <Search />

      <div className='relative'>
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
              <a
                className= 'w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <UnorderedListOutlined className='w-7 h-7 flex items-center' />{" "}
                My List
              </a>
              <a
                className= 'w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <ClockCircleOutlined  className='w-7 h-7 flex items-center' />{" "}
                Watch Later
              </a>
              <a
                className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <UnorderedListOutlined className='w-7 h-7 flex items-center ' />{" "}
                My Favorite
              </a>

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
            <UserOutlined
              className='text-3xl text-main-color hover:text-main-color-hover'
            />
          </p>
        </Tooltip>
      </div>

      <div className=' flex items-center justify-center mt-1'>
        <ChangeTheme />
      </div>
    </nav>
  );
};

export default Navbar;
