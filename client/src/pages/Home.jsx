import { useQuery } from '@apollo/client';

import RateList from '../components/RateList';
import RateForm from '../components/RateForm';

import { QUERY_RATES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RATES);
  const rates = data?.rates || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RateForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RateList
              rates={rates}
              title="Some Feed for Rate(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
