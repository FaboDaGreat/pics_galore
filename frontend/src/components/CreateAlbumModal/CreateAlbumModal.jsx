import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAlbumThunk } from '../../store/albums';
import { useModal } from '../../context/Modal';
import './CreateAlbumModal.css'

const CreateAlbumModal = ({ navigate }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const albumData = {
            title,
            description
        };

        try {
            const newAlbum = await dispatch(createAlbumThunk(albumData));
            if (newAlbum.id) {
                navigate(`/albums/${newAlbum.id}`)
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
            <div
                className="create-album-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="create-album-title">Make a New Album!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="album-form">
                        {errors.message && <h2 className="error-message">{errors.message}</h2>}
                        <label>
                            Title Your Album
                            {errors.title && <p className="error-message">{errors.title}</p>}
                            <input
                                type="text"
                                className="album-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title of your album"
                            />
                        </label>
                        <label>
                            Add a Description
                            {errors.description && <p className="error-message">{errors.description}</p>}
                            <textarea
                                className="album-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write a good description for your album (optional)"
                            />
                        </label>
                    </div>
                    <div className="new-album-modal-buttons">
                        <button type="submit" className="new-album-modal-button new-album-button-yes">
                            Create Album
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="new-album-modal-button new-album-button-cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAlbumModal;