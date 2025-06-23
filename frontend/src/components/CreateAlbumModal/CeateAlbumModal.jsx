import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbumThunk, getAlbumsByUserThunk } from '../../store/albums';
import { useModal } from '../../context/Modal';
import './CreateAlbumModal.css'

const CreateAlbumModal = () => {
    
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault();

    const albumData = {
            title,
            description
        };

    try {
        const newAlbum = await dispatch(createAlbumThunk(albumData));
        if (newAlbum.id) {
            await dispatch(getAlbumsByUserThunk(user.id))
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
    <div className="create-album-modal">
        <h1 className='create-album-title'>Make a New Album!</h1>
            <form onSubmit={handleSubmit}>
          <div className="album-form">
                    {errors.message && <h2 className="error-message">{errors.message}</h2>}
                    <label>
                        Title Your Album
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
                        Add a Description
                        {errors.description && <p className="error-message">{errors.description}</p>}
                        <textarea
                            className="album-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a good a description for your album (optional)"
                        />
                    </label>
                </div>
                <button type="submit" className="new-album-submit-button">
                    Create Album
                </button>
            </form>
        </div>
    );
}


export default CreateAlbumModal