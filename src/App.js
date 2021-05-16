import { useState } from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import './scss/main.scss';
import { getResults, getToken } from './lib/api';
import { hasTokenExpired } from './utils/utils';

// for loading indicator
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

function App() {
  const { promiseInProgress } = usePromiseTracker();
  const [token, setToken] = useState('');
  const [results, setResults] = useState();

  // Request generates a token, then uses the token to fetch data
  const handleSubmit = async () => {
    try {
      const responseToken = await getToken();
      const response = await getResults(responseToken.idToken);
      setResults(response);
      return response;
    } catch (error) {
      console.error('Could not process request', error);
    }
  };

  const LoadingText = () => (promiseInProgress ? 'Loading!' : 'Get Results');

  return (
    <>
      <Navbar />
      <main className="main">
        <h2 className="main__heading">30-Day Report</h2>
        <h4 className="main__subheading">Get the last 30 days of your Lumen Level</h4>
        <Table results={results} />
        <button onClick={() => trackPromise(handleSubmit())} className="main__btn">
          <LoadingText />
        </button>
      </main>
    </>
  );
}

export default App;
