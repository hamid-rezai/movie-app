import { createImageUrl } from "../../../core/http-service";
import noImage from "../../../assets/images/noImage.jpg";
import { FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Tooltip } from "antd";
import { useTheme } from "../../../contexts/themeContext";
import { ClockCircleOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";


const MovieItem = ({ movie , id}) => {
  const navigate = useNavigate();
  const { title, backdrop_path, poster_path } = movie;
  const [like, setLike] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
    const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);

  const tooltipChangeColor = (theme) => {
    if (theme === "dark") {
      return "rgba(0,0,0,0.9)";
    } else {
      return "rgba(224,224,224,1)";
    }
  };

  const handleMovieClick=()=>{
    navigate(`/movie/${id}`);
  }



  const hasImage = backdrop_path || poster_path;
  const imageUrl =
    backdrop_path || poster_path
      ? createImageUrl(backdrop_path ?? poster_path, "w500")
      : noImage;
  return (
    <div onClick={handleMovieClick} className='relative w-[160px] sm:w-[200px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-transform shadow-lg duration-300 transform hover:scale-110 group'>
      <img
        className='w-full h-40 block object-center'
        src={imageUrl}
        alt={title || "No Title Available"}
      />
      <div className={`absolute inset-0 ${theme==='dark'? 'bg-black' : 'bg-blue-200'}  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      {hasImage && (
        <>
          <p className={`absolute bottom-2 left-4  text-main-color group-hover:text-main-color-hover `}>
            {title}
          </p>

          <p className='group opacity-0 group-hover:opacity-100 group-hover:text-main-color-hover'>
            {like ? (
              <FaHeart
                size={20}
                className='absolute cursor-pointer top-2 right-2 text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
              />
            ) : (
              <FaRegHeart
                size={20}
                className='absolute cursor-pointer top-2 right-2 text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
              />
            )}
            
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
              
            </div>
          }
          placement='top'
          trigger='click'
          open={tooltipVisible}
          onOpenChange={(visible) => setTooltipVisible(visible)}>
          <FaPlus
                size={20}
                
                className='absolute top-2 right-9 cursor-pointer text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
              />
        </Tooltip>
              
              
            
          </p>
        </>
      )}
    </div>
  );
};

export default MovieItem;
