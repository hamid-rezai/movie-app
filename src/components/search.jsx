import { useTheme } from "../contexts/themeContext";

const Input = () => {
  const{theme} = useTheme();
  return (
    <div className="relative" >
    <button className="absolute left-2 -translate-y-1/2 top-1/2 p-2">
    <svg
      width="17"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="search"
      className='w-5 h-5 text-main-color'
    >
      <path
        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
  <input
    className={`input rounded-full px-12 py-3 bg-search-color ${theme==='dark' ? ' border-2 focus:border-main-color-hover border-main-color placeholder-main-color' :' placeholder-main-color border-1 border-main-color focus:border-main-color-hover text-main-color'} focus:outline-none transition-all duration-300 shadow-md`}
    placeholder="Search..."
    required=""
    type="text"
  />
  <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className='w-5 h-5 text-main-color'
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
    </div>
  );
};



export default Input;
