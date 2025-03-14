import { ClockCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import noImage from "../../assets/images/noImage.jpg";
import endpoints, {
  createImageUrl,
  httpService,
} from "../../core/http-service";
import { useTheme } from "../../contexts/themeContext";
import { AnimatePresence, motion } from "framer-motion";
import UseFavorites from "../../hooks/useFavorites";
import UseAddToMyList from "../../hooks/useAddToMyList";
import UseAddToWatchLater from "../../hooks/useAddToWatchLater";
import { toast } from "react-toastify";

const SearchMovieCard = ({
  poster_path,
  backdrop_path,
  title,
  vote_average,
  id,
}) => {
  const { theme } = useTheme();
  const key = import.meta.env.VITE_TMDB_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { favorites, addFavorite, removeFavorite } = UseFavorites();
  const { myListItem, addItemToList } = UseAddToMyList();
  const { watchLaterItem, addItemToWatchLater } = UseAddToWatchLater();

  const isFavorite = favorites.some((fav) => fav.id === id);

  // Fetch the full movie details when needed.
  const fetchFullMovieDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}movie/${id}?api_key=${key}&language=en-US`
      );
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching full movie details:", error);
      toast.error("Failed to fetch full movie details");
      return null;
    }
  };

  const handleFavoriteToggle = async () => {
    const movieData = await fetchFullMovieDetails();
    if (!movieData) return;
    if (isFavorite) {
      await removeFavorite(movieData);
    } else {
      await addFavorite(movieData);
    }
  };

  const handleAddToList = async () => {
    const movieData = await fetchFullMovieDetails();
    if (!movieData) return;
    await addItemToList(movieData);
    toast.success("Movie added to My List", { toastId: "addToListSuccess" });
  };

  const handleAddToWatchLater = async () => {
    const movieData = await fetchFullMovieDetails();
    if (!movieData) return;
    await addItemToWatchLater(movieData);
    toast.success("Movie added to Watch Later", {
      toastId: "addToWatchLaterSuccess",
    });
  };

  const handleMovieClick = () => {
    navigate(`/movie/${id}`);
  };

  const hasImage = backdrop_path || poster_path;
  const imageUrl =
    backdrop_path || poster_path
      ? createImageUrl(backdrop_path ?? poster_path, "w500")
      : noImage;

  return (
    <motion.div
      onClick={handleMovieClick}
      className='relative w-[250px] h-[300px] bg-movie-card rounded-lg overflow-hidden shadow-lg transition-transform duration-300 cursor-pointer mb-10 '
      whileHover={{ scale: 1.05 }}>
      <img
        src={imageUrl}
        alt={title || "No Title Available"}
        className='w-full h-[300px] object-center'
      />

      {hasImage && (
        <div className='flex flex-col items-center justify-center absolute bottom-0  w-full h-[70px] bg-navBack bg-opacity-90 opacity-90 transition duration-300'>
          <h2 className='text-lg text-center text-main-color font-semibold overflow-hidden py-1'>
            {title}
          </h2>

          <div className='flex items-center justify-between w-full px-4'>
            {/* Left icons */}
            <div className='flex space-x-4 relative items-center'>
              <FaPlus
                className='cursor-pointer text-main-color hover:text-main-color-hover hover:scale-110 transition-transform duration-300'
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipVisible(!tooltipVisible);
                }}
              />
              <AnimatePresence>
                {tooltipVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='absolute -top-[140px] -left-[-5px] w-[180px] bg-navBack border border-gray-600 rounded-lg overflow-hidden p-3 shadow-lg'
                    onClick={(e) => e.stopPropagation()}>
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToList();
                        setTooltipVisible(false);
                      }}
                      className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base mb-4'>
                      <UnorderedListOutlined className='w-7 h-7 flex items-center' />{" "}
                      Add to My List
                    </a>
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWatchLater();
                        setTooltipVisible(false);
                      }}
                      className='w-full text-main-color hover:text-main-color-hover flex items-center cursor-pointer text-base'>
                      <ClockCircleOutlined className='w-7 h-7 flex items-center' />{" "}
                      Add to Watch Later
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

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
                className=' p-2 cursor-pointer hover:scale-110 transition-all duration-300'>
                {isFavorite ? (
                  <FaHeart className=' text-2xl text-main-color text-red-600 ' />
                ) : (
                  <RiHeartLine className=' text-2xl text-main-color hover:text-main-color-hover ' />
                )}
              </motion.button>
            </div>

            {/* Vote Average */}
            <div className='flex items-center'>
              <FaStar className='text-yellow-400 text-lg mr-1' />
              <span className='text-sm text-main-color'>
                {vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      <img />
    </motion.div>
  );
};

export default SearchMovieCard;
