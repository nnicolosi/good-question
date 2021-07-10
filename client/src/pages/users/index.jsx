import { React, useEffect, useState } from 'react';
import { getAllUsers } from '../../services/user.service';
import UserModal from '../../components/user-modal';
import ModalContext from '../../contexts/modal-context';
import './users.scss';

const UsersPage = () => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const formatHeader = (header) => {
    return header.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase();
  };

  const formatCell = (cell) => {
    if (typeof cell === 'boolean') {
      return cell ? 'Yes' : 'No';
    }

    return cell;
  };

  useEffect(() => {
    getAllUsers().then((response) => {
      if (response.data && response.data.length) {
        const headers = (
          <tr>
            {Object.getOwnPropertyNames(response.data[0]).map((header, index) => (
              <th key={index}>{formatHeader(header)}</th>
            ))}
          </tr>
        );
        setTableHeaders(headers);

        const rows = response.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{formatCell(cell)}</td>
            ))}
          </tr>
        ));
        setTableRows(rows);
      }
    });
  }, []);

  return (
    <div className="users-page">
      <div className="section">
        <div className="container">
          <div className="container page-header">
            <h6 className="title">Users</h6>
            <button className="button is-primary create-user-button" onClick={() => setShowModal(true)}>
              Create User
            </button>
          </div>
          <hr />
          <table className="table is-fullwidth is-hoverable">
            <thead>{tableHeaders}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      <ModalContext.Provider value={{ showModal: showModal, closeModal: () => setShowModal(false) }}>
        <UserModal />
      </ModalContext.Provider>
    </div>
  );
};

export default UsersPage;
