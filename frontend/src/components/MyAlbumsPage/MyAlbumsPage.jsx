import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAlbumsByUserThunk } from "../../store/albums";
import { useNavigate } from "react-router-dom";
import './MyAlbumsPage.css'

const MyAlbumsPage = () => {
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    if (!user) {
        return <h1>Please log in to view your profile.</h1>
    }

  const getMyAlbums = async () => {
            await dispatch(getAlbumsByUserThunk(user.id));
            setIsLoaded(true);
        }

        if (!isLoaded) {
        getMyAlbums();
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }
    
    const openAlbum = (album, e) => {
        e.preventDefault();
        navigate(`/albums/${album.id}`)
    }
    
    return (
        <>
        <div className="profile-header">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <h3>{user.username}</h3>
            </div>
        {albums.length === 0 ? (
                <div>
                    <h2>You don&apos;t have any albums yet</h2>
                    <button className="upload-photo-button">
                        Create Your First Album!
                    </button>
                </div>
            ) : (
                <div className="all-albums-container">
                    {
                        albums.map((album, idx) => (
                            <div key={idx}>
                           <img
                                className="cover-photo"
                                src={album.coverPhoto}
                                key={`${idx}-${album.id}`}
                                onClick={(e) => openAlbum(album, e)}
                            />
                            <div>{album.title}</div>
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    )
}

export default MyAlbumsPage;