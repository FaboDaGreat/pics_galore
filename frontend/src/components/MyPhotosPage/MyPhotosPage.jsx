import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByUserThunk } from "../../store/photos";
import { useNavigate } from "react-router-dom";
import './MyPhotosPage.css'

const MyPhotosPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photos = useSelector((state) => state.photosReducer.allPhotos);
    const photoArr = photos ? Object.values(photos) : [];
    const sortedPhotos = photoArr.sort((a, b) => b.id - a.id);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    if (!user) {
        return <h1>Please log in to view your profile.</h1>
    }

    
    const getMyPhotos = async () => {
        await dispatch(getPhotosByUserThunk(user.id));
        setIsLoaded(true);
    }

    if (!isLoaded) {
        getMyPhotos();
    }

    const uploadPhotoPage = (e) => {
        e.preventDefault();
        navigate("/photos/upload");
    };

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
            {sortedPhotos.length === 0 ? (
                <div>
                    <h2>You don&apos;t have any posts yet</h2>
                    <button className="upload-photo-button" onClick={(e) => uploadPhotoPage(e)} >
                        Upload Your First Photo!
                    </button>
                </div>
            ) : (
                <div className="all-images-container">
                    {
                        sortedPhotos.map((photo, idx) => (
                            <img
                                onClick={(e) => goToPhotoPage(e, photo)}
                                className="my-images"
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



export default MyPhotosPage