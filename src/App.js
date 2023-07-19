import './App.css';
import { Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import {useContext} from 'react'
import { ToastContainer } from 'react-toastify';


import Home from './pages/Home';
import Mockman from "mockman-js";
import Bookmarks from './pages/Bookmarks';

import UserProfile from './pages/UserProfile';
import { LoginContext } from './LoginProvider'
import Explore from './pages/Explore';
import { Link, NavLink } from 'react-router-dom';

import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutBtn from './components/LogoutBtn';
import DisplayUsers from './components/DisplayUsers';
import Profile from './pages/Profile';
import UserSearch from './components/UserSearch';
import CurrentUserProfile from './pages/CurrentUserProfile';




function App() {
  const {loginStatus} = useContext(LoginContext)
  
  

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "black" : "grey"
  })

  return (
    
      
        loginStatus ? (<div className="app">
        
        <nav style={{display:"flex",justifyContent:"space-between",alignItems:'center'}} className="sticky">
          <h1><Link style={{textDecoration:'none',color:'inherit'}} to={'/'}>Tweetgram</Link></h1>
          
          <UserSearch />
        </nav>

        <div className="screen">
          <div className="left">
            
             <div className="left__top">
                <NavLink to='/' style={getActiveStyle}   className="links"><CottageOutlinedIcon />
                <p>Home</p>
                </NavLink>
                <NavLink to={'/explore'}style={getActiveStyle}   className="links"><ExploreOutlinedIcon/>
                  <p>Explore</p>
                </NavLink>
                <NavLink to='/bookmarks' style={getActiveStyle} className="links"><BookmarkBorderOutlinedIcon />
                  <p>Bookmarks</p>
                </NavLink>
                <NavLink to='/user' style={getActiveStyle} className="links"> <AccountCircleOutlinedIcon />
                <p> Profile</p>
                </NavLink>
             </div>
   
            <div className="left__bottom">
                <LogoutBtn />
            </div>
   
          </div>
   
          <div className="middle">
             <Routes>
                <Route path='/mockman' element={<Mockman />} />
                <Route path='/' element={<Home />} />
                <Route path='/explore' element={ <Explore />} />
                <Route path='bookmarks' element={  <Bookmarks /> } />
                <Route path='/user' element={<CurrentUserProfile />} />
                <Route path='/profile/:username' element={<Profile />} />
                
             </Routes>
            
          </div>
   
          <div className="right">
               <DisplayUsers />
          </div>
   
        </div>
        
      </div> )
           
      : (<Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>)

      
    
  );
}

export default App;
