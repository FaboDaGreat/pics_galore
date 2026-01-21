import { csrfFetch } from "./csrf";


// ----- ACTION TYPE -----
const GET_ALL_PHOTOS = "photos/getAllPhotos";
const GET_PHOTO_BY_ID = "photos/getPhotoById";
const CREATE_PHOTO = "photos/createPhoto";
const EDIT_PHOTO = "photos/editPhoto";
const DELETE_PHOTO = "photos/deletePhoto"
const GET_PHOTOS_BY_USER = "photos/getPhotosByUser"

// ------- ACTION CREATOR ---------
const getAllPhotos = (photos) => {
  return {
    type: GET_ALL_PHOTOS,
    payload: photos
  }
};

const getPhotoById = (photo) => {
  return {
    type: GET_PHOTO_BY_ID,
    payload: photo,
  };
};

const createPhoto = (photo) => {
  return {
    type: CREATE_PHOTO,
    payload: photo,
  };
};

const editPhoto = (photo) => {
  return {
    type: EDIT_PHOTO,
    payload: photo,
  };
};

const deletePhoto = (photoId) => {
  return {
    type: DELETE_PHOTO,
    payload: photoId,
  };
};

const getPhotosByUser = (photos) => {
  return {
    type: GET_PHOTOS_BY_USER,
    payload: photos
  }
};




// ----- THUNK ------
export const getAllPhotosThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/photos/");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllPhotos(data));
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }

}

export const getPhotoByIdThunk = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/photos/${id}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getPhotoById(data));
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
};

export const createPhotoThunk = (photo) => async (dispatch) => {

  const { image, title, description, albumTitle } = photo;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("albumTitle", albumTitle);

  const res = await csrfFetch("/api/photos", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });


  if (res.ok) {
    const data = await res.json();
    dispatch(createPhoto(data));
    return data
  } else {
    throw res;
  }

}

export const editPhotoThunk = (id, update) => async (dispatch) => {
  const { title, description, albumTitle } = update;
  const res = await csrfFetch(`/api/photos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      albumTitle
    })
  });


  if (res.ok) {
    const data = await res.json();
    dispatch(editPhoto(data));
    return data;
  } else {
    throw res;
  }



}

export const deletePhotoThunk = (id) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/photos/${id}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      dispatch(deletePhoto(id));
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error
  }
}


export const getPhotosByUserThunk = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/photos/users/${id}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getPhotosByUser(data));
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
};



// ------ REDUCER -------
const initialState = {
  allPhotos: [],
  byId: {}
};

function photosReducer(state = initialState, action) {
  let newState;
  let photos;
  let newById = {};

  switch (action.type) {
    case GET_ALL_PHOTOS:
      newState = { ...state };

      photos = action.payload

      newState.allPhotos = photos;



      for (let photo of photos) {
        newById[photo.id] = photo;
      }
      newState.byId = newById;


      return newState;


    case GET_PHOTO_BY_ID:
      newState = { ...state };
      newState.byId = { ...state.byId, [action.payload.id]: action.payload };
      return newState;


    case CREATE_PHOTO:
      newState = { ...state };

      newState.allPhotos = [...state.allPhotos, action.payload];
      newState.byId = { [action.payload.id]: action.payload };

      return newState;


    case EDIT_PHOTO:
      newState = { ...state };

      newState.byId = { ...state.byId, [action.payload.id]: action.payload };
      newState.allPhotos = state.allPhotos.map(photo =>
        photo.id === action.payload.id
          ? action.payload
          : photo
      );

      return newState;


    case GET_PHOTOS_BY_USER:

      newState = { ...state };

      photos = action.payload

      newState.allPhotos = photos;



      for (let photo of photos) {
        newById[photo.id] = photo;
      }
      newState.byId = newById;


      return newState;


    case DELETE_PHOTO:

      newState = { ...state };
      newState.byId = { ...state.byId };
      delete newState.byId[action.payload];
      newState.allPhotos = state.allPhotos.filter(photo => photo.id !== action.payload);
      return newState;





    default:
      return state;
  }
}

export default photosReducer;
