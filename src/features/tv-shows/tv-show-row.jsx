import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import TvShowsCard from "./tvshows-card";
import { httpService } from "../../core/http-service";

const TvShowRow = ({ title, url }) => {
  const [tvShow, setTVShow] = useState([]);
  const rowId = Math.floor(Math.random() * 1000);

  useEffect(() => {
    async function fetchTvShow() {
      const response = await httpService.get(url);
      setTVShow(response.data.results);
    }

    fetchTvShow();
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById(`slider` + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <div className='bg-navBack '>
      <h2 className='font-sans-bold text-lg sm:text-xl text-main-color capitalize p-4'>
        {title}
      </h2>

      {tvShow.length > 0 ? (
        <div className='relative flex items-center outline-none p-4'>
          {tvShow.length > 3 && (
            <MdChevronLeft
              className='bg-white rounded-full absolute left-8 opacity-80 text-gray-700 z-10 sm:block cursor-pointer'
              size={40}
              onClick={() => slide(-500)}
            />
          )}

          <div
            id={`slider` + rowId}
            className='w-full h-full scroll-smooth scrollbar-hide flex overflow-x-scroll whitespace-nowrap gap-7 px-4 py-6'>
            {tvShow.map((show) => (
              <TvShowsCard key={show.id} shows={show} id={show.id} />
            ))}
          </div>

          {tvShow.length > 3 && (
            <MdChevronRight
              className='bg-white rounded-full absolute right-8 opacity-80 text-gray-700 z-10 sm:block cursor-pointer'
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
export default TvShowRow;
