import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumByIdThunk } from "../../store/albums";
import { getPhotosByAlbumThunk } from "../../store/photos";
import { useState } from "react";
import EditAlbumModal from "../EditAlbumModal";
import OpenModalButton from "../OpenModalButton";
import DeleteAlbumModal from "../DeleteAlbumModal";
import AddPhotoModal from "../AddPhotoModal/AddPhotoModal";
import './AlbumPage.css'

const AlbumPage = () => {
    const { id } = useParams();
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

    if (!isLoaded) {
        getAlbumDetails();
        getAlbumPhotos();
    }

    const goToPhotoPage = (e, photo) => {
        e.preventDefault();
        navigate(`/photos/${photo.id}`);
    }

    const leaveAlbum = () => {
        navigate('/my-profile/albums');
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div className="profile-info">
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <h3>{user.username}</h3>
            </div>
            <div className="album-page-buttons">
                <OpenModalButton
                    buttonText="Edit Album"
                    className={"edit-album-button"}
                    onModalClose={null}
                    modalComponent={<EditAlbumModal album={album} />}
                />
                <OpenModalButton
                    buttonText="Delete Album"
                    className={"delete-album-button"}
                    onModalClose={null}
                    modalComponent={<DeleteAlbumModal albumId={(album)} leaveAlbum={leaveAlbum} />}
                />
            </div>
            <div className="profile-header">
                <h1 className="album-title">
                    {album.title}
                </h1>
                <strong>by YOU!</strong>
                <p className="album-description">{album.description}</p>
                <div>{`${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`}</div>
            </div>
            <OpenModalButton
                    buttonText="Upload Photo to Album"
                    className={"upload-photo-button"}
                    onModalClose={null}
                    modalComponent={<AddPhotoModal album={(album)} />}
                />
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