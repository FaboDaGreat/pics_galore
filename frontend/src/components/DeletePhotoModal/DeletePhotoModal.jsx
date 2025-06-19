import { useDispatch } from 'react-redux';
import { deletePhotoThunk } from '../../store/photos';
import { useModal } from '../../context/Modal';
import './DeletePhotoModal.css'

const DeletePhotoModal = ({photoId, leavePhotoPage}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePhotoThunk(photoId));
    closeModal();
    leavePhotoPage();
  };

  return (
    <div className="delete-modal-backdrop" onClick={closeModal}>
       <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-modal-title">Delete Photo</h2>
        <p className="delete-modal-message">Are you sure you want to permanently delete this photo?</p>
        <div className="delete-modal-buttons">
          <button
            className="delete-modal-button delete-modal-button-no"
            onClick={closeModal}
          >
            No
          </button>
          <button
            className="delete-modal-button delete-modal-button-yes"
            onClick={(e) => handleDelete(e)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePhotoModal;