import '../styles/Profile.css'

import React, { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { userDetailProvider } from '../contexts/UserDetailContext'

import PostCard from '../components/PostCard'

function Profile() {
  const {username} = useParams()
  const {allPosts,setAllPosts,encodedToken,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts,currUser,allUsers,setAllUsers,followedUsers,setFollowedUsers} = useContext(userDetailProvider)

  const singleUser = allUsers.find(user => user.username === username)

  const userPosts = allPosts.filter(post => post.username === username)


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

  const handleUnfollow = async (id) => {
    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      });

      const result = await response.json();
      console.log(result, "UNFOLLOW RESULT")

      setFollowedUsers(followedUsers.filter((e) => e.followUser.username !== result.followUser.username));

      const updatedAllUsers = allUsers.map((e)=>
      e.username === result.followUser.username ?  result.followUser : e.username === result.user.username ?result.user : e
      )
      
      setAllUsers(updatedAllUsers)
      
    } catch (err) {
      console.error(err);
    }
  }

  const id = singleUser._id

  const isFollowed = followedUsers.map((e) => e.followUser.username).includes(username)
  return (
    <div className='proile'>
    <div className="user__profile">
    <div className="banner">
      <img src='https://i.pinimg.com/736x/98/20/d3/9820d38a12bdf124c66d9b48e81588de.jpg' alt="Banner" className="banner__image" />
      
    </div>
    <div className="profile__info">
      <div  className="avatar">
        <img style={{color:"black",fontSize:"large"}} className="profile__picture" src={singleUser.imgSrc} />
      </div>
      <div className="username">
        <h2>{singleUser.firstName } {singleUser.lastName}</h2>
        {
          <button onClick={isFollowed ? () => handleUnfollow(id) : () => handleFollow(id)}>{isFollowed ? 'unfollow' : 'follow'}</button>
        }
      </div>
      <div className="bio">
        <p>Hello I am {singleUser.firstName } {singleUser.lastName} </p>
       { singleUser.link && <a target="_blank"  href={ singleUser.link} className="bio__link">portfolio link</a>}
      </div>
      <div className="follow__data">
        <p>{singleUser.followers.length} {""} Followers</p>
        <p>{singleUser.following.length} {""} Following</p>
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

export default Profile
