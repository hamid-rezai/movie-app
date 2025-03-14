import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./features/identity/components/login";
import AuthLayout from "./layouts/authLayout/authLayout";
import MainLayout from "./layouts/mainLayout/mainLayout";
import { AuthContextProvider } from "./contexts/authContext";
import SignUp from "./features/identity/components/signup";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/spinner";
import {  useLoading } from "./contexts/loadingContext";
import MoviePlayer from "./pages/movie-details";
import { UserAuthContext } from "./contexts/authContext";
import Movies from "./pages/movies";
import TvShows from "./pages/tv-shows";
import NewAndPopular from "./pages/new&popular";
import MyList from "./pages/my-list";
import WatchLater from "./pages/watch-later";
import MyFavorite from "./pages/my-favorite";
import TvShowDetails from "./pages/tv-shows-details";
import MySearch from "./pages/mySearch";
import { useTheme } from "./contexts/themeContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const { user, authIsReady } = UserAuthContext();
  const {theme} = useTheme();

  useEffect(() => {
    if (authIsReady) {
      if (user) {
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/");
        }
      } else {
        if (location.pathname === "/") {
          navigate("/login");
        }
      }
    }
  }, [authIsReady, user, location.pathname, navigate]);

  if (!authIsReady || isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} position='top-center' />
      <AuthContextProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />}></Route>
            <Route path='/tv-shows' element={<TvShows />}></Route>
            <Route path='/new&popular' element={<NewAndPopular />}></Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

          <Route path='/movie/:id' element={<MoviePlayer />}></Route>
          <Route path='/tv-shows/:id' element={<TvShowDetails />}></Route>
          <Route path='/my-list' element={<MyList />}></Route>
          <Route path='/watch-later' element={<WatchLater />}></Route>
          <Route path='/my-favorite' element={<MyFavorite />}></Route>
          <Route path='/search' element={<MySearch />}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
