import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createCommentThunk } from "../../store/comments";
import { getPhotoByIdThunk } from "../../store/photos";
import './AddCommentModal.css'

const AddCommentModal = ({ photoId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            comment,
            photoId
        };

        try {
            const newComment = await dispatch(createCommentThunk(commentData));
            if (newComment.id) {
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
            <div className="add-comment-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <strong className="add-comment-title">
                    Leave a comment
                </strong>
                <form onSubmit={handleSubmit}>
                    <div className="comment-form">
                        {errors.comment && <p className="error-message">{errors.comment}</p>}
                        <textarea
                            className="comment-textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment about this photo"
                        />
                    </div>
                    <div className="add-comment-modal-buttons">
                        <button type="submit" className="add-comment-modal-button add-comment-button-yes">
                            Submit
                        </button>
                        <button type="button" onClick={closeModal} className="add-comment-modal-button add-comment-button-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


};

export default AddCommentModal;