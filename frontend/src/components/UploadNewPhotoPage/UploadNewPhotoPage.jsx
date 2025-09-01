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
    const albumArr = albums ? Object.values(albums) : [];

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [albumSelection, setAlbumSelection] = useState('');
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        let albumTitle;

        if (albumSelection === "New Album") {
            albumTitle = newAlbumTitle;
        } else {
            albumTitle = albumSelection;
        }

        const photoData = {
            image,
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
        } finally {
            setLoading(false);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    return (
        <div className="upload-page-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="upload-form-title">Post Your Photo!</h1>
                <div className="form-input-container">
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
                    <label>
                        Add to Album
                        {errors.album && <p className="error-message">{errors.album}</p>}
                        <select
                            className="upload-input"
                            value={albumSelection}
                            onChange={(e) => setAlbumSelection(e.target.value)}
                        >
                            <option value=''>Add to Album (optional)</option>
                            {albumArr.map((album, idx) => (
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
                <button
                    type="submit"
                    className="upload-submit-button"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Post"}
                </button>
            </form>
        </div>
    );
};

export default UploadNewPhotoPage;