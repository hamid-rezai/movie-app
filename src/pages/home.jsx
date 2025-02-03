import endpoints from "../core/http-service";
import Hero from "../features/home/components/hero";
import MovieRow from "../features/home/components/movieRow";


const Home = () => {

  return (
    <div>
      
      <Hero/>
      <MovieRow title="Upcoming" url={endpoints.upcoming}/>
      <MovieRow title="Trending" url={endpoints.trending}/>
      <MovieRow title="Top rated" url={endpoints.topRated}/>
      <MovieRow title="Comedy" url={endpoints.comedy}/>
      <MovieRow title="Popular" url={endpoints.popular}/>
    </div>
  );
};

  

export default Home;
