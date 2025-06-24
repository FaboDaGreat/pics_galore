import { useDispatch } from 'react-redux';
import { deleteAlbumThunk } from '../../store/albums';
import { useModal } from '../../context/Modal';

const DeleteAlbumModal = ({albumId, leaveAlbum}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteAlbumThunk(albumId));
    closeModal();
    leaveAlbum();
  };

  return (
    <div className="delete-modal-backdrop" onClick={closeModal}>
       <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-modal-title">Delete Photo</h2>
        <p className="delete-modal-message">Are you sure you want to permanently delete this album?</p>
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

export default DeleteAlbumModal;