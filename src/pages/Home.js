import React, { useContext, useEffect, useState } from 'react'
import '../styles/Home.css'
import { userDetailProvider } from '../contexts/UserDetailContext'
import {  toast } from "react-toastify";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PostCard from '../components/PostCard';


function Home() {
  const {allPosts,
         setAllPosts,
         currUser,
         encodedToken,
         allUsers,
         setAllUsers,
         followedUsers,
         setFollowedUsers,
         likedPosts,
         setLikedPosts,
         bookmarkedPosts,
         setBookmarkedPosts
        } =  useContext(userDetailProvider)

  
  const [content, setContent] = useState("");
  const [editedPostID, setEditedPostID] = useState("");
  const [editedPost, setEditedPost] = useState("");
  
  const [loading,setLoading] = useState(false)
  



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

  const  handleCreatePost = async(id) =>{
    if (!content) return;
    try{

      const res = await fetch(`/api/posts/`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
        body: JSON.stringify({
          postData: {
            content: content,
          },
        }),
      })

      const data = await res.json()
      setAllPosts(data.posts)
      setContent('')
    }
    catch(e)
    {
      console.error(e)
    }
  }

  const getPosts = async() => {
    setLoading(true)
    try{
      const res = await fetch("/api/posts", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: encodedToken,
        },
      });

      const data = await res.json()
      setAllPosts(data.posts)
    }
    catch(e){
      console.error(e)
    }
    setLoading(false)
  }

  
  const getUsers = async () => {
    try{
      const res = await fetch("/api/users", {
        method: "GET", 
      });

      const result = await res.json();
      setAllUsers( result.users);

    }
    catch(e){

    }
  }

  useEffect(() => {
    getPosts()
    getUsers()
  },[])

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

      toast.success("Liked")
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

  // const sortedPosts = allPosts.sort((a, b) => {
  //   const dateA = new Date(a.createdAt);
  //   const dateB = new Date(b.createdAt);

  //   return dateB - dateA;
  // });

  

  const [userSort,setUserSort] = useState('')

  const sortByDate = [...allPosts].sort((a, b) =>  {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB - dateA;
  })

  const sortByTrend = [...allPosts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);

  function handleChange(e) {
    setUserSort(e.target.value)
    setAllPosts(userSort === "latest" ? sortByTrend : sortByDate)
  }

  console.log(allPosts)
  return ( 
    
      <div className='post-list'>

         <div className="feed__createpost">
             <input
               type="text"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="postform__input"
              placeholder="What's on your mind?"
             />
            <button
              onClick={handleCreatePost}
              className="postform__button"
             >
           Post
          </button>
        </div>

        <div>
        <select 
         style={{
          backgroundColor: '#f2f2f2',
          border: '1px solid #ccc',
          padding: '5px',
          color: '#333',
        }}
          onChange={handleChange} >
           <option value="latest">Latest Post</option>
           <option value="trending">Trending</option>
        </select>
        </div>
        {
          allPosts.map(
          (post) => 
          (followedUsers.map((e) => e.followUser?.username).includes(post.username) || post.username === currUser.username)
          && <PostCard 
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
  )
}

export default Home
