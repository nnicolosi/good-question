import { useContext } from 'react';
import ModalContext from '../../contexts/modal-context';
import './user-modal.scss';

const UserModal = (props) => {
  const modalContext = useContext(ModalContext);

  return (
    <div className={`modal ${modalContext.showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">I'm the User Modal</div>
      <button className="modal-close is-large" aria-label="close" onClick={() => modalContext.closeModal()}></button>
    </div>
  );
};

export default UserModal;
