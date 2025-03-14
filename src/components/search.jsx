import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import endpoints, { httpService } from "../core/http-service";
import Spinner from "./spinner";
import { useNavigate } from "react-router";

const Search = ({ type }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const searchEndpoint =
    type === "tv" ? endpoints.search_tv : endpoints.search_movie;
  

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await httpService.get(
        `${searchEndpoint}&query=${query}`
      );
      setResults(response.data.results);
      navigate("/search" , { state:{results:response.data.results}});
    } catch (error) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative'>
      <button className='absolute left-2 -translate-y-1/2 top-1/2 p-2' onClick={handleSearch}>
        <svg
          width='17'
          height='16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-labelledby='search'
          className='w-5 h-5 text-main-color'>
          <path
            d='M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9'
            stroke='currentColor'
            strokeWidth='1.333'
            strokeLinecap='round'
            strokeLinejoin='round'></path>
        </svg>
      </button>
      <input
        className={`input w-full rounded-full px-12 py-3 bg-search-color ${
          theme === "dark"
            ? " border-2 focus:border-main-color-hover border-main-color placeholder-main-color"
            : " placeholder-main-color border-1 border-main-color focus:border-main-color-hover text-main-color"
        } focus:outline-none transition-all duration-300 shadow-md`}
        placeholder='Search...'
        value={query}
        onChange={handleInputChange}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        required=''
        type='text'
      />
      <button
        type='reset'
        className='absolute right-3 -translate-y-1/2 top-1/2 p-1'
        onClick={() => setQuery("")}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-main-color'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'></path>
        </svg>
      </button>
      
      {loading && 
      <div className="fixed inset-0 flex items-center justify-center bg-navBack">
<Spinner />
      </div>
      }
      {error && <div>{error}</div>}
    </div>
  );
};

export default Search;
