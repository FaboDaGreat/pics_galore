import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAlbumThunk, getAlbumByIdThunk } from '../../store/albums';
import { useModal } from '../../context/Modal';
import './EditAlbumModal.css'

const EditAlbumModal = ({ album }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(album.title || '');
    const [description, setDescription] = useState(album.description || '');
    const [errors, setErrors] = useState('')
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        setTitle(album.title || '');
        setDescription(album.description || '');
    }, [album]);

    useEffect(() => {
        const changed =
            title !== album.title ||
            description !== album.description;
        setHasChanged(changed);
    }, [title, description, album.title, album.description]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const albumData = {
            id: album.id,
            title,
            description
        };


        try {
            const editedAlbum = await dispatch(editAlbumThunk(albumData));
            if (editedAlbum.id) {
                await dispatch(getAlbumByIdThunk(editedAlbum.id));
                closeModal();
            }
        } catch (res) {
            const data = await res.json();

            if (data && data.errors) {
                setErrors(data.errors)
            }
        }
    }

    return (
        <div className="edit-album-modal">
            <h1 className='edit-album-title'>Edit Album</h1>
            <form onSubmit={handleSubmit}>
                <div className="album-form">
                    {errors.message && <h2 className="error-message">{errors.message}</h2>}
                    <label>
                        Title
                        {errors.title && <p className="error-message">{errors.title}</p>}
                        <input
                            type="text"
                            className="album-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the title of your album"
                        />
                    </label>
                    <label>
                        Description
                        {errors.description && <p className="error-message">{errors.description}</p>}
                        <textarea
                            className="album-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a good a description for your album (optional)"
                        />
                    </label>
                </div>
                <div className="edit-album-modal-buttons">
                    <button type="submit" disabled={!hasChanged} className="edit-album-modal-button edit-album-button-yes">
                        Update Album
                    </button>
                    <button type="button" onClick={closeModal} className="edit-album-modal-button edit-album-button-cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAlbumModal;