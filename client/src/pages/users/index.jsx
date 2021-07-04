import { Fragment, useEffect, useState } from 'react';
import { getAllUsers } from '../../services/user.service';

const UsersPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            {Object.getOwnPropertyNames(response.data[0]).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ));
        setTableRows(rows);
      }
    });
  }, []);

  return (
    <Fragment>
      <h1>Users</h1>
      <hr />
      <table className="table">
        <thead>{tableHeaders}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    </Fragment>
  );
};

export default UsersPage;
