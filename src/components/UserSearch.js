import React from 'react'
import '../styles/UserSearch.css'

import { useContext } from 'react';
import { useState } from 'react';
import { userDetailProvider } from '../contexts/UserDetailContext';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function UserSearch() {
    const [userSearchInput,setUserSearchInput] = useState('')
    const {allUsers,currUser} = useContext(userDetailProvider)

    const filterByUsers = userSearchInput === '' ? '' : allUsers.filter(user => user.username.toLowerCase().includes(userSearchInput))

  return (
    <div className='user-search'>
    <input
      placeholder='Search a user'
      value={userSearchInput}
      onChange={(e) => setUserSearchInput(e.target.value)}
    />
    <div className='user-list'>
      {userSearchInput &&
        filterByUsers.map((user) => (
          <div key={user._id} onClick={() => setUserSearchInput('')}>
            <Link to={ user.username === currUser.username ? '/user'  :`/profile/${user.username}`} className='user-link'>
              <Avatar className='avatar--pfp'>{user.username[0]}</Avatar>
              <h3>@{user.username}</h3>
            </Link>
          </div>
        ))}
    </div>
  </div>
  
  )
}

export default UserSearch
