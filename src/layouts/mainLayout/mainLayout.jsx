import React from "react";
import AppFooter from "./appFooter";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./navbar";
import Logout from "../../features/identity/components/logout";
import { UserAuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router";


const MainLayout = () => {

  const [isLogoutVisible , setLogoutVisible] = useState(false);

  const {user , logOut} = UserAuthContext();

  const navigate = useNavigate();

  const handleLogout = async() =>{
    try{
      await logOut()
      navigate('/login')
    }catch(error){
      console.log(error);
    }
  }

  const handleLogoutClick = () =>{
    setLogoutVisible(true);
  }
  const handleCloseLogout = () =>{
    setLogoutVisible(false);
  }

  return (
   <>
   <Navbar onLogoutClick={handleLogoutClick}/>
   <Outlet/>
   {
    isLogoutVisible && (
      <div className='fixed inset-0 flex items-center justify-center bg-navBack bg-opacity-50 z-50 '>
        <Logout onCloseLogout={handleCloseLogout} onConfirmLogout={handleLogout}/>
        
      </div>
    )
   }
   <AppFooter />
   </>
    
  );
};

export default MainLayout;
