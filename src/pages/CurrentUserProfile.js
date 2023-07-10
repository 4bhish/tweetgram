import '../styles/Profile.css'

import React, { useRef } from 'react';
import { useContext } from 'react'

import { userDetailProvider } from '../contexts/UserDetailContext'
import PostCard from '../components/PostCard'

import { useState } from 'react'


function CurrentUserProfile() {

    const {allPosts,setAllPosts,encodedToken,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts,currUser,allUsers} = useContext(userDetailProvider)

    const [editedPostID, setEditedPostID] = useState("");
    const [editedPost, setEditedPost] = useState("");

  

  function handleEditIcon (id){
    const post = allPosts.find(post => post._id === id) 
    setEditedPost(post.content)
    setEditedPostID(post._id)
  }




  const handleUpdate = async(id) => {
    try{
      const res = await fetch(`api/posts/edit/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
        body: JSON.stringify({
          postData: {
            content: editedPost,
          },
        }),
      })

      const data = await res.json()

      setAllPosts(data.posts)
      setEditedPostID('')
    }
    catch(e)
    {
      console.error(e)
    }
  }



  const handleRemoveLike = async(id) => {
    try{
      const res = await fetch(`/api/posts/dislike/${id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      })
      const data = await res.json()

      setAllPosts(data.posts)
      setLikedPosts(likedPosts.filter((e) => e._id !== id))
    }
    catch(e)
    {
      console.error(e)
    }
  }


  const handleLikePost = async (id) => {
    try{
      const res = await fetch(`/api/posts/like/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      })
  
      const data = await res.json()
      setAllPosts(data.posts)
      setLikedPosts([...likedPosts, allPosts.find(post => post._id === id)])
    }
    catch(e)
    {
      console.error(e)
    }
   }

   const handleAddBookMark = async(id) => {
    try{
      const res = await fetch(`/api/users/bookmark/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      })
  
      const data = await res.json()
      setBookmarkedPosts(data.bookmarks)
      
      
      
    }
    catch(e)
    {
      console.error(e)
    }
  
   }

   const handleRemoveBookMark = async (id) => {
    try{
      const res = await fetch(`/api/users/remove-bookmark/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      })
  
      const data = await res.json()
      setBookmarkedPosts(data.bookmarks)
    }
    catch(e){
      console.error(e)
    }
   }

   const handleDeletePost = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      });

      const data = await res.json();
      setAllPosts(data.posts);

    } 
    catch (err) {
      console.error(err);
    }
  };


    
    const currentUser = allUsers.find(user => user.username === currUser.username)
    const userPosts = allPosts.filter(post => post.username === currUser.username)

   
    console.log(currentUser)
    

  return (
    <div className='proile'>
     <div className="user__profile">
        <div className="banner">
          <img src='https://i.pinimg.com/736x/98/20/d3/9820d38a12bdf124c66d9b48e81588de.jpg' alt="Banner" className="banner__image" />
          
        </div>
        <div className="profile__info">
          <div className="avatar">
            <img  className="profile__picture" src={currentUser.imgSrc} />
          </div>
          <div className="username">
            <h2>{currentUser.firstName } {currentUser.lastName}</h2>
            <button >
              Edit
            </button>
          </div>
          <div className="bio">
            <p>Hello I am {currentUser.firstName } {currentUser.lastName} </p>
           {currentUser.link && <a href={ currentUser.link} className="bio__link">Portoflio Link</a>}
          </div>
          <div className="follow__data">
            <p>{currentUser.followers.length} {""} Followers</p>
            <p>{currentUser.following.length} {""} Following</p>
          </div>
        </div>
      </div>
    <div className="user__posts">
    {
        userPosts.map((post) => 
        <PostCard 
        key={post.id} 
        post={post} 
        editedPost={editedPost} 
        setEditedPost={setEditedPost} 
        editedPostID={editedPostID}
        handleUpdate={handleUpdate}
        likedPosts={likedPosts}
        handleRemoveLike={handleRemoveLike}
        handleLikePost={handleLikePost}
        bookmarkedPosts={bookmarkedPosts}
        handleAddBookMark={handleAddBookMark}
        handleRemoveBookMark={handleRemoveBookMark}
        currUser={currUser}
        handleDeletePost={handleDeletePost}
        handleEditIcon={handleEditIcon}
        />
        )
    }
    </div>
    </div>
  )
}

export default CurrentUserProfile
