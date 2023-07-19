import '../styles/DisplayUsers.css'
import React, { useContext, useState } from 'react'

import { userDetailProvider } from '../contexts/UserDetailContext'
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

function DisplayUsers() {
    const {allUsers,encodedToken,setFollowedUsers,followedUsers,currUser,setAllUsers} = useContext(userDetailProvider)

    


    // const handleFollow = async (id) => {
    //     try {
    //       const response = await fetch(`/api/users/follow/${id}`, {
    //         method: "POST", // or 'PUT'
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: encodedToken,
    //         },
    //       });
    
    //       const result = await response.json();
    //       setFollowedUsers([...followedUsers, result]);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    
    const handleFollow = async (id) => {
      try {
        const response = await fetch(`/api/users/follow/${id}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            authorization: encodedToken,
          },
        });
  
        const result = await response.json();
        setFollowedUsers([...followedUsers, result]);
  
        const updatedAllUsers = allUsers.map((e)=>
        e.username === result.followUser.username ?  result.followUser : e.username === result.user.username ?result.user : e
        )
        
        setAllUsers(updatedAllUsers)
      } catch (err) {
        console.error(err);
      }
    }
      
      

      
      
  return (
     <div style={{padding:"10px"}} className="home__users">
        <h2 className="users__list">suggested users</h2>
           
          {allUsers
            .filter((e) => e.username !== currUser.username)
            .map((user) => {
              const id= user._id

              return (
                <div>
          {followedUsers.map((e) => e.followUser.username).includes(user.username) ? (
            ""
          ) : (
            <div className="user">
              <Link to={`/profile/${user.username}`}>
                <Avatar className="avatar" src={user.imgSrc}/>
              </Link>
              <Link to={`/profile/${user.username}`}>
                <div className="user-details">
                  <div className="name">
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                  </div>
                  <p className="username">@{user.username}</p>
                </div>
              </Link>
              <button onClick={() => handleFollow(id)} className="btn">
                Follow
              </button>
            </div>
          )}
        </div>
      );
    })}
</div>
  )
}

export default DisplayUsers
