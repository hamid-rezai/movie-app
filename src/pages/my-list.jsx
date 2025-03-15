import { FaList, FaStar } from "react-icons/fa";
import SplitText from "../components/split-text";
import UseAddToMyList from "../hooks/useAddToMyList";
import { useNavigate } from "react-router";
import { MdCancel } from "react-icons/md";
import BackButton from "../components/backButton";

const MyList = () => {
  const {myListItem , removeItemFromList} = UseAddToMyList();
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  }

  return (
    <div className='bg-navBack relative p-4'>
      <div className="absolute top-6 left-6 text-main-color text-2xl cursor-pointer hover:text-main-color-hover" onClick={()=>navigate(-1)}>
        <BackButton/>
      </div>
      <div className='w-full h-[300px] lg-h-[350px] bg-gradient-to-b from-navBack z-20 flex items-center justify-center gap-2'>
        <h1 className='text-5xl sm:text-7xl flex items-center justify-center font-bold text-main-color uppercase h-full'>
        <SplitText
            text='my list'
            className=' font-semibold text-center'
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing='easeOutCubic'
            threshold={0.2}
            rootMargin='-50px'
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </h1>
        <FaList className='text-main-color w-[40px] h-[40px] sm:w-[55px] sm:h-[55px]' />
      </div>
      <div className='relative min-w-screen min-h-screen bg-navBack grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 p-4 justify-items-center' >
        {
                  myListItem.length > 0 ? (
                    myListItem.map((movie)=>(
                      <div
                      onClick={()=>handleMovieClick(movie.id)}
                      key={movie.id}
                      className='relative w-[250px] h-fit bg-movie-card rounded-lg overflow-hidden shadow-lg border-2 border-navBack hover:border-main-color-hover hover:scale-110 transition-transform duration-300 cursor-pointer'>
                        <div className="absolute top-0 right-0">
                        <MdCancel onClick={(e)=>{e.stopPropagation(); removeItemFromList(movie);}} className="text-2xl text-slate-200 hover:text-white hover:scale-110 transition-all duration-200" />
                        </div>
                      {/* Movie Image */}
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className='w-full h-[300px] object-center'
                      />
                
                      {/* Movie Info */}
                      <div className='p-4 text-white flex flex-col justify-between items-center'>
                        {/* Title */}
                        <h2 className='text-lg font-semibold text-center truncate text-main-color '>
                          {movie.title || movie.name}
                        </h2>
                        
                          {/* Vote Average */}
                          <div className='flex items-center'>
                            <FaStar className='text-yellow-400 text-lg mr-1' />
                            <span className='text-sm text-main-color'>
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                        
                      </div>
                    </div>
                    ))
                  ):(
                    <h1 className='text-3xl text-main-color'>No Item in list!</h1>
                  )
                }
      </div>
    </div>
  );
};
export default MyList;