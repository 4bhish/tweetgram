import React, { useContext, useState } from 'react'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { userDetailProvider } from '../contexts/UserDetailContext';
import {  Link, Navigate } from 'react-router-dom';
import { LoginContext } from '../LoginProvider';

function LogoutBtn() {
    const {currUser} = useContext(userDetailProvider)
    const {setLoginStatus,loginStatus} = useContext(LoginContext)
    const [loading, setLoading] = useState(false);

    const handleLogOut = () => {
      setLoading(true);
      
        setTimeout(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setLoginStatus(false);
          setLoading(false);
        }, 3000); 

        
      }

  return (
    <div onClick={handleLogOut} style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
      <Link to='/' >
        <LoginOutlinedIcon  />
        <p>@{currUser.username}</p>
        
        {loading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            zIndex: 9999,
          }}
        >
          Loading...
        </div>
      )}
      {!loginStatus && <Navigate to="/"  />}
      </Link>
    </div>
  )
}

export default LogoutBtn
