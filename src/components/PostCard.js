import React from 'react';
import '../styles/PostCard.css';

import { Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userDetailProvider } from '../contexts/UserDetailContext';

function PostCard({
  post,
  editedPost,
  editedPostID,
  setEditedPost,
  handleUpdate,
  likedPosts,
  handleRemoveLike,
  handleLikePost,
  bookmarkedPosts,
  handleRemoveBookMark,
  handleAddBookMark,
  currUser,
  handleDeletePost,
  handleEditIcon,
}) {
  const {allUsers} = useContext(userDetailProvider)

  const isPostLiked = likedPosts.some((e) => e._id === post._id);
  const isPostBookmarked = bookmarkedPosts.some((bookmarkedPost) => bookmarkedPost._id === post._id);

  const user = allUsers.find(user => user.username === post.username);
  const imgSrc = user ? user.imgSrc : ''; // Use a default value if user is not found


  return (
    <div className="post">
        {
          post.username === currUser.username && 
             <span className='edit-icon'  onClick={() => handleEditIcon(post._id)}>
               <EditNoteIcon />
            </span>
        }
        <div className="post-header">
           <Avatar
              src={imgSrc}

              alt="User Profile"
              className="user-avatar"
        />
        <div className="user-info">
          <Link style={{textDecoration:'none',color:'inherit'}} to={ post.username === currUser.username ?'/user' : `/profile/${post.username}`}><h3>@{post.username}</h3></Link>
          <span>{post.username} {""} <small>{post.createdAt.split("T")[0]}</small></span>
        </div>        
    </div>

      {post._id === editedPostID ? (
            <div className="Post__edit">
              <textarea
                type="text"
                value={editedPost}
                onChange={(e) => setEditedPost(e.target.value)}
                placeholder="Edit post..."
              />
              <button onClick={() => handleUpdate(post._id)}>Update</button>
            </div>
          ) : (
            <div className="post-content">
            <p>{post.content}</p>
          </div>
          )
      }

      <div className="post-footer">
      <span className='like__container'
          onClick={isPostLiked ? () => handleRemoveLike(post._id) : () => handleLikePost(post._id)}> 
           {isPostLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <p> {post.likes.likeCount}</p>
      </span>

      

      <span onClick={isPostBookmarked ? () => handleRemoveBookMark(post._id) : () => handleAddBookMark(post._id)}>
      {isPostBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </span>

      
      {post.username === currUser.username && 
      <span  onClick={() => handleDeletePost(post._id)}>
         <DeleteIcon />
      </span>}

    </div>
    </div>
  );
}

export default PostCard;
