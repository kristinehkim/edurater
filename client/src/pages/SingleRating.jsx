// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FaStar } from 'react-icons/fa'

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_RATING } from '../utils/queries';

const SingleRating = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { ratingId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RATING, {
    // pass URL parameter
    variables: { ratingId: ratingId },
  });

  const rating = data?.rating || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
      <span style={{ fontSize: '2rem' }}>
        {rating.ratedEducator} &nbsp;
        {[...Array(rating.educatorRating)].map((star) =>
          <FaStar 
          className ='star' 
          size={30}
          color= {"#ffc107"}
          />
        )}
      </span> <br />
      Rated by {rating.ratingAuthor} on {rating.createdAt}
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {rating.ratingText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={rating.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #faf7f7' }}>
        <CommentForm ratingId={rating._id} />
      </div>
    </div>
  );
};

export default SingleRating;
