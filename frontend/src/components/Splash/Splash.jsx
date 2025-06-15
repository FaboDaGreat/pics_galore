import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosThunk } from "../../store/photos";
import './Splash.css'

const Splash = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const photos = useSelector((state) => state.photosReducer.allPhotos);
  const sortedPhotos = photos.sort((a, b) => b.id - a.id)
  const dispatch = useDispatch();

  useEffect(() => {

    const getAllPhotos = async () => {
      await dispatch(getAllPhotosThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getAllPhotos();
    }

  }, [isLoaded, dispatch])

  if (!isLoaded) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <h1>Welcome!</h1>
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
      </div>

    )
  }


}


export default Splash