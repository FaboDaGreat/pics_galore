import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByUserThunk } from "../../store/photos";

const ProfilePage = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photosReducer.allPhotos);
    const sortedPhotos = photos.sort((a, b) => b.id - a.id);
    const user = useSelector((state) => state.session.user);
    
    useEffect(() => {
    
        const getMyPhotos = async () => {
          await dispatch(getPhotosByUserThunk(user.id));
          setIsLoaded(true);
        }
    
        if (!isLoaded) {
          getMyPhotos();
        }
    
      }, [isLoaded, dispatch, user.id])
    
      if (!isLoaded) {
        return <h1>Loading...</h1>
      } else {
        return (
          <div>
            <h1>My Profile!</h1>
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

export default ProfilePage