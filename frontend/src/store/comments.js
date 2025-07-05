import { csrfFetch } from "./csrf";


// ----- ACTION TYPE -----
const CREATE_COMMENT = "comments/createComment";
const EDIT_COMMENT = "comments/editComment";
const DELETE_COMMENT = "comments/deleteComment";

// ------- ACTION CREATOR ---------
const createComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    payload: comment,
  };
};

const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  };
};

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: commentId,
  };
};




// ----- THUNK ------
export const createCommentThunk = (newComment) => async (dispatch) => {

  const { comment } = newComment;
  const res = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      comment
    })
  })


  if (res.ok) {
    const data = await res.json();
    dispatch(createComment(data));
    return data
  } else {
    throw res;
  }

}

export const editCommentThunk = (update) => async (dispatch) => {
const { id, comment } = update;
const res = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment
    })
  });


  if (res.ok) {
    const data = await res.json();
    dispatch(editComment(update));
    return data;
  } else {
    throw res;
  }



}

export const deleteCommentThunk = (id) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/comments/${id}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      dispatch(deleteComment(id));
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error
  }
}





// ------ REDUCER -------
const initialState = {
  allComments: [],
  byId: {}
};

function commentsReducer(state = initialState, action) {
  let newState;
  let update;
  let i;

  switch (action.type) {
    case CREATE_COMMENT:
      newState = { ...state };

      newState.allComments = action.payload;
      newState.byId = { [action.payload.id]: action.payload };

      return newState;


    case EDIT_COMMENT:
      newState = { ...state };

      update = action.payload;
      i = state.allComments.findIndex(a => a.id === update.id);

      newState.byId = { ...state.byId, [action.payload.id]: action.payload };
      newState.allComments[i] = update;

      return newState;


    case DELETE_COMMENT:

      newState = { ...state };
      newState.byId = { ...state.byId };
      delete newState.byId[action.payload];
      newState.allComments = state.allComments.filter(comment => comment.id !== action.payload);
      return newState;





    default:
      return state;
  }
}

export default commentsReducer;