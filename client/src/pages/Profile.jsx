import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_RATING } from '../utils/mutations';
import { QUERY_RATINGS} from '../utils/queries';


import RatingForm from '../components/RatingForm';
import RatingList from '../components/RatingList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {
  const { username: userParam } = useParams();
  // let [user, setUser] = useState({})
 
  // move removeRating/useMutation to this component
  // pass the removeRating function to RatingList as a prop
  // ratingList calls that prop function to remove rating
  // query up should refire automatically

  const [removeRating, { error }] = useMutation(REMOVE_RATING, {
  refetchQueries: [
    QUERY_RATINGS,
    'getRatings',
    QUERY_ME,
    'me'
  ]
});




  const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  useEffect(() => {
    refetch();
  });
  
  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // useEffect(() => {setUser(data)} , [data])
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="loginStyle">
        You need to be logged in to leave a rating. Please <Link className="btn btn-lg btn-info m-2" to="/login"> Login! </Link>
      </h4>
    );
  }


  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <RatingList
            ratings={user.ratings}
            title={`${user.username}'s ratings...`}
            showTitle={false}
            showUsername={false}
            removeRating={removeRating}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #faf7f7' }}
          >
            <RatingForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
