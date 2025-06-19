import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPhotoByIdThunk, editPhotoThunk } from '../../store/photos';
import './EditPhotoPage.css'

const EditPhotoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [initialTitle, setInitialTitle] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialAlbumTitle, setInitialAlbumTitle] = useState('');

    useEffect(() => {
        const getPhotoDetails = async () => {
            if (id && !isNaN(id)) {
                await dispatch(getPhotoByIdThunk(id));
                setIsLoaded(true);
            } else {
                navigate('/my-profile');
            }
        };
        if (!isLoaded) {
            getPhotoDetails();
        }
    }, [id, dispatch, navigate, isLoaded]);

    useEffect(() => {
        if (photo && isLoaded) {
            setUrl(photo.url || '');
            setTitle(photo.title || '');
            setDescription(photo.description || '');
            setAlbumTitle(photo.albumTitle || '');
            setInitialTitle(photo.title || '');
            setInitialDescription(photo.description || '');
            setInitialAlbumTitle(photo.albumTitle || '');
        }
    }, [photo, isLoaded]);

    useEffect(() => {
        if (isLoaded && photo) {
            const changed =
                title !== initialTitle ||
                description !== initialDescription ||
                albumTitle !== initialAlbumTitle;
            setHasChanged(changed);
        }
    }, [title, description, albumTitle, initialTitle, initialDescription, initialAlbumTitle, isLoaded, photo]);


    const handleSubmit = async (e) => {
        e.preventDefault();

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
        return <h1>Post Not Found</h1>;
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
                        <input
                            type="text"
                            className="upload-input"
                            value={albumTitle}
                            onChange={(e) => setAlbumTitle(e.target.value)}
                            placeholder="Add to Album (optional)"
                        />
                    </label>
                </div>
                <button type="submit" className="upload-submit-button" disabled={!hasChanged}>
                    Update Photo
                </button>
            </form>
        </div>
    );
};

export default EditPhotoPage;