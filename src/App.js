import { useState } from 'react';
import Table from './components/Table';
import './scss/main.scss';

function App() {
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    console.log('Hello!');
  };

  return (
    <div className="main">
      <h2 className="main__heading">30-Day Report</h2>
      <Table />
      <button onClick={() => handleSubmit()} className="main__btn">
        Get Results!
      </button>
    </div>
  );
}

export default App;
