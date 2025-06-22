import { csrfFetch } from "./csrf";


// ----- ACTION TYPE -----
const GET_ALBUM_BY_ID = "albums/getAlbumById";
const CREATE_ALBUM = "albums/createAlbum";
const EDIT_ALBUM = "albums/editAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";
const GET_ALBUMS_BY_USER = "albums/getAlbumsByUser";

// ------- ACTION CREATOR ---------
const getAlbumById = (album) => {
  return {
    type: GET_ALBUM_BY_ID,
    payload: album,
  };
};

const createAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    payload: album,
  };
};

const editAlbum = (album) => {
  return {
    type: EDIT_ALBUM,
    payload: album,
  };
};

const deleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    payload: albumId,
  };
};

const getAlbumsByUser = (albums) => {
  return {
    type: GET_ALBUMS_BY_USER,
    payload: albums
  }
}




// ----- THUNK ------
export const getAlbumByIdThunk = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/albums/${id}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAlbumById(data));
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
};

export const createAlbumThunk = (photo) => async (dispatch) => {

  const { title, description } = photo;
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    body: JSON.stringify({
      title, description
    })
  })


  if (res.ok) {
    const data = await res.json();
    dispatch(createAlbum(data));
    return data
  } else {
    throw res;
  }

}

export const editAlbumThunk = (id, update) => async (dispatch) => {
const { title, description } = update;
const res = await csrfFetch(`/api/photos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description
    })
  });


  if (res.ok) {
    const data = await res.json();
    dispatch(editAlbum(update));
    return data;
  } else {
    throw res;
  }



}

export const deleteAlbumThunk = (id) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/photos/${id}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      dispatch(deleteAlbum(id));
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error
  }
}


export const getAlbumsByUserThunk = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/albums/users/${id}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAlbumsByUser(data));
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
};





// ------ REDUCER -------
const initialState = {
  allAlbums: [],
  byId: {}
};

function albumsReducer(state = initialState, action) {
  let newState;
  let albums;
  let newById = {};
  let update;
  let i;

  switch (action.type) {
    case GET_ALBUM_BY_ID:
      newState = { ...state };
      newState.byId = { ...state.byId, [action.payload.id]: action.payload };
      return newState;


    case CREATE_ALBUM:
      newState = { ...state };

      newState.allAlbums = action.payload;
      newState.byId = { [action.payload.id]: action.payload };

      return newState;


    case EDIT_ALBUM:
      newState = { ...state };

      update = action.payload;
      i = state.allPhotos.findIndex(a => a.id === update.id);

      newState.byId = { ...state.byId, [action.payload.id]: action.payload };
      newState.allAlbums[i] = update;

      return newState;


    case GET_ALBUMS_BY_USER:

      newState = { ...state };

      albums = action.payload

      newState.allAlbums = albums;



      for (let album of albums) {
        newById[album.id] = album;
      }
      newState.byId = newById;


      return newState;

      


    case DELETE_ALBUM:

      newState = { ...state };
      newState.byId = { ...state.byId };
      delete newState.byId[action.payload];
      newState.allAlbums = state.allAlbums.filter(album => album.id !== action.payload);
      return newState;





    default:
      return state;
  }
}

export default albumsReducer;
