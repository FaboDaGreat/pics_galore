import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhotoThunk } from '../../store/photos';
import './UploadNewPhotoPage.css'


const UploadNewPhotoPage = () => {
    const dispatch = useDispatch();

    const [url, setUrl] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [albumTitle, setAlbumTitle] = useState(undefined);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const photoData = {
            url,
            title,
            description,
            albumTitle
        };

        try {
            const newPost = await dispatch(createPhotoThunk(photoData));
            if(newPost.id) {
                window.location.href = "/my-profile";
            }
        } catch (res) {
            const data = await res.json();
            
            if (data && data.errors) {
                setErrors(data.errors)
            }
        }
    };


    return (
        <div className="upload-page-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="upload-form-title">Post Your Photo!</h1>
                <div className="form-input-container">
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
                    <label>
                        Add to Album 
                        {errors.album && <p className="error-message">{errors.album}</p>}
                    <input
                        type="text"
                        className="upload-input"
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        placeholder="Add to Album (optional)"
                    />
                    </label>
                </div>
                <button type="submit" className="upload-submit-button">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadNewPhotoPage;