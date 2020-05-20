import { setCurrentNode } from './nodes.js'
import { fetchPut, fetchGet, fetchPost, fetchDelete } from '../fetch'
import {
  RERENDER_GRAPH,
  ADVENTURE_ERROR,
  ADVENTURE_REQUEST,
  GET_ADVENTURE_SUCCESS,
  EDIT_ADVENTURE_SUCCESS,
  DELETE_ADVENTURE_SUCCESS,
  CREATE_ADVENTURE_SUCCESS,
  GET_ALL_ADVENTURES_SUCCESS,
  CLEAR_CURRENT_ADVENTURE,
  TOGGLE_ADVENTURE_EDITING,
  TOGGLE_ANALYTICS_DISPLAY,
  TOGGLE_ADVENTURE_DELETING,
} from '../constants/adventure'

// helper function that gets the head node from newadventure object
function getHeadNodefromAdventure(adventure) {
  const headNode = adventure.head;
  return headNode
}

export const adventureError = error => ({
  type: ADVENTURE_ERROR,
  error
});

export const adventureRequest = () => ({
  type: ADVENTURE_REQUEST,
});

export const reRenderGraph = () => ({
  type: RERENDER_GRAPH,
});

export const toggleAdventureDeleting = () => ({
  type: TOGGLE_ADVENTURE_DELETING
});

export const clearCurrentAdventure = () => ({
  type: CLEAR_CURRENT_ADVENTURE
})

export const toggleAdventureEditing = () => ({
  type: TOGGLE_ADVENTURE_EDITING
});

export const toggleAnalyticsDisplay = () => ({
  type: TOGGLE_ANALYTICS_DISPLAY
})

export const adventureSuccess = (currentAdventure) => ({
  type: CREATE_ADVENTURE_SUCCESS,
  currentAdventure
});

export const getAdventureSuccess = (currentAdventure) => {
  return ({
    type: GET_ADVENTURE_SUCCESS,
    currentAdventure
  })
};

export const editAdventureSuccess = (currentAdventure) => ({
  type: EDIT_ADVENTURE_SUCCESS,
  currentAdventure
});

export const getAllAdventuresSuccess = adventures => ({
  type: GET_ALL_ADVENTURES_SUCCESS,
  adventures
});

export const deleteAdventureSuccess = (adventureId) => ({
  type: DELETE_ADVENTURE_SUCCESS,
  adventureId
});

export const getAdventureById = adventureId => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest());
    const { authToken } = getState().auth;
    const res = await fetchGet(authToken, `adventure/${adventureId}`)
    if (getHeadNodefromAdventure(res)) {
      dispatch(setCurrentNode(res.head))
    }

    dispatch(getAdventureSuccess(res))
  }
  catch (error) {
    dispatch(adventureError(error))
  };
}

// get updated version of adventure from db
export const updateAdventureById = adventureId => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest());
    const { authToken } = getState().auth;
    const res = await fetchGet(authToken, `adventure/${adventureId}`)

    dispatch(getAdventureSuccess(res))
    return res
  }
  catch (error) {
    dispatch(adventureError(error))
  }
}

export const createAdventure = adventure => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest());
    const { authToken } = getState().auth;
    const res = await fetchPost(authToken, 'adventure/', adventure)
    dispatch(adventureSuccess(res))
  }
  catch (error) {
    dispatch(adventureError(error))
  };
};

export const getAllAdventures = () => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest());
    const { authToken } = getState().auth;
    const res = await fetchGet(authToken, 'adventure/')
    dispatch(getAllAdventuresSuccess(res))
  }
  catch (error) {
    dispatch(adventureError(error))
  }
};

export const deleteAdventure = adventureId => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest())
    const { authToken } = getState().auth;
    await fetchDelete(authToken, `adventure/${adventureId}/`)

    dispatch(deleteAdventureSuccess())
  }
  catch (err) {
    dispatch(adventureError(err))
  }
};

export const editAdventure = adventure => async (dispatch, getState) => {
  try {
    dispatch(adventureRequest());
    const { id } = getState().adventure.currentAdventure;
    const { authToken } = getState().auth;
    const res = await fetchPut(authToken, `adventure/${id}`, adventure)

    dispatch(setCurrentNode(getHeadNodefromAdventure(res)))
    dispatch(toggleAdventureEditing())
    dispatch(editAdventureSuccess(res))
  }
  catch (error) {
    dispatch(adventureError(error))
  };
};

