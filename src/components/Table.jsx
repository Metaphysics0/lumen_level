import React, { useEffect, useState } from 'react';
import { data } from '../sample';

const Table = ({ results }) => {
  const [table, setTable] = useState([]);
  const [sortType, setSortType] = useState('sessionType');

  // Sort by menu
  useEffect(() => {
    const sortTable = (type) => {
      const types = {
        lumenLevel: 'lumenLevel',
        date: 'date',
        sessionType: 'sessionType',
      };
      const sortProperty = types[type];
      const sorted = [...data].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : b[sortProperty] > a[sortProperty] ? -1 : 0
      );
      setTable(sorted);
    };
    sortTable(sortType);
  }, [sortType]);

  return (
    <>
      <select onChange={(e) => setSortType(e.target.value)}>
        <option defaultValue="Sort by" disabled={true}>
          Sort by
        </option>
        <option value="sessionType">Session Type</option>
        <option value="date">Date</option>
        <option value="lumenLevel">Lumen Level</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Date and Time 🕑</th>
            <th>Session Type</th>
            <th>Lumen Level 😇</th>
          </tr>
        </thead>
        <tbody>
          {/* {table.map((item) => (
            <tr key={item.sessionId}>
              <td>{item.date}</td>
              <td>{item.sessionType}</td>
              <td>{item.lumenLevel}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
