import { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import { Link, useParams } from "react-router";
import { httpService, key } from "../core/http-service";
import Spinner from "../components/spinner";
import { PlayCircleFilled } from "@ant-design/icons";
import Image from "../components/image";
import { useTheme } from "../contexts/themeContext";
import TvShowRow from "../features/tv-shows/tv-show-row";

const TvShowDetails = () => {
  const [tvShow, setTvShow] = useState();
  const [video, setVideo] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const {theme}=useTheme();
  const { id } = useParams();

  useEffect(() => {
    const fetchTvShowsDetails = async () => {
      try {
        const tvshowResponse = await httpService.get(
          `tv/${id}?api_key=${key}&language=en-US`
        );

        if(tvshowResponse.status!==200){
          throw new Error("Failed to fetch tv-show details");
        }

        setTvShow(tvshowResponse.data);

        const videoResponse = await httpService.get(
          `tv/${id}/videos?api_key=${key}&language=en-US`
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
    fetchTvShowsDetails();
  }, [id]);

  if (!tvShow) {
    return <Spinner />;
  }

  return (
    <div className='relative bg-navBack text-main-color w-screen h-screen'>
      <div
        className='relative w-full h-2/3 bg-navBack overflow-hidden flex'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${
            tvShow.backdrop_path || tvShow.poster_path || ""
          } )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <div className={`absolute inset-0 ${theme==='dark'?"bg-black": 'bg-purple-100'} opacity-80`}></div>
        <div className='w-1/3 h-full relative'>
          <Image
            backdrop_path={tvShow.backdrop_path}
            poster_path={tvShow.poster_path}
          />
        </div>
        <div className='w-2/3 h-ful relative'>
          <div className='flex z-10 p-10 text-main-color flex-col m-3'>
            <h1 className='text-5xl pt-6 font-bold'>{tvShow.name}</h1>
            <p className='text-lg pt-2'>{tvShow.air_date}</p>
            <ul className='pt-2 flex space-x-4'>
              {tvShow.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p className='pt-2'> {tvShow.runtime} minutes</p>
            <p className='pt-2'>{tvShow.vote_average.toFixed(1)}/10</p>
            <p className="pt-2">Episode Number: {tvShow.last_episode_to_air.episode_number}</p>
            <h1 className='text-xl pt-2'>Overview:</h1>
            <p>{tvShow.overview}</p>
            <p
              onClick={() => setShowVideo(!showVideo)}
              className='text-xl w-fit flex gap-2 py-5 text-main-color cursor-pointer hover:text-main-color-hover'>
              <PlayCircleFilled /> Play Trailer
            </p>
          </div>
        </div>
      </div>
      <TvShowRow
        title='Similar'
        url={`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${key}&language=en-US`}
      />

      <Link className='absolute top-5 left-5 ' to={'/'}>
        <BackButton />
      </Link>

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
              No trailer available for this Tv show.
            </p>
          )}
          <div
            className='text-white text-center text-lg relative '
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                tvShow.backdrop_path || tvShow.poster_path || ""
              })`,
            }}></div>
        </div>
        </div>
      )}
    </div>
  );
};

export default TvShowDetails;