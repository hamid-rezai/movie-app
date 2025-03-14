import { useLocation, useNavigate } from "react-router";
import SearchMovieCard from "../features/search/search-movie-card";
import BackButton from "../components/backButton";
import SearchShowsCard from "../features/search/search-shows-card";

const MySearch = ()=>{
  const {state} = useLocation();
  const results = state?.results || [];
  const navigate = useNavigate();
  

  if (!Array.isArray(results) || results.length === 0) {
    return <div className="text-white">No results found</div>;
  }

  return(
<div className="relative min-w-screen min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 justify-items-center bg-navBack">
  <div className="absolute top-6 left-8 text-main-color z-10" onClick={()=>navigate(-1)}>
    <BackButton />
  </div>
{
        results.map(({id , poster_path , backdrop_path , name , title , vote_average }) => {
          
        
          if (title) {
            // If title exists, it's a movie
            return <SearchMovieCard key={id} poster_path={poster_path} backdrop_path={backdrop_path} title={title} vote_average={vote_average} id={id} />;
          } else if (name) {
            // If name exists, it's a TV show
            return <SearchShowsCard key={id} shows={{id , poster_path , backdrop_path , name , vote_average}} />;
          }
          return null; // If neither, don't render anything (or handle differently if needed)
        })
      }
</div>
  )
}
export default MySearch;