import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { FaStar } from 'react-icons/fa'

import { ADD_RATING } from '../../utils/mutations';
import { QUERY_RATINGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RatingForm = () => {
  const [ratingText, setRatingText] = useState('');
  const [ratedEducator, setRatedEducator] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addRating, { error }] = useMutation
  (ADD_RATING, {
    refetchQueries: [
      QUERY_RATINGS,
      'getRatings',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRating({
        variables: {
          ratedEducator,
          ratingText,
          ratingAuthor: Auth.getProfile().data.username,
        },
      });

      setRatingText('');
      setRatedEducator('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ratingText' && value.length <= 280) {
      setRatingText(value);
      setCharacterCount(value.length);
    } else if 
      (name === 'ratedEducator' && value.length <= 280) {
        setRatedEducator(value);
        setCharacterCount(value.length);
    }
  };


const [rating, setRating] = useState(null)
const [hover, setHover] = useState(null)


  return (
    <div>
      {Auth.loggedIn() ? (
        <>
         <h3 style={{display:'block', alignContent:'center'}}>Leave your rating for 
             <input
                name="ratedEducator"
                placeholder="Educator's Name"
                value={ratedEducator}
                className="form-input"
                style={{ height:'0.25', width:'fit-content', position:'relative', border:'none', textAlign:'center' }}
                onChange={() => setRatedEducator(value)}
              ></input>
              !
          </h3>

          <p className='flex-row' style={{display:'inline-flex', alignContent:'center'}}>
            
             {[...Array(5)].map((star, index) => {
                const newRating = index + 1 
                return ( 
                <label>
              <input 
                type="radio" 
                name="rating"
                value = {newRating}
                onClick = {()=>setRating(newRating)}
               />
              <FaStar 
                className ='star' 
                size={20}
                color= {newRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={()=> setHover(newRating)}
                onMouseLeave={()=> setHover(null)}
                />
                </label>
                );
             })}
                <p className='rating'>
                 {rating}
                </p>  

          </p>

            

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="ratingText"
                placeholder="Add any comments you may have"
                value={ratingText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
            >
            Character Count: {characterCount}/280
          </p>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Rating
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your ratings. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RatingForm;
