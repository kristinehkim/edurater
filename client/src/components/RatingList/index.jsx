import { Link } from 'react-router-dom';


import { FaStar } from 'react-icons/fa'


const RatingList = ({
  ratings,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!ratings.length) {
    return <h3>No Ratings Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {ratings &&
        ratings.map((rating) => (
          <div key={rating._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${rating.ratingAuthor}`}
                >
                  {rating.ratingAuthor} <br />
                  <span style={{display:'inline-flex', fontSize: '1rem', alignContent:'center'}}>
                    rated {rating.ratedEducator} &nbsp; 
                    {[...Array(rating.educatorRating)].map((star) =>
                    <FaStar 
                      className ='star' 
                      size={20}
                      color= {"#ffc107"}
                      />
                    )} &nbsp;
                    on {rating.createdAt}
                  </span>
                </Link>
              ) : (
                <p style={{display: 'inline-flex'}}>
                  <span style={{ display: 'inline-flex', fontSize: '1rem', alignContent: 'center' }}>
                    You had rated {rating.ratedEducator} &nbsp; 
                    {[...Array(rating.educatorRating)].map((star) =>
                    <FaStar 
                      className ='star' 
                      size={20}
                      color= {"#ffc107"}
                      />
                    )} &nbsp;
                    on {rating.createdAt} 
                  </span>
                </p>
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
