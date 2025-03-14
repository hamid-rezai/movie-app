import { useEffect, useState } from "react";
import endpoints, { httpService } from "../../../core/http-service";
import Spinner from "../../../components/spinner";
import { useNavigate } from "react-router";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading , setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const key = import.meta.env.VITE_TMDB_KEY;

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

  // Fetch the trailer video for the selected movie once it's loaded
  useEffect(() => {
    if (!movie) return;
    const fetchTrailer = async () => {
      try {
        const videoResponse = await httpService.get(
          `movie/${movie.id}/videos?api_key=${key}&language=en-US`
        );
        const trailers = videoResponse.data.results.filter(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setVideo(trailers.length > 0 ? trailers[0].key : null);
      } catch (error) {
        console.error("Error fetching trailer video", error);
      }
    };
    fetchTrailer();
  }, [movie]);

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  if(loading) return 
  (
    <div className="fixed inset-0 flex items-center justify-center bg-navBack">
      <Spinner/>
    </div>
  )
  if (!movie) return null;
    
  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <>
      <div className='w-full h-[65vh] sm:h-[70vh] lg-h-[85vh] bg-gradient-to-b from-navBack z-20'>
        <div className='relative w-full h-full '>
          {/*background image*/}
          <div
            className='absolute inset-0 -z-10 object-cover bg-cover bg-center '
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
            }}></div>

            {/*content*/}
            <div className="relative w-full h-full flex flex-col justify-center px-4 sm:px-10 lg:px-16">
          <div className='mx-w-full sm:max-w-3/4 md:max-w-1/2 lg:max-w-[40%]'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-title-color'>
              {title}
            </h1>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-title-color mb-6 line-clamp-3'>{overview}</p>
            <p className='text-sm sm:text-base text-title-color font-light'>
              Release Date: {release_date}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
            <button onClick={()=>setShowVideo(true)} className=' px-6 py-2 bg-secondary text-slate-100 text-lg outline-none font-semibold rounded-lg hover:bg-secondary-hover transition duration-300'>
              Watch Now
            </button>
            <button onClick={()=>handleMovieClick()} className=' px-6 py-2 bg-primary text-slate-100 text-lg outline-none font-semibold rounded-lg hover:bg-primary-hover transition duration-300 ml-6'>
              More Info
            </button>
            </div>
          </div>
        </div>
        </div>
      </div>

{/* Modal for Trailer Video */}
{showVideo && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="relative w-[80%] h-[80%] bg-black rounded-lg">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-0 right-0 text-white text-3xl font-bold p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300"
            >
              ✖
            </button>
            {video ? (
              <iframe
                className="w-full h-full rounded-xl z-10"
                src={`https://www.youtube.com/embed/${video}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-white text-center text-lg flex items-center justify-center h-full">
                No trailer available for this movie.
              </p>
            )}

            </div>
            </div>
)}

      
    </>
  );
};

export default Hero;
