import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhotoThunk } from '../../store/photos';


const UploadNewPhotoPage = () => {
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(undefined);
    const [albumId, setAlbumId] = useState(undefined);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const photoData = {
            url,
            title,
            description,
            albumId
        };

        try {
            const newPost = await dispatch(createPhotoThunk(photoData));
            if(newPost.id) {
                window.location.href = "/profile";
            }
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            } else {
                setErrors(["An unexpected error occurred. Please try again."]);
            }
        }
    };

    return (
        <div className="upload-page-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="upload-form-title">Post Your Photo!</h1>
                {errors.length > 0 && (
                    <ul className="upload-errors">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div className="form-input-container">
                    <input
                        type="text"
                        className="upload-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter Link Here"
                        required
                    />
                    <input
                        type="text"
                        className="upload-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a Title"
                        required
                    />
                    <textarea
                        className="upload-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a Description"
                    />
                    <input
                        type="text"
                        className="upload-input"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                        placeholder="Add to Album"
                    />
                </div>
                <button type="submit" className="upload-submit-button">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadNewPhotoPage;