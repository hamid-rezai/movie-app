import _ from "lodash";
import {motion} from 'framer-motion';
import { useEffect, useRef } from "react";

const Pagination = ({ pages, setPage, activePage }) => {
  const pageRefs = useRef([]);

useEffect(()=>{
  if(pageRefs.current[activePage-1]){
    pageRefs.current[activePage-1].focus();
  }
} , [activePage]);

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 1) {
        prevPage = pages;
      }
      return prevPage;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > pages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };

  return (
    <nav className='flex justify-center mt-5'>
      <ul className='flex items-center space-x-2 list-none'>
        {/* Previous Button */}
        <li onClick={prevPage} className='cursor-pointer'>
        <motion.button
            
            disabled={activePage === 1}
            className={`p-4 text-main-color border-b-2 border-transparent
                        ${activePage === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-main-color-hover  focus:text-main-color-hover  transition-all duration-300 "}`}
            whileTap={{ scale: 0.95}}
          >
            Previous
          </motion.button>
        </li>

        {/* Page Numbers (Example: 1, 2, 3) */}
        {_.times(pages, (index) => {
          const pageNum = index+1;
          const isActive = pageNum === activePage;

          return(
          <li
            key={`pagination-` + index}
            className={` ${pageNum === activePage ? "border-b-2 border-b-main-color-hover" : ""}`}
            onClick={() => setPage(pageNum)}>

            <motion.button ref={(el)=>(pageRefs.current[index] = el)}
            whileTap={{scale:0.95}}
              href='#'
              className={`p-2 text-main-color outline-none bg-transparent border-b-2 border-transparent transition-all duration-200 hover:border-main-color-hover hover:text-main-color-hover ${isActive && 'border-main-color-hover text-main-color-hover'} `}>
              {pageNum}
            </motion.button>
          </li>
          )
        })}

        {/* Next Button */}
        <li onClick={nextPage}>
        <motion.button
            
            disabled={activePage === pages}
            className={`p-4 text-main-color border-b-2 border-transparent
                        ${activePage === pages ? "opacity-50 cursor-not-allowed" : "hover:text-main-color-hover focus:text-main-color-hover transition-all duration-300"}`}
            whileTap={{ scale: 0.95}}
          >
            Next
          </motion.button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
