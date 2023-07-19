import '../styles/Profile.css'

import React, { useEffect, useRef } from 'react';
import { useContext } from 'react'

import { userDetailProvider } from '../contexts/UserDetailContext'
import PostCard from '../components/PostCard'

import { useState } from 'react'


function CurrentUserProfile() {

    const {allPosts,setAllPosts,encodedToken,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts,currUser,allUsers,setAllUsers} = useContext(userDetailProvider)

    const [editedPostID, setEditedPostID] = useState("");
    const [editedPost, setEditedPost] = useState("");

    const [showEditProfileForm,setShowEditProfileForm] = useState(false)
    const formRef = useRef(null);

    

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

   
    
    
    
  
    // Function to handle clicks outside the form
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowEditProfileForm(false);
      }
    };
  
    useEffect(() => {
      // Attach event listener when the component mounts
      document.addEventListener('mousedown', handleClickOutside);
      // Remove event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    const [formData,setFormData] = useState({
      firstName:currentUser.firstName,
      lastName:currentUser.lastName,
      link:currentUser.link,
      imgSrc:currentUser.imgSrc,
      imgBg:currentUser.imgBg,
      bio:currentUser.bio
    })
  

    const handleSubmit = async (event) => {
      event.preventDefault();

      const requestData = {
        userData: formData, 
      }
    
      try{
        const res = await fetch('/api/users/edit',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: encodedToken,
          },
          body:  JSON.stringify(requestData),
        })

        const data = await res.json()

        const upDatedUsers = allUsers.map(user => user.username === currentUser.username ? data.user : user)

        setAllUsers(upDatedUsers)

        
      }
      catch(e){
        console.error(e)
      }
     setShowEditProfileForm(false)
    };


  return (
    <div  className='proile'>
     { !showEditProfileForm && <div className="user__profile">
        <div className="banner">
          <img src={currentUser.imgBg  ? currentUser.imgBg : 'https://i.pinimg.com/736x/98/20/d3/9820d38a12bdf124c66d9b48e81588de.jpg'} alt="Banner" className="banner__image" />
          
        </div>
        <div className="profile__info">
          <div className="avatar">
            <img  className="profile__picture" src={currentUser.imgSrc} />
          </div>
          <div className="username">
            <h2>{currentUser.firstName } {currentUser.lastName}</h2>
            <button onClick={() => setShowEditProfileForm(true)}>
              Edit
            </button>
          </div>
          <div className="bio">
            <p>{currentUser.bio} </p>
           {currentUser.link && <a href={ currentUser.link} className="bio__link">{ currentUser.link}</a>}
          </div>
          <div className="follow__data">
            <p>{currentUser.followers.length} {""} Followers</p>
            <p>{currentUser.following.length} {""} Following</p>
          </div>
        </div>
      </div> }
      {showEditProfileForm && (
        <div class="modal-bg">
        <div class="modal-content">
          <form ref={formRef} onSubmit={handleSubmit}>
            <h2>Update Your Profile {currentUser.firstName}</h2>
            <div class="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="First Name"
              />
            </div>
      
            <div class="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Last Name"
              />
            </div>
      
            <div class="form-group">
              <label htmlFor="bio">Enter Bio:</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Enter a bio...."
              ></textarea>
            </div>
      
            <div class="form-group">
              <label htmlFor="link">Portfolio Link:</label>
              <input
                type="text"
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="Portfolio Link"
              />
            </div>
      
            <div class="form-group">
              <label htmlFor="imgSrc">Profile Picture:</label>
              <input
                type="text"
                id="imgSrc"
                value={formData.imgSrc}
                onChange={(e) => setFormData({...formData, imgSrc: e.target.value})}
                placeholder="Image Source"
              />
            </div>
      
            <div class="form-group">
              <label htmlFor="imgBg">Cover Picture:</label>
              <input
                type="text"
                id="imgBg"
                value={formData.imgBg}
                onChange={(e) => setFormData({...formData, imgBg: e.target.value})}
                placeholder="Image Source"
              />
            </div>
      
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
      
      )}
    <div className="user__posts">
    {!showEditProfileForm &&
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
