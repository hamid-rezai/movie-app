import { useState } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Tooltip } from "antd";
import { ClockCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { createImageUrl } from "../../core/http-service";
import noImage from "../../assets/images/noImage.jpg";
import { useNavigate } from "react-router";
import { UserAuthContext } from "../../contexts/authContext";
import UseFavorites from "../../hooks/useFavorites";
import { motion } from "framer-motion";
import UseAddToMyList from "../../hooks/useAddToMyList";
import UseAddToWatchLater from "../../hooks/useAddToWatchLater";
import { toast } from "react-toastify";

const TvShowsCard = ({ shows , id}) => {
  const{backdrop_path ,poster_path, name , vote_average}=shows;
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {favorites , addFavorite , removeFavorite} = UseFavorites();
  const {user} = UserAuthContext();
  const {myListItem , addItemToList } = UseAddToMyList();
  const {watchLaterItem , addItemToWatchLater} = UseAddToWatchLater();

  const isFavorite = favorites.some((fav)=>fav.id === id);

  const handleFavoriteToggle = async ()=>{
    const showData = {id,...shows};
    if(isFavorite){
      await removeFavorite(showData);
    }else{
      await addFavorite(showData);
  }}

  const handleAddToList = async ()=>{
      const movieData = {id,...shows};
      await addItemToList(movieData);
      toast.success("Movie added to My List", {toastId:"addToListSuccess"});
    }
  
    const handleAddToWatchLater = async ()=>{
      const movieData = {id,...shows};
      await addItemToWatchLater(movieData);
      toast.success("Movie added to Watch Later" , {toastId:"addToWatchLaterSuccess"});
    }

  const tooltipChangeColor = (theme) => {
    if (theme === "dark") {
      return "rgba(0,0,0,0.9)";
    } else {
      return "rgba(224,224,224,1)";
    }
  };

  const handleTvShowClick=()=>{
    navigate(`/tv-shows/${id}`);
  }

const hasImage = backdrop_path || poster_path;
  const imageUrl =
    backdrop_path || poster_path
      ? createImageUrl(backdrop_path ?? poster_path, "w500")
      : noImage;

return (
    <div onClick={handleTvShowClick} className="w-[250px] flex-shrink-0 bg-movie-card rounded-lg overflow-hidden shadow-lg border-2 border-navBack hover:scale-110 hover:border-main-color-hover transition-all duration-300 cursor-pointer">
      {/* tv-show Image */}
      
      <img src={imageUrl} alt={name} className="w-full h-[200px] sm:h-[300px] object-center" />

      {
        hasImage && (
          <>
          
          
      {/* tv-show Info */}
      <div className="p-4 text-white">
        {/* name */}
        <h2 className="text-lg font-semibold text-center truncate text-main-color">{name}</h2>

        {/* Icons Section */}
        <div className="flex items-center justify-between mt-3">
          {/* Plus Icon */}

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
            <div onClick={(e)=>e.stopPropagation()} className='flex flex-col items-center text-center w-fit px-4 py-4 bg-navBack border-1 border-gray-600 rounded-lg overflow-hidden'>
              <a 
                onClick={(e)=>{e.stopPropagation(); handleAddToList(); setTooltipVisible(false)}} className= 'w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <UnorderedListOutlined className='w-7 h-7 flex items-center' />{" "}
               Add to My List
              </a>
              <a
              
                onClick={(e)=>{e.stopPropagation(); handleAddToWatchLater(); setTooltipVisible(false);}} className= 'w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                <ClockCircleOutlined  className='w-7 h-7 flex items-center' />{" "}
               Add to Watch Later
              </a>
              
            </div>
          }
          placement='top'
          trigger='click'
          open={tooltipVisible}
          onOpenChange={(visible) => setTooltipVisible(visible)}>
          <FaPlus
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipVisible(!tooltipVisible);
                }}
                className=' cursor-pointer text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
              />
        </Tooltip>
          
          

          {/* Heart Icon */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
            whileTap={{ scale: 0.85 }}
            animate={{
              scale: isFavorite ? [1, 1.4, 1] : 1,
              opacity: isFavorite ? [0.8, 1] : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='p-2 cursor-pointer hover:scale-110 transition-all duration-300'>
            {isFavorite ? (
              <FaHeart className=' text-2xl text-main-color text-red-600 ' />
            ) : (
              <RiHeartLine className=' text-2xl text-main-color hover:text-main-color-hover ' />
            )}
          </motion.button>

          {/* Vote Average */}
          <div className="flex items-center">
            <FaStar className="text-yellow-400 text-lg mr-1" />
            <span className="text-sm text-main-color">{vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
      </>
        )
      }
    </div>
  )
}

export default TvShowsCard;