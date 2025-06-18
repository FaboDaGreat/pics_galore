import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosThunk } from "../../store/photos";
import './Splash.css'
import { useNavigate } from "react-router-dom";

const Splash = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const photos = useSelector((state) => state.photosReducer.allPhotos);
  const sortedPhotos = photos.sort((a, b) => b.id - a.id)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const getAllPhotos = async () => {
      await dispatch(getAllPhotosThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getAllPhotos();
    }

  }, [isLoaded, dispatch])

  const goToPhotoPage = (e, photo) => {
    e.preventDefault();
    navigate(`/photos/${photo.id}`)
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>
  } else {
    return (
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

    )
  }


}


export default Splash