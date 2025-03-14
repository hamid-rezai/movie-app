import { useEffect, useState } from "react";
import endpoints from "../core/http-service";
import MovieCard from "../features/movies/movie-card";
import { GiFilmProjector } from "react-icons/gi";
import UsePaginatedFetch from "../utilities/usePaginatedFetch";
import Spinner from "../components/spinner";
import Pagination from "../utilities/pagination";
import SplitText from "../components/split-text";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMovies, MovieData] = UsePaginatedFetch(
    `${endpoints.all_movies}`,
    5
  );

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    if (loadingMovies) return;
    setMovies(MovieData[page - 1]);
  }, [loadingMovies, page]);

  return (
    <div className='bg-navBack relative p-4'>
      <div className='w-full h-[300px] lg:h-[350px] bg-gradient-to-b from-navBack z-20 flex items-center justify-center gap-2'>
        <h1 className='text-5xl sm:text-7xl flex items-center justify-center font-bold text-main-color uppercase h-full'>
        <SplitText
            text='movies'
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
        <GiFilmProjector className='text-main-color w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]' />
      </div>
      {loadingMovies && (
        <div className='relative w-full h-full bg-navBack flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      {!loadingMovies && (
        <>
          <div className='relative w-full h-full bg-navBack grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 p-4 justify-items-center'>
            {movies &&
              movies.map(({ id, ...mov }) => (
                <MovieCard key={id} movies={mov} id={id} />
              ))}
          </div>
          <Pagination
            pages={MovieData.length}
            setPage={setPage}
            activePage={page}
          />
        </>
      )}
    </div>
  );
};
export default Movies;
