import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';
import { useModal } from '../../context/Modal';

const DeleteCommentModal = ({ commentId, photoOwner }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCommentThunk(commentId, photoOwner));
    closeModal();
  };

  return (
    <div className="delete-modal-backdrop" onClick={closeModal}>
       <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-modal-title">Delete Comment</h2>
        <p className="delete-modal-message">Are you sure you want to delete this comment?</p>
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

export default DeleteCommentModal;