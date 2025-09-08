import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { getPhotoByIdThunk } from "../../store/photos";
import { editCommentThunk } from "../../store/comments";
import './EditCommentModal.css'

const EditCommentModal = ({ photoId, commentToEdit }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [comment, setComment] = useState('');
    const [initialComment, setInitialComment] = useState('');
    const [errors, setErrors] = useState('');
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        setComment(commentToEdit.comment || '');
        setInitialComment(commentToEdit.comment || '');
    }, [commentToEdit]);

    useEffect(() => {
        const changed =
            comment !== initialComment;
        setHasChanged(changed);
    }, [comment, initialComment]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            id: commentToEdit.id,
            comment
        };

        try {
            const editedComment = await dispatch(editCommentThunk(commentData));
            if (editedComment.id) {
                await dispatch(getPhotoByIdThunk(photoId));
                closeModal();
            }
        } catch (res) {
            const data = await res.json();

            if (data && data.errors) {
                setErrors(data.errors)
            }
        }

    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="edit-comment-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <strong className="edit-comment-title">
                    Edit comment
                </strong>
                <form onSubmit={handleSubmit}>
                    <div className="edit-comment-form">
                        {errors.message && <h2 className="error-message">{errors.message}</h2>}
                        {errors.comment && <p className="error-message">{errors.comment}</p>}
                        <textarea
                            className="edit-comment-textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment about this photo"
                        />
                    </div>
                    <div className="edit-comment-modal-buttons">
                        <button type="submit" disabled={!hasChanged} className="edit-comment-modal-button edit-comment-button-yes">
                            Submit
                        </button>
                        <button type="button" onClick={closeModal} className="edit-comment-modal-button edit-comment-button-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


};

export default EditCommentModal;