import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./features/identity/components/login";
import AuthLayout from "./layouts/authLayout/authLayout";
import MainLayout from "./layouts/mainLayout/mainLayout";
import { AuthContextProvider } from "./contexts/authContext";
import SignUp from "./features/identity/components/signup";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./core/firebase";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "./components/spinner";
import { LoadingProvider, useLoading } from "./contexts/loadingContext";
import MoviePlayer from "./pages/movie-details";
import Movies from "./pages/movies";
import TvShows from "./pages/tv-shows";
import NewAndPopular from "./pages/new&popular";

function App() {

  const navigate = useNavigate();
  const [authStatus , setAuthStatus] = useState("loading");
  const location = useLocation();
  const {isLoading , setIsLoading} = useLoading();

  useEffect(()=>{
    
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        console.log('Logged In');
        setAuthStatus('loggedIn');
        if(location.pathname === '/login' || location.pathname === '/signup'){
          navigate('/');
        }
      }else{
        console.log('Logged Out');
        setAuthStatus('loggedOut');
        if(location.pathname ==="/"){

          navigate('/login');
        }
      }
    })

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {unsubscribe();
      clearTimeout(timer);
    }
  },[navigate , location.pathname,setIsLoading])

  if(authStatus === 'loading' || isLoading){
    return <Spinner/>
  }
  return (
    
    <>
    <ToastContainer theme="dark" position="top-center"/>
    <AuthContextProvider>
      <Routes>

        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/movies" element={<Movies/>}></Route>
        <Route path="/tv-shows" element={<TvShows/>}></Route>
        <Route path="/new&popular" element={<NewAndPopular/>}></Route>
        </Route>
        


        <Route element={<AuthLayout/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        </Route>

        <Route path="/movie/:id" element={<MoviePlayer/>}></Route>
        

      </Routes>
    </AuthContextProvider>
    </>
    
  );
}

export default App;
