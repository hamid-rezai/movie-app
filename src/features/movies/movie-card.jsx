import { useState } from "react";
import { FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { useTheme } from "../../contexts/themeContext";
import { ClockCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { RiHeartLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import noImage from "../../assets/images/noImage.jpg";
import { createImageUrl } from "../../core/http-service";
import { AnimatePresence, motion } from "framer-motion";
import { UserAuthContext } from "../../contexts/authContext";
import UseFavorites from "../../hooks/useFavorites";
import UseAddToMyList from "../../hooks/useAddToMyList";
import UseAddToWatchLater from "../../hooks/useAddToWatchLater";
import { toast } from "react-toastify";

const MovieCard = ({ movies, id }) => {
  const { backdrop_path, poster_path, title, vote_average } = movies;
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const {favorites , addFavorite , removeFavorite} = UseFavorites();
  const { user } = UserAuthContext();
  const {myListItem , addItemToList } = UseAddToMyList();
  const {watchLaterItem , addItemToWatchLater} = UseAddToWatchLater();

  const isFavorite = favorites.some((fav)=>fav.id === id);

  const handleFavoriteToggle = async ()=>{
    
    const movieData = {id,...movies};
    if(isFavorite){
      await removeFavorite(movieData);
    }else{
      await addFavorite(movieData);
    }
  }

  const handleAddToList = async ()=>{
    const movieData = {id,...movies};
    await addItemToList(movieData);
    toast.success("Movie added to My List", {toastId:"addToListSuccess"});
  }

  const handleAddToWatchLater = async ()=>{
    const movieData = {id,...movies};
    await addItemToWatchLater(movieData);
    toast.success("Movie added to Watch Later" , {toastId:"addToWatchLaterSuccess"});
  }
    
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${id}`);
  };


  const hasImage = backdrop_path || poster_path;
  const imageUrl =
    backdrop_path || poster_path
      ? createImageUrl(backdrop_path ?? poster_path, "w500")
      : noImage;

  return (
    <div
      onClick={handleMovieClick}
      className='w-[250px] flex-shrink-0 bg-movie-card rounded-lg overflow-hidden shadow-lg border-2 border-navBack hover:border-main-color-hover hover:scale-110 transition-transform duration-300 cursor-pointer'>
      {/* Movie Image */}

      
      <img
        src={imageUrl}
        alt={title || "No Title Available"} 
        className='w-full h-[200px] sm:h-[300px] object-center'
      />

{ hasImage && ( 
        <>

      {/* Movie Info */}
      <div className='p-4 text-white'>
        {/* Title */}
        <h2 className='text-lg font-semibold text-center truncate text-main-color'>
          {title}
        </h2>

        {/* Icons Section */}
        <div className='flex items-center justify-between mt-3'>
          {/* Plus Icon */}
          <div className='relative '>
            <FaPlus
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                setTooltipVisible(!tooltipVisible);
              }}
              className='cursor-pointer text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
            />

            {/* Smooth Tooltip Animation */}
            <AnimatePresence>
              {tooltipVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className='absolute -top-24 -left-[-20px] w-fit bg-navBack border border-gray-600 rounded-lg overflow-hidden p-3 shadow-lg'
                  onClick={(e) => e.stopPropagation()}>
                  <a onClick={(e)=> {e.stopPropagation(); handleAddToList(); setTooltipVisible(false);}} className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                    <UnorderedListOutlined className='w-7 h-7 flex items-center' />{" "}
                    Add to My List
                  </a>
                  <a onClick={(e)=> {e.stopPropagation(); handleAddToWatchLater(); setTooltipVisible(false)}} className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base'>
                    <ClockCircleOutlined className='w-7 h-7 flex items-center mr-2' />{" "}
                    Add to Watch Later
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
          <div className='flex items-center'>
            <FaStar className='text-yellow-400 text-lg mr-1' />
            <span className='text-sm text-main-color'>
              {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default MovieCard;
