import React from 'react'
import { useContext } from 'react'
import { userDetailProvider } from '../contexts/UserDetailContext'
import PostCard from '../components/PostCard';
import { useState } from 'react';

function Bookmarks() {
  const {allPosts,setAllPosts,encodedToken,likedPosts,setLikedPosts,bookmarkedPosts,setBookmarkedPosts,currUser} = useContext(userDetailProvider)

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


  const bookmarkedIds = bookmarkedPosts.map(bookmark => bookmark._id)
 
  const AllbookmarkedPosts = allPosts.filter(post => bookmarkedIds.includes(post._id))

  console.log(AllbookmarkedPosts)
  return (
    <div>
      <h1>Bookmarks ({AllbookmarkedPosts.length})</h1>
      {
        AllbookmarkedPosts.map((post) => 
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
  )
}

export default Bookmarks
