import React  from 'react'
import '../styles/UserProfile.css'


import { useContext } from 'react'
import { userDetailProvider } from '../contexts/UserDetailContext'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { useEffect } from 'react'
import PostCard from '../components/PostCard'

function UserProfile() {
  const {allPosts,setAllPosts,encodedToken,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts,currUser} = useContext(userDetailProvider)

  const [editedPostID, setEditedPostID] = useState("");
  const [editedPost, setEditedPost] = useState("");

  function handleEditIcon (id){
    const post = allPosts.find(post => post._id === id) 
    setEditedPost(post.content)
    setEditedPostID(post._id)
  }

  const [currentUser,setCurrentUser] = useState({})


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

   const userPosts = allPosts.filter(post => post.username === currUser.username)

   const getUser = async() => {
    try{
      const res = await fetch( `/api/users/${currUser._id}`)

      const data  =  await res.json()
      setCurrentUser(data)
    }
    catch(e)
    {

    }
   }

   useEffect(() => {
    getUser()
   },[])

   console.log(currentUser)
  return (
    <div className='proile'>
      <div className="user__profile">
      <div className="banner">
        <img src='https://i.pinimg.com/originals/c6/cf/e4/c6cfe47895b553ce1c862e6b66afc1a9.jpg' alt="Banner" className="banner__image" />
        
      </div>
      <div className="profile__info">
        <div className="avatar">
          <Avatar  className="profile__picture" >{currUser.username[0]}</Avatar>
        </div>
        <div className="username">
          <h2>{currUser.firstName } {currUser.lastName}</h2>
          <button className={`follow__button `}>
            Edit
          </button>
        </div>
        <div className="bio">
          <p>Hello I am {currUser.firstName } {currUser.lastName} </p>
          <a href="www.google.com" className="bio__link">Add link</a>
        </div>
        <div className="follow__data">
          <p>{currUser.followers.length} {""} Followers</p>
          <p>{currUser.following.length} {""} Following</p>
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

export default UserProfile
