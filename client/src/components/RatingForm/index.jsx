import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RATING } from '../../utils/mutations';
import { QUERY_RATINGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RatingForm = () => {
  const [ratingText, setRatingText] = useState('');

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
          ratingText,
          ratingAuthor: Auth.getProfile().data.username,
        },
      });

      setRatingText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ratingText' && value.length <= 280) {
      setRatingText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Leave a rating for an educator!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="ratingText"
                placeholder="Here's a new rating..."
                value={ratingText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
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
