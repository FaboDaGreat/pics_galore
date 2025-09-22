import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumByIdThunk } from "../../store/albums";
import { useEffect, useState } from "react";
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
    const photos = album?.Photos;
    const photoArr = photos ? Object.values(photos) : [];
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        const getAlbumDetails = async () => {
            await dispatch(getAlbumByIdThunk(id));
            setIsLoaded(true);
        }

        getAlbumDetails();

    }, [isLoaded, dispatch, id])

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

    if (!album) {
        return <div className="no-photos-container"><h1>Album does not exist</h1></div>;
    }

    if (!user) {
        return <div className="no-photos-container"><h1>Please log in!</h1></div>
    }

    if (album.userId !== user.id) {
        return <div className="no-photos-container"><h1>Unauthorized!</h1></div>
    }

    return (
        <div>
            <div className="album-top-section">
                <div className="album-top-left">
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <h3>{`@${user.username}`}</h3>
                </div>
                <div className="album-top-middle">
                    <div className="profile-header">
                        <h1 className="album-title">
                            {album.title}
                        </h1>
                        <strong>by YOU!</strong>
                        <p className="album-description">{album.description}</p>
                        <div>{`${photoArr.length} ${photoArr.length === 1 ? 'photo' : 'photos'}`}</div>
                    </div>
                </div>
                <div className="album-top-right">
                    <OpenModalButton
                        buttonText="Upload Photo to Album"
                        className={"album-buttons"}
                        modalComponent={<AddPhotoModal album={(album)} />}
                    />
                    <OpenModalButton
                        buttonText="Edit Album"
                        className={"album-buttons"}
                        modalComponent={<EditAlbumModal album={album} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Album"
                        className={"album-buttons"}
                        modalComponent={<DeleteAlbumModal albumId={album.id} leaveAlbum={leaveAlbum} />}
                    />
                </div>
            </div>
            {photoArr.length === 0 ? (
                <div className="no-photos-container">
                    <h2 className="no-photo-message">You don&apos;t have any photos in this album yet</h2>
                </div>
            ) : (
                <div className="all-images-container">
                    {
                        photoArr.map((photo, idx) => (
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