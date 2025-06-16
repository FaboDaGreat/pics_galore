import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByUserThunk } from "../../store/photos";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photos = useSelector((state) => state.photosReducer.allPhotos);
    const sortedPhotos = photos.sort((a, b) => b.id - a.id);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    if (!user) {
        return <h1>Please log in to view your profile.</h1>
    }

    const getMyPhotos = async () => {
        await dispatch(getPhotosByUserThunk(user.id));
        setIsLoaded(true)
    }

    const uploadPhotoPage = (e) => {
        e.preventDefault();
        navigate("/photos/upload");
    };

    if (!isLoaded) {
        getMyPhotos();
    }

    return (
        <div>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            {sortedPhotos.length === 0 ? (
                <div>
                    <h2>You don&apos;t have any posts yet</h2>
                    <button className="upload-photo-button" onClick={(e) => uploadPhotoPage(e)} >
                        Upload Photo
                    </button>
                </div>
            ) : (
                <div className="all-images-container">
                    {
                        sortedPhotos.map((photo, idx) => (
                            <img
                                className="post-image"
                                src={photo.url}
                                key={`${idx}-${photo.id}`}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
}



export default ProfilePage