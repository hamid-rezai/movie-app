import { useEffect, useState } from "react";
import endpoints, { httpService } from "../../../core/http-service";
import Spinner from "../../../components/spinner";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    async function getHeroImage() {
      setLoading(true);
      try {

        const randomPage = Math.floor(Math.random() * 500 + 1);
        const response = await httpService.get(
          `${endpoints.popular}&page=${randomPage}`
        );
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      }catch(error){
        console.error("Error fetching hero image", error); 
    }finally{
      setLoading(false);
    }
  }
    getHeroImage();
  }, []);

  if(loading) return 
  (
    <div className="w-full h-[700px] lg-h-[850px] flex items-center justify-center">
      <Spinner/>
    </div>
  )
  if (!movie) return null;
    
  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <>
      <div className='w-full h-[700px] lg-h-[850px] bg-gradient-to-b from-navBack z-20'>
        <div className='relative w-full h-full '>
          <div
            className='absolute w-full top-0 left-0 -z-10 object-cover h-[700px] lg-h-[850px] bg-cover bg-center '
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
            }}></div>
          <div className='absolute top-1/4 left-10 z-10 max-w-[40%]'>
            <h1 className='text-4xl lg:text-6xl font-bold mb-4 text-title-color'>
              {title}
            </h1>
            <p className='text-xl lg:text-xl text-title-color mb-6 line-clamp-3'>{overview}</p>
            <p className='text-sm lg:text-base text-title-color font-light'>
              Release Date: {release_date}
            </p>
            <button className='mt-6 px-6 py-2 bg-secondary text-slate-100 text-lg font-semibold rounded-lg hover:bg-secondary-hover transition duration-300'>
              Watch Now
            </button>
            <button className='mt-6 px-6 py-2 bg-primary text-slate-100 text-lg font-semibold rounded-lg hover:bg-primary-hover transition duration-300 ml-6'>
              More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
