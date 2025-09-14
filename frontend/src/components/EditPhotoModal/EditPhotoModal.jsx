import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPhotoThunk, getPhotoByIdThunk } from '../../store/photos';
import './EditPhotoModal.css'
import { useModal } from '../../context/Modal';

const EditPhotoModal = ({ photo, albums }) => {
    const id = photo.id;
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [albumSelection, setAlbumSelection] = useState('');
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [initialTitle, setInitialTitle] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialAlbumSelection, setInitialAlbumSelection] = useState('');
    const [initialNewAlbumTitle, setInitialNewAlbumTitle] = useState('');
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
            setTitle(photo.title || '');
            setDescription(photo.description || '');
            setInitialTitle(photo.title || '');
            setInitialDescription(photo.description || '');
            setInitialNewAlbumTitle('');

            if (photo.Album) {
                setAlbumSelection(photo.Album.title);
                setInitialAlbumSelection(photo.Album.title);
            }
        
    }, [photo]);

    useEffect(() => {
            const changed =
                title !== initialTitle ||
                description !== initialDescription ||
                albumSelection !== initialAlbumSelection ||
                newAlbumTitle !== initialNewAlbumTitle;
            setHasChanged(changed);
    }, [title, description, albumSelection, newAlbumTitle, initialTitle, initialDescription, initialAlbumSelection, initialNewAlbumTitle]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumTitle;

        if (albumSelection === "New Album") {
            albumTitle = newAlbumTitle;
        } else {
            albumTitle = albumSelection;
        }

        const update = {
            title,
            description,
            albumTitle,
        };

        try {
            const updatedPhoto = await dispatch(editPhotoThunk(id, update));
            if (updatedPhoto.id) {
                await dispatch(getPhotoByIdThunk(updatedPhoto.id));
                closeModal();
            }
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };

    return (
        <div className="upload-page-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="upload-form-title">Edit Your Photo</h1>
                <div className="form-input-container">
                    {errors.message && <h2 className="error-message">{errors.message}</h2>}
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
                <button type="submit" className="upload-submit-button" disabled={!hasChanged}>
                    Update Photo
                </button>
            </form>
        </div>
    );
};

export default EditPhotoModal;