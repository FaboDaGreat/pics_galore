import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhotoThunk, getPhotosByAlbumThunk } from '../../store/photos';
import { useModal } from '../../context/Modal';
import './AddPhotoModal.css'

const AddPhotoModal = ({album}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const photoData = {
            url,
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
        }

    };

    return (
        <div className="add-photo-modal">
            <h1 className='add-photo-title'>Upload a New Photo!</h1>
            <form onSubmit={handleSubmit}>
                <div className="photo-form">
                    {errors.message && <h2 className="error-message">{errors.message}</h2>}
                    <label>
                        Enter Url
                        {errors.url && <p className="error-message">{errors.url}</p>}
                        <input
                            type="text"
                            className="upload-input"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste the link for your photo here"
                        />
                    </label>
                    <label>
                        Add a title
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
                    <button type="submit" className="add-photo-modal-button add-photo-button-yes">
                        Upload
                    </button>
                    <button type="button" onClick={closeModal} className="add-photo-modal-button add-photo-button-cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}


export default AddPhotoModal;