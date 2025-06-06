import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailsCard from "./DetailsCard";
import { getSpotByIdThunk } from "../../store/spots";

const SpotDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spot = useSelector((state) => state.spotsReducer.byId[id]);

    useEffect(() => {

        const getSpotById = async () => {

            await dispatch(getSpotByIdThunk(id))
            setIsLoaded(true);
            
        }
        
        if (!isLoaded) {
            getSpotById();
        }
    }, [isLoaded, dispatch, id]);


    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {
        return (
                <DetailsCard spot={spot} />
        );
    }

};

export default SpotDetailsPage;

