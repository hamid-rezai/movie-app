const Image = ({backdrop_path , poster_path})=>{
  return(
    /* From Uiverse.io by fthisilak */ 
<div className="group relative h-[500px] w-[300px] [perspective:1000px]">
  <div
    className="absolute duration-1000 w-full h-full top-6 left-10 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]"
  >
    <div
      className="absolute w-full h-full rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 p-6 text-white [backface-visibility:hidden]" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${
              backdrop_path
            })` ,backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",}}
    >


      
    </div>

    <div
      className="absolute w-full h-full rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 p-6 text-white [transform:rotateX(180deg)] [backface-visibility:hidden]" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${
        poster_path
      })` ,backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",}}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Image;