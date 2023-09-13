import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { FaStar } from 'react-icons/fa'
import { GiTrashCan } from 'react-icons/gi'

import { REMOVE_RATING } from '../../utils/mutations';
import { QUERY_RATINGS, QUERY_ME } from '../../utils/queries';




const RatingList = ({
  ratings,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!ratings.length) {
    return <h3>No Ratings Yet</h3>;
  }

  
const [removeRating, { error }] = useMutation
(REMOVE_RATING, {
  refetchQueries: [
    QUERY_RATINGS,
    'getRatings',
    QUERY_ME,
    'me'
  ]
});

  return (
    
    <div>

      {showTitle && <h3>{title}</h3>}
      {ratings &&
        ratings.map((rating) => (
          <div key={rating._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0" >
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${rating.ratingAuthor}`}
                >
                  <span style={{ display: 'inline-flex', fontSize: '2rem', alignContent: 'center' }}>
                     {rating.ratedEducator} &nbsp;
                    {[...Array(rating.educatorRating)].map((star) =>
                      <FaStar
                        className='star'
                        size={30}
                        color={"#ffc107"}
                      />
                    )} &nbsp;
                  </span> <br />
                  Rated by {rating.ratingAuthor} on {rating.createdAt}

                </Link>
              ) : (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <label style={{ display: 'inline-flex', fontSize: '1rem', alignContent: 'center' }}>
                    You had rated {rating.ratedEducator} &nbsp;
                    {[...Array(rating.educatorRating)].map((star) =>
                      <FaStar
                        className='star'
                        size={20}
                        color={"#ffc107"}
                      />
                    )} &nbsp;
                    on {rating.createdAt}
                  </label>
                  <p>
                   <button style={{color: "#EE0C38", background:'#384478', borderColor:'white'}}>
                    <GiTrashCan
                    onClick={()=>{removeRating(rating.ratingId)}} />
                   </button>
                  </p>

                </div>

              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{rating.ratingText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/ratings/${rating._id}`}
            >
              Join the discussion on this rating.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RatingList;
