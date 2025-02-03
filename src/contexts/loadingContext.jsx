import {  useContext, useState } from "react";
import { createContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
  
  const [isLoading , setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{isLoading , setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = ()=>{
  return useContext(LoadingContext);
}