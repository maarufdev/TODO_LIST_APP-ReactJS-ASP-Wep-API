import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import LoginPage from '../pages/LoginPage';
import NotAuthorize from '../component/NotAuthorize';

const ProtectedRoute = () => {
//   const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const authData = JSON.parse(localStorage.getItem('authData'));

//   useEffect(() => {
//     if(!authData){
//         navigate("/login")
//     }
//   }, [authData])

  // show unauthorized screen if no user is found in redux store
  
  if(!authData) {    
    return <NotAuthorize />
  }

  return <Outlet />
}

export default ProtectedRoute