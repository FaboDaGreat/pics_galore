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
        <div className="modal-overlay" onClick={closeModal}>
            <div className="edit-photo-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="edit-photo-title">
                    Edit Your Photo
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="edit-photo-form">
                        {errors.message && <h2 className="error-message">{errors.message}</h2>}
                        <label>
                            Title
                            {errors.title && <p className="error-message">{errors.title}</p>}
                            <input
                                type="text"
                                className="edit-photo-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title of your post"
                            />
                        </label>
                        <label>
                            Description
                            {errors.description && <p className="error-message">{errors.description}</p>}
                            <textarea
                                className="edit-photo-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write a good description for your photo (optional)"
                            />
                        </label>
                        <label>
                            Album
                            {errors.album && <p className="error-message">{errors.album}</p>}
                            <select
                                className="edit-photo-input"
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
                                    className="edit=photo-input"
                                    value={newAlbumTitle}
                                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                                    placeholder="Enter a title for your new album"
                                    required
                                />
                            </label>
                        )}
                    </div>
                    <div className="edit-photo-modal-buttons">
                        <button type="submit" disabled={!hasChanged} className="edit-photo-modal-button edit-photo-button-yes">
                            Submit
                        </button>
                        <button type="button" onClick={closeModal} className="edit-photo-modal-button edit-photo-button-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPhotoModal;