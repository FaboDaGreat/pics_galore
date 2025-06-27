import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPhotoByIdThunk, editPhotoThunk } from '../../store/photos';
import './EditPhotoPage.css'
import { getAlbumsByUserThunk } from '../../store/albums';

const EditPhotoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);
    const albumArr = albums ? Object.values(albums) : [];

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [albumSelection, setAlbumSelection] = useState('');
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [initialTitle, setInitialTitle] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialAlbumSelection, setInitialAlbumSelection] = useState('');
    const [initialNewAlbumTitle, setInitialNewAlbumTitle] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        const getPhotoDetails = async () => {
            if (id && !isNaN(id)) {
                await dispatch(getPhotoByIdThunk(id));
                await dispatch(getAlbumsByUserThunk(user.id))
                setIsLoaded(true);
            } else {
                navigate('/');
            }
        };
        if (!isLoaded) {
            getPhotoDetails();
        }
    }, [id, dispatch, navigate, isLoaded, user.id]);

    useEffect(() => {
        if (photo && isLoaded) {
            setUrl(photo.url || '');
            setTitle(photo.title || '');
            setDescription(photo.description || '');
            setInitialTitle(photo.title || '');
            setInitialDescription(photo.description || '');
            setInitialNewAlbumTitle('');

            if (photo.Album) {
                setAlbumSelection(photo.Album.title);
                setInitialAlbumSelection(photo.Album.title);
            }
        }
    }, [photo, isLoaded]);

    useEffect(() => {
        if (isLoaded && photo) {
            const changed =
                title !== initialTitle ||
                description !== initialDescription ||
                albumSelection !== initialAlbumSelection ||
                newAlbumTitle !== initialNewAlbumTitle;
            setHasChanged(changed);
        }
    }, [title, description, albumSelection, newAlbumTitle, initialTitle, initialDescription, initialAlbumSelection, initialNewAlbumTitle, isLoaded, photo]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumTitle;

        if (albumSelection === "New Album") {
            albumTitle = newAlbumTitle;
        } else {
            albumTitle = albumSelection;
        }

        const update = {
            url,
            title,
            description,
            albumTitle,
        };

        try {
            const updatedPhoto = await dispatch(editPhotoThunk(id, update));
            if (updatedPhoto.id) {
                navigate(`/photos/${updatedPhoto.id}`);
            }
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };

    if (!isLoaded) {
        return <h1>Loading Photo Details...</h1>;
    }

    if (!photo) {
        return <div className='error-box'><h1>Post Not Found</h1></div>;
    }

    if (!user || user.id !== photo.userId) {
        return <div className='error-box'><h1>Unauthorized!</h1></div>
    }

    return (
        <div className="upload-page-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="upload-form-title">Edit Your Photo</h1>
                <div className="form-input-container">
                    {errors.message && <h2 className="error-message">{errors.message}</h2>}
                    <label>
                        URL (Cannot be edited)
                        <input
                            className="url-box"
                            value={url}
                            readOnly
                        />
                    </label>
                    <label>
                        Title
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
                        Description
                        {errors.description && <p className="error-message">{errors.description}</p>}
                        <textarea
                            className="upload-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a good description for your photo (optional)"
                        />
                    </label>
                    <label>
                        Album
                        {errors.album && <p className="error-message">{errors.album}</p>}
                        <select
                            className="upload-input"
                            value={albumSelection}
                            onChange={(e) => setAlbumSelection(e.target.value)}
                        >
                            <option value=''>(None)</option>
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
                <button type="submit" className="upload-submit-button" disabled={!hasChanged}>
                    Update Photo
                </button>
            </form>
        </div>
    );
};

export default EditPhotoPage;