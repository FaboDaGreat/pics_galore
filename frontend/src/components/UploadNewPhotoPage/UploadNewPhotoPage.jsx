import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPhotoThunk } from '../../store/photos';
import { getAlbumsByUserThunk } from '../../store/albums';
import './UploadNewPhotoPage.css'
import { useNavigate } from 'react-router-dom';


const UploadNewPhotoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);

    const [url, setUrl] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [albumSelection, setAlbumSelection] = useState(undefined);
    const [newAlbumTitle, setNewAlbumTitle] = useState(undefined);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getAllAlbums = async () => {
            await dispatch(getAlbumsByUserThunk(user.id));
        }

        if (user) {
            getAllAlbums();
        }
    }, [dispatch, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumTitle;

        if (albumSelection === "New Album") {
            albumTitle = newAlbumTitle;
        } else {
            albumTitle = albumSelection;
        }

        const photoData = {
            url,
            title,
            description,
            albumTitle
        };

        try {
            const newPost = await dispatch(createPhotoThunk(photoData));
            if (newPost.id) {
                navigate('/my-profile/photos');
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
                        <select
                            className="upload-input"
                            value={albumSelection}
                            onChange={(e) => setAlbumSelection(e.target.value)}
                        >
                            <option value=''>Add to Album (optional)</option>
                            {albums.map((album, idx) => (
                                <option key={`${idx}-${album.id}`} value={album.title}>
                                    {album.title}
                                </option>
                            ))}
                            <option value="New Album">(Create a new album)</option>
                        </select>
                    </label>
                    {albumSelection === "New Album" && (
                        <label>
                            New Album Name
                            <input
                                type="text"
                                className="upload-input"
                                value={newAlbumTitle}
                                onChange={(e) => setNewAlbumTitle(e.target.value)}
                                placeholder="Enter a title for your new album"
                                required
                            />
                        </label>
                    )}
                </div>
                <button type="submit" className="upload-submit-button">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadNewPhotoPage;