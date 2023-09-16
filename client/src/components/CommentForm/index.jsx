import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';
import { FaStar } from 'react-icons/fa'

import Auth from '../../utils/auth';

const CommentForm = ({ ratingId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          ratingId,
          commentText,
          commentRating,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };


  const [commentRating, setCommentRating] = useState(null)
  const [hover, setHover] = useState(null)

  return (
    <div>
      <h4>
        <span className="loginStyle">How would you rate this Educator?</span>
        </h4>

      {Auth.loggedIn() ? (
        <>
        {[...Array(5)].map((star, index) => {
                const newRating = index + 1 
                return ( 
                <label key={index}>
                 <input 
                  type="radio" 
                  name="commentRating"
                  value = {newRating}
                  onClick = {()=>setCommentRating(newRating)}
                  style={{display: 'none'}}
                  />
                    <FaStar 
                      className ='star' 
                      size={20}
                      color= {newRating <= (hover || commentRating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={()=> setHover(commentRating)}
                      onMouseLeave={()=> setHover(null)}
                />
                </label>
                );
             })}

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
                        <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            <span className="loginStyle">Character Count: {characterCount}/280</span>
            {error && <span className="ml-2">{error.message}</span>}
          </p>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Rating
              </button>
            </div>
          </form>
        </>
      ) : (
        <p >
          <span className="loginStyle">You need to be logged in to share your ratings. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link></span>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
