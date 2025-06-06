import { csrfFetch } from "./csrf";


// ----- ACTION TYPE -----
const CREATE_REVIEW = "reviews/createReview";

// ------- ACTION CREATOR ---------
const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

// ----- THUNK ------
export const createReviewThunk = (spotId, reviewData) => async (dispatch) => {

    const { review, stars} = reviewData;
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        })
    });

    if(res.ok){
        const data = await res.json();
        dispatch(createReview(data));
        return data
    } else {
        throw res;
    }
}
 
// ------ REDUCER -------
const initialState = {
    allReviews: []
};

function reviewsReducer (state = initialState, action){
    let newState;

    switch(action.type){
        case CREATE_REVIEW:
            newState = {...state};
            newState.allReviews = action.payload;

            return newState;


    default:
        return state;
    }
}

export default reviewsReducer;