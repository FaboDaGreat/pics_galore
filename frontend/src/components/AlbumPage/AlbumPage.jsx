import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumByIdThunk } from "../../store/albums";
import { getPhotosByAlbumThunk } from "../../store/photos";
import { useState } from "react";
import './AlbumPage.css'

const AlbumPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const album = useSelector((state) => state.albumsReducer.byId[id])
    const photos = useSelector((state) => state.photosReducer.allAlbums);
    const [isLoaded, setIsLoaded] = useState(false);

    const getAlbumPhotos = async () => {
        await dispatch(getPhotosByAlbumThunk(id));
        setIsLoaded(true);
    }

    const getAlbumDetails = async () => {
        await dispatch(getAlbumByIdThunk(id));
    }

    if(!isLoaded) {
        getAlbumDetails();
        getAlbumPhotos();
    }

    const goToPhotoPage = (e, photo) => {
        e.preventDefault();
        navigate(`/photos/${photo.id}`)
    }

    if(!isLoaded){
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div className="profile-header">
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <h3>{user.username}</h3>
            </div>
            <h1 className="album-title">
                {album.title}
            </h1>
            <strong>by YOU!</strong>
            <p className="album-description">{album.description}</p>
            <div>{`${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`}</div>
            {photos.length === 0 ? (
                <div>
                    <h2>You don&apos;t have any photos in this album yet</h2>
                </div>
            ) : (
                <div className="all-images-container">
                    {
                        photos.map((photo, idx) => (
                            <img
                                onClick={(e) => goToPhotoPage(e, photo)}
                                className="album-images"
                                src={photo.url}
                                key={`${idx}-${photo.id}`}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default AlbumPage;