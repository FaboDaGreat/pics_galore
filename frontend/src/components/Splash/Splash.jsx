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
        <div>
          {
            sortedPhotos.map((photo, idx) => (
              <div key={`${idx}-${photo.id}`}>
                <img src={photo.url} />
              </div>
            ))
          }
        </div>
      </div>

    )
  }


}


export default Splash