import { useEffect, useState } from "react";
import endpoints, { httpService } from "../core/http-service";
import { MdFiberNew } from "react-icons/md";
import NewAndPopularCard from "../features/newAndPopular/new-and-popular-card";
import UsePaginatedFetch from "../utilities/usePaginatedFetch";
import Spinner from "../components/spinner";
import Pagination from "../utilities/pagination";
import SplitText from "../components/split-text";

const NewAndPopular = () => {
  const [movieOrShow, setMovieOrShow] = useState(null);
  const [page , setPage] = useState(1);
  const [loadingMovieOrShow, movieOrShowData] = UsePaginatedFetch(`${endpoints.trending_all}` , 5);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(()=>{
    if(loadingMovieOrShow) return;
    setMovieOrShow(movieOrShowData[page-1]);
  } , [loadingMovieOrShow , page]);

  return (
    <div className='bg-navBack relative p-4'>
      <div className='w-full h-[300px] lg:h-[350px] bg-gradient-to-b from-navBack z-20 flex items-center justify-center gap-2'>
        <h1 className='text-5xl sm:text-7xl flex items-center justify-center font-bold text-main-color uppercase h-full'>
        <SplitText
            text='new & popular'
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
        <MdFiberNew className='text-main-color w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]' />
      </div>
        {loadingMovieOrShow && (
          <div className="relative w-full h-full bg-navBack flex items-center justify-center">
            <Spinner/>
          </div>
        )
        }
        {
          !loadingMovieOrShow && (
            <>
            
      <div className='relative w-full h-full bg-navBack grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 p-4 justify-items-center' >
        {movieOrShow && movieOrShow.map(({id , ...mov}) => <NewAndPopularCard key={id} movies={mov} id={id} />)}
      </div>
      <Pagination pages={movieOrShowData.length} setPage={setPage} activePage={page}/>
      </>
          )
        }
    </div>
  );
};
export default NewAndPopular;
