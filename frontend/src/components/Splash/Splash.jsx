import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotCard";
import './Splash.css'
import { useNavigate } from "react-router-dom";

const Splash = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const spots = useSelector((state) => state.spotsReducer.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    const getAllSpots = async () => {

      await dispatch(getAllSpotsThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getAllSpots()
    }

  }, [isLoaded, dispatch])

  const spotDetails = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <h1>Welcome!</h1>
        <div className="cardListContainer">
          {
            spots.map((spot, idx) => (
              <div className="cardContainer" title={spot.name} key={`${idx}-${spot.id}`}
                onClick={(e) => spotDetails(e, spot)}>
                <SpotCard spot={spot} />
              </div>))
          }
        </div>
      </div>
    )
  }


}


export default Splash