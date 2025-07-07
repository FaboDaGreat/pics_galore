import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByUserThunk } from "../../store/photos";
import { useNavigate } from "react-router-dom";
import './MyPhotosPage.css';

const MyPhotosPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photos = useSelector((state) => state.photosReducer.allPhotos);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        const getMyPhotos = async () => {
            await dispatch(getPhotosByUserThunk(user.id));
            setIsLoaded(true);
        }
       if (!isLoaded && user) {
            getMyPhotos();
        }
    }, [dispatch, user, isLoaded]);

    const filteredPhotos = useMemo(() => {
        const photoArr = photos ? Object.values(photos) : [];
        const validPhotos = photoArr.filter(p => p && p.id);
        return validPhotos
    }, [photos]);


    if (!user) {
        return <div className="no-photos-box"><h1>Please log in to view your profile.</h1></div>;
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    const uploadPhotoPage = (e) => {
        e.preventDefault();
        navigate("/photos/upload");
    };

    const goToPhotoPage = (e, photo) => {
        e.preventDefault();
        navigate(`/photos/${photo.id}`);
    };

    return (
        <div>
            <div className="photos-top-section">
                <div className="profile-info">
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <h3>{user.username}</h3>
                </div>
                <h1 className="photos-top-middle">My Photos</h1>
            </div>
            {filteredPhotos.length === 0 ? (
                <div>
                    <div className="no-photos-box">
                        <h2>You don&apos;t have any posts yet</h2>
                        <button className="upload-photo-button" onClick={uploadPhotoPage}>
                            Upload Your First Photo!
                        </button>
                    </div>
                </div>
            ) : (
                <div className="all-images-container">
                    {filteredPhotos.map((photo, idx) => (
                        <img
                            onClick={(e) => goToPhotoPage(e, photo)}
                            className="my-images"
                            src={photo.url}
                            key={`${idx}-${photo.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPhotosPage;