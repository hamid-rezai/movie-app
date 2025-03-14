import Logo from "../../components/logo";
import backgroundImage from "../../assets/images/movie.jpg";
import { Outlet } from "react-router-dom";
import ChangeTheme from "../../components/changeTheme";
import { useTheme } from "../../contexts/themeContext";

const AuthLayout = ()=> {
  const {theme} = useTheme();
    return (
      <>
      <div
      className=' min-h-screen bg-cover bg-center relative '
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='absolute inset-0 bg-navBack/80  w-100 h-100 flex flex-col items-center justify-center '>
      <div className={`absolute top-10 right-10 h-12 w-12 rounded-[50%] ${theme==='dark' ? 'bg-slate-700': 'bg-gray-100'}  flex items-center justify-center`}>
        <ChangeTheme/>
      </div>
        <div className='flex flex-col items-center justify-center '>
            <Outlet/>
          </div>
          </div>
          </div>

      </>
    )
}
export default AuthLayout;