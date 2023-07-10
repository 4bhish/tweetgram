import React, { createContext, useEffect, useState } from 'react'
import cloneDeep from 'lodash.clonedeep';

export const userDetailProvider = createContext()


export default function UserDetailContext( {children}) {
    

    const storedUserJSON = localStorage.getItem('user');
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    const currUser = cloneDeep(storedUser);
   
    
    const encodedToken = localStorage.getItem('token')

    const [allPosts,setAllPosts] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [ followedUsers,setFollowedUsers] = useState([])
    const [likedPosts,setLikedPosts] = useState([])
    const [bookmarkedPosts,setBookmarkedPosts] = useState([])

    

  return (
    <userDetailProvider.Provider value={{storedUser,allPosts,setAllPosts,encodedToken,allUsers,setAllUsers,followedUsers,setFollowedUsers,currUser,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts}}>
        {children}
    </userDetailProvider.Provider>
  )
}
