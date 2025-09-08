import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhotoThunk, getPhotosByAlbumThunk } from '../../store/photos';
import { useModal } from '../../context/Modal';
import './AddPhotoModal.css'

const AddPhotoModal = ({ album }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const photoData = {
            image,
            title,
            description,
            albumTitle: album.title
        };

        try {
            const newPhoto = await dispatch(createPhotoThunk(photoData));
            if (newPhoto.id) {
                await dispatch(getPhotosByAlbumThunk(album.id));
                closeModal();
            }
        } catch (res) {
            const data = await res.json();

            if (data && data.errors) {
                setErrors(data.errors)
            }
        } finally {
            setLoading(false);
        }

    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="add-photo-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className='add-photo-title'>Add a New Photo!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="photo-form">
                        {errors.message && <h2 className="error-message">{errors.message}</h2>}
                        <label>
                            Upload a Photo
                            {errors.url && <p className="error-message">{errors.url}</p>}
                            <input
                                type="file"
                                className="upload-file"
                                onChange={updateFile}
                            />
                        </label>
                        <label>
                            Add a Title
                            {errors.title && <p className="error-message">{errors.title}</p>}
                            <input
                                type="text"
                                className="upload-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title of your post"
                            />
                        </label>
                        <label>
                            Add a Description
                            {errors.description && <p className="error-message">{errors.description}</p>}
                            <textarea
                                className="upload-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write a good a description for your photo (optional)"
                            />
                        </label>
                    </div>
                    <div className="add-photo-modal-buttons">
                        <button type="submit"
                            className="add-photo-modal-button add-photo-button-yes"
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                        <button type="button" onClick={closeModal} className="add-photo-modal-button add-photo-button-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default AddPhotoModal;