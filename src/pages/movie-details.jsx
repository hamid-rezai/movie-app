import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import { Link, useNavigate, useParams } from "react-router";
import { httpService, key } from "../core/http-service";
import Spinner from "../components/spinner";
import { PlayCircleFilled } from "@ant-design/icons";
import Image from "../components/image";
import MovieRow from "../features/home/components/movieRow";
import { useTheme } from "../contexts/themeContext";

const MoviePlayer = () => {
  const [movie, setMovie] = useState();
  const [video, setVideo] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const {theme}=useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await httpService.get(
          `movie/${id}?api_key=${key}&language=en-US`
        );

        if(movieResponse.status!==200){
          throw new Error("Failed to fetch movie details");
        }

        setMovie(movieResponse.data);

        const videoResponse = await httpService.get(
          `movie/${id}/videos?api_key=${key}&language=en-US`
        );

        const trailers = videoResponse.data.results.filter(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setVideo(trailers.length > 0 ? trailers[0].key : null);
        console.log(video);
      } catch (error) {
        console.log("can not fetch the details of movie", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Spinner />;
  }

  return (
    <div className='relative bg-navBack text-main-color w-screen min-h-screen'>
      <div
        className='relative w-full h-[100vh] sm:h-[100vh] md:h-[60vh] lg:h-[70vh] bg-navBack overflow-hidden flex flex-col md:flex-row items-center justify-center'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${
            movie.backdrop_path || movie.poster_path || ""
          } )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <div className={`absolute inset-0 ${theme==='dark'?"bg-black": 'bg-purple-100'} opacity-80`}></div>

        {/* Movie Image */}
        <div className='w-full md:w-1/2 flex items-center justify-center relative p-4'>
          <Image
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
          />
        </div>

         {/* Movie Details */}
         <div className="relative w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 line-clamp-3">
              {movie.overview}
            </p>
            <p className="text-sm sm:text-base font-light mb-4">
              Release Date: {movie.release_date}
            </p>
            <ul className='pt-2 flex flex-wrap justify-center md:justify-start gap-2'>
              {movie.genres.map((genre) => (
                <li key={genre.id} className="bg-main-color text-navBack rounded px-2 py-1">{genre.name}</li>
              ))}
            </ul>
            <p className='pt-2'> {movie.runtime} minutes</p>
            <p className='pt-2'>{movie.vote_average.toFixed(1)}/10</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button 
                onClick={() => setShowVideo(true)}
                className="px-4 mt-4 py-2 bg-secondary text-slate-100 text-lg font-semibold rounded-lg hover:bg-secondary-hover outline-none transition duration-300"
              >
                <span className="flex items-center gap-2">
                  <PlayCircleFilled /> Watch Trailer
                </span>
              </button>
              <button
                onClick={() => setShowVideo(false)}
                className="hidden"  /* Optional: Hide this button if not needed */
              ></button>
            </div>
          </div>
        </div>
      </div>
      <MovieRow
        title='Similar'
        url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US`}
      />

      <div className='absolute top-5 left-5 ' onClick={()=>navigate(-1)}>
        <BackButton />
      </div>

      {showVideo && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg z-50 flex items-center justify-center">

        <div className='fixed inset-0 w-[80%] h-[80%] bg-black bg-opacity-50 backdrop-blur-lg z-50 top-20 left-36 rounded-lg'>
          <button
            onClick={() => setShowVideo(false)}
            className='absolute top-0 right-0 text-white text-3xl font-bold p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300'>
            ✖
          </button>
          {video ? (
            <iframe
              className='w-full h-full rounded-xl z-10'
              src={`https://www.youtube.com/embed/${video}`}
              title='trailer'
              frameBorder='0'
              allowFullScreen></iframe>
          ) : (
            <p className='text-white text-center text-lg'>
              No trailer available for this movie.
            </p>
          )}
          <div
            className='text-white text-center text-lg relative '
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path || ""
              })`,
            }}></div>
        </div>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;
