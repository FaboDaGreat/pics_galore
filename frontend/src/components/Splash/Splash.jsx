import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosThunk } from "../../store/photos";
import { useNavigate } from "react-router-dom";
import './Splash.css';

const Splash = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photosReducer.allPhotos);
  const photoArr = photos ? Object.values(photos) : [];
  const sortedPhotos = photoArr.toSorted((a, b) => b.id - a.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const getAllPhotos = async () => {
      await dispatch(getAllPhotosThunk());
      setIsLoaded(true);
    }

    getAllPhotos();

  }, [isLoaded, dispatch])

  const goToPhotoPage = (e, photo) => {
    e.preventDefault();
    navigate(`/photos/${photo.id}`);
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="welcome-banner-container">
        {user ? (
          <h1>{`Welcome back, ${user.firstName} ${user.lastName}!`}</h1>
        ) : (
          <h1>Welcome to PicsGalore!</h1>
        )}
      </div>
      <div className="all-images-container">
        {
          sortedPhotos.map((photo, idx) => (
            <img
              onClick={(e) => goToPhotoPage(e, photo)}
              className="post-image"
              src={photo.url}
              key={`${idx}-${photo.id}`}
            />
          ))
        }
      </div>
    </>

  )
};


export default Splash;