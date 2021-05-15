import { useState } from 'react';
import Table from './components/Table';
import './scss/main.scss';
import { getResults, getToken } from './lib/api';
import { hasTokenExpired } from './utils/utils';

const consumerCode = process.env.REACT_APP_CONSUMER_CODE;

function App() {
  const [token, setToken] = useState('');
  const [results, setResults] = useState({});

  const handleSubmit = async () => {
    try {
      const responseToken = await getToken();
      const response = await getResults(consumerCode, responseToken.idToken);
      console.log('RESONSE: ', response);
      setResults(response);
      // setToken(responseToken);
    } catch (error) {
      console.error('Could not process request', error);
    }
  };

  return (
    <div className="main">
      <h2 className="main__heading">30-Day Report</h2>
      <Table results={results} />
      <button onClick={() => handleSubmit()} className="main__btn">
        Get Results!
      </button>
    </div>
  );
}

export default App;
