import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAlbumsByUserThunk } from "../../store/albums";
import { useNavigate } from "react-router-dom";
import CreateAlbumModal from "../CreateAlbumModal";
import OpenModalButton from "../OpenModalButton";
import './MyAlbumsPage.css'

const MyAlbumsPage = () => {
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);
    const albumArr = albums ? Object.values(albums) : [];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {

        const getMyAlbums = async () => {
            await dispatch(getAlbumsByUserThunk(user.id));
            setIsLoaded(true);
        }

        getMyAlbums();

    }, [isLoaded, dispatch, user])

    if (!user) {
        return <div className="no-albums-container"><h1>Please log in to view your profile.</h1></div>
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
            <div className="my-albums-top-section">
                <div className="profile-info">
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <h3>{`@${user.username}`}</h3>
                </div>
                <div className="my-albums-top-middle">
                    <h1>My Albums</h1>
                </div>
                <div className="my-albums-top-right">
                    <OpenModalButton
                        buttonText="Create a New Album"
                        className={"create-album-button"}
                        onModalClose={null}
                        modalComponent={<CreateAlbumModal navigate={navigate} />}
                    />
                </div>
            </div>
            {albums.length === 0 ? (
                <div className="no-albums-container">
                    <h2>You don&apos;t have any albums yet</h2>
                    <OpenModalButton
                        buttonText="Make Your First Album!"
                        className={"create-album-button"}
                        onModalClose={null}
                        modalComponent={<CreateAlbumModal navigate={navigate} />}
                    />
                </div>
            ) : (
                <div className="all-albums-container">
                    {
                        albumArr.map((album, idx) => (
                            <div key={idx}>
                                <img
                                    className="cover-photo"
                                    src={album.coverPhoto}
                                    key={`${idx}-${album.id}`}
                                    onClick={(e) => openAlbum(album, e)}
                                />
                                <strong>{album.title}</strong>
                                <div>{`${album.photoCount} ${album.photoCount === 1 ? 'photo' : 'photos'}`}</div>
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    )
}

export default MyAlbumsPage;