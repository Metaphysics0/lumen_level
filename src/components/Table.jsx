import React, { useEffect, useState } from 'react';
import { emojis } from '../utils/utils';

const Table = ({ results, setResults }) => {
  const [sortType, setSortType] = useState('sessionType');

  // 'Sort By' dropdown menu
  useEffect(() => {
    const sortTable = (type) => {
      const types = {
        lumenLevel: 'lumenLevel',
        date: 'date',
        sessionType: 'sessionType',
      };
      const sortProperty = types[type];
      const sorted =
        results &&
        [...results].sort((a, b) =>
          a[sortProperty] > b[sortProperty] ? 1 : b[sortProperty] > a[sortProperty] ? -1 : 0
        );
      setResults(sorted);
    };
    sortTable(sortType);
  }, [sortType]);

  return (
    <>
      <label className="select">
        <span> Sort By:</span>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option defaultValue="Sort by" disabled={true}>
            Sort by
          </option>
          <option value="sessionType">Session Type</option>
          <option value="date">Date</option>
          <option value="lumenLevel">Lumen Level</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Date and Time 🕑</th>
            <th>Session Type 🗓</th>
            <th>Lumen Level ❤️</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((item) => (
              <tr key={item.sessionId}>
                <td>{item.date}</td>
                <td>{item.sessionType + ' ' + emojis[item.sessionType]}</td>
                <td>{item.lumenLevel}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
