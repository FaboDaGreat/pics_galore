import { csrfFetch } from "./csrf";


// ----- ACTION TYPE -----
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_BY_ID = "spots/getSpotById";
const CREATE_SPOT = "spots/createSpot"
const MANAGE_SPOTS = "spots/manageSpots"

// ------- ACTION CREATOR ---------
const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
};

const getSpotById = (spot) => {
    return {
      type: GET_SPOT_BY_ID,
      payload: spot,
    };
  };

  const createSpot = (spot) => {
    return {
      type: CREATE_SPOT,
      payload: spot,
    };
  };

  const manageSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
};
  



// ----- THUNK ------
export const getAllSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/spots/"); 
        
        if(res.ok){
            
            const data = await res.json();
            
            dispatch(getAllSpots(data));
        } else {
            throw res;
        }

    } catch (error) {
        
        return error;
    }

}

export const getSpotByIdThunk = (id) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/spots/${id}`);
      if (res.ok) {
        const data = await res.json();
        dispatch(getSpotById(data));
      } else {
        throw res;
      }
    } catch (error) {
      return error;
    }
};

export const createSpotThunk = (spot) => async (dispatch) => {
    
        const { address, city, state, country, lat, lng, name, description, price, url } = spot;
        const res = await csrfFetch("/api/spots/", {
            method: "POST",
            body: JSON.stringify({
                address, 
                city, 
                state, 
                country, 
                lat, 
                lng, 
                name, 
                description, 
                price,
                url
            })
        }); 
        
        if(res.ok){
            
            const data = await res.json();
            
            dispatch(createSpot(data));

            return data
        } else {
            throw res;
        }

    

}

export const manageSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/spots/current")

        if (res.ok) {
            const data = await res.json();
            dispatch(manageSpots(data))
        } else {
            throw res;
        }
    } catch (error) {
        return error
    }
}

  


    
// ------ REDUCER -------
const initialState = {
    allSpots: [],
    byId: {}
};

function spotsReducer (state = initialState, action){
    let newState; 
    let spots;
    let newById = {};

    switch(action.type){
        case GET_ALL_SPOTS:
                newState = {...state};
                
                spots = action.payload.Spots
                
                newState.allSpots = spots; 

                
                
                for(let spot of spots){
                    newById[spot.id] = spot; 
                }
                newState.byId = newById; 

                
            return newState;


        case GET_SPOT_BY_ID:
                newState = { ...state };
                newState.byId = { ...state.byId, [action.payload.id]: action.payload };
                return newState;


        case CREATE_SPOT:
                newState = { ...state};

                newState.allSpots = action.payload;
                newState.byId = { [action.payload.id]: action.payload };
            
                return newState;


        case MANAGE_SPOTS:

        newState = {...state};
                
                spots = action.payload.Spots
                
                newState.allSpots = spots; 

                
                
                for(let spot of spots){
                    newById[spot.id] = spot; 
                }
                newState.byId = newById; 

                
            return newState;


          

        default:
            return state;
    }
}

export default spotsReducer;
