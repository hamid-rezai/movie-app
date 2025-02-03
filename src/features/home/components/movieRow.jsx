import { useEffect, useState } from "react";
import { httpService } from "../../../core/http-service";
import MovieItem from "./movieItem";
import { useTheme } from "../../../contexts/themeContext";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieRow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const { theme } = useTheme();
  const rowId = Math.floor(Math.random() * 1000);

  useEffect(() => {
    async function fetchMovie() {
      const response = await httpService.get(url);
      setMovies(response.data.results);
    }

    fetchMovie();
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById(`slider` + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <div className='bg-navBack '>
      <h2 className='font-sans-bold md:text-xl text-main-color p-4 capitalize'>
        {title}
      </h2>

      {movies.length > 0 ? (
        <div className='relative flex items-center outline-none '>
          {movies.length > 3 && (
            <MdChevronLeft
              className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10  block cursor-pointer'
              size={40}
              onClick={() => slide(-500)}
            />
          )}

          <div
            id={`slider` + rowId}
            className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} id={movie.id} />
            ))}
          </div>

          {movies.length > 3 && (
            <MdChevronRight
              className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 block cursor-pointer'
              size={40}
              onClick={() => slide(500)}
            />
          )}
        </div>
      ) : (
        <p className='text-main-color p-4 text-center'>
          {" "}
          No Similar Movies Found
        </p>
      )}
    </div>
  );
};
export default MovieRow;
