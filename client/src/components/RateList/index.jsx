import { Link } from 'react-router-dom';

const RateList = ({
  rates,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!rates.length) {
    return <h3>No Rates Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {rates &&
        rates.map((rate) => (
          <div key={rate._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${rate.rateAuthor}`}
                >
                  {rate.rateAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this rate on {rate.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this rate on {rate.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{rate.rateText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/rates/${rate._id}`}
            >
              Join the discussion on this rate.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RateList;
