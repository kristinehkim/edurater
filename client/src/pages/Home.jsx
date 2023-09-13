import { useQuery } from '@apollo/client';

import RatingList from '../components/RatingList';
import RatingForm from '../components/RatingForm';

import { QUERY_RATINGS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RATINGS);
  const ratings = data?.ratings || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #faf7f7' }}
        >
          <RatingForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RatingList
              ratings={ratings}
              title="Some of recent Educator Rating(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
