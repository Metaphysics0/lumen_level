import { useState } from 'react';
import { getResults, getToken } from './lib/api';
import Navbar from './components/Navbar';
import Table from './components/Table';

// for loading indicator
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

function App() {
  const { promiseInProgress } = usePromiseTracker();
  const [results, setResults] = useState();

  // Request generates a token, then uses the token to fetch data
  const handleSubmit = async () => {
    try {
      const responseToken = await getToken();
      const response = await getResults(responseToken);
      setResults(response.data);
      return response;
    } catch (error) {
      console.error('Could not process request', error);
    }
  };

  const LoadingText = promiseInProgress ? 'Loading!' : 'Get Results';

  return (
    <>
      <Navbar />
      <main className="main">
        <h2 className="main__heading">30-Day Report</h2>
        <h4 className="main__subheading">Get the last 30 days of your Lumen Level</h4>
        <Table results={results} setResults={setResults} />
        <button
          onClick={() => trackPromise(handleSubmit())}
          className={promiseInProgress ? 'main__btn main__btn--disabled' : 'main__btn'}
          disabled={promiseInProgress}
        >
          {LoadingText}
        </button>
      </main>
    </>
  );
}

export default App;
