import { fetchGet, fetchPost } from '../fetch'
import {
  STUDENT_END_TUTORIAL,
  END_STUDENT_ADVENTURE,
  STUDENT_NEXT_TUTORIAL,
  STUDENT_START_TUTORIAL,
  GET_STUDENT_SEARCH_ERROR,
  RESTART_STUDENT_ADVENTURE,
  STUDENT_PREVIOUS_TUTORIAL,
  GET_STUDENT_SEARCH_REQUEST,
  GET_STUDENT_SEARCH_SUCCESS,
  GET_STUDENT_ADVENTURE_ERROR,
  GET_STUDENT_CURRENTNODE_ERROR,
  GET_STUDENT_ADVENTURE_SUCCESS,
  GET_STUDENT_ADVENTURE_REQUEST,
  GET_STUDENT_CURRENTNODE_REQUEST,
  GET_STUDENT_CURRENTNODE_SUCCESS,
} from './constants'

export const getStudentAdventureRequest = () => ({
  type: GET_STUDENT_ADVENTURE_REQUEST,
})

export const getStudentAdventureSuccess = (adventure) => ({
  type: GET_STUDENT_ADVENTURE_SUCCESS,
  adventure,
})

export const getStudentAdventureError = (error) => ({
  type: GET_STUDENT_ADVENTURE_ERROR,
  error,
})

export const endStudentAdventure = () => ({
  type: END_STUDENT_ADVENTURE,
})

export const getStudentCurrentNodeRequest = () => ({
  type: GET_STUDENT_CURRENTNODE_REQUEST,
})

export const getStudentCurrentNodeSuccess = (node) => ({
  type: GET_STUDENT_CURRENTNODE_SUCCESS,
  node,
})

export const getStudentCurrentNodeError = (error) => ({
  type: GET_STUDENT_CURRENTNODE_ERROR,
  error,
})

export const restartStudentAdventure = () => ({
  type: RESTART_STUDENT_ADVENTURE,
})

export const getStudentSearchRequest = () => ({
  type: GET_STUDENT_SEARCH_REQUEST,
})

export const getStudentSearchSuccess = (results) => ({
  type: GET_STUDENT_SEARCH_SUCCESS,
  results,
})

export const getStudentSearchError = (error) => ({
  type: GET_STUDENT_SEARCH_ERROR,
  error,
})

export const studentStartTutorial = () => ({
  type: STUDENT_START_TUTORIAL,
})

export const studentNextTutorial = (tutorialPageNumber) => ({
  type: STUDENT_NEXT_TUTORIAL,
  tutorialPageNumber,
})

export const studentPreviousTutorial = (tutorialPageNumber) => ({
  type: STUDENT_PREVIOUS_TUTORIAL,
  tutorialPageNumber,
})

export const studentEndTutorial = () => ({
  type: STUDENT_END_TUTORIAL,
})

export const getStudentAdventure = (id, password) => async (dispatch) => {
  try {
    dispatch(getStudentAdventureRequest())
    const res = await fetchPost(`student/adventure/${id}`, { password })

    dispatch(getStudentAdventureSuccess(res))
  }
  catch (error) {
    dispatch(getStudentAdventureError(error))
  }
}

export const getStudentCurrentNode = (adventureId, nodeId) => async (dispatch) => {
  try {
    dispatch(getStudentCurrentNodeRequest())
    const res = await fetchGet(`student/${adventureId}/${nodeId}`)

    dispatch(getStudentCurrentNodeSuccess(res))
  }
  catch (error) {
    dispatch(getStudentCurrentNodeError(error))
  }
}

export const getStudentAll = () => async (dispatch) => {
  try {
    dispatch(getStudentSearchRequest())
    const res = await fetchGet(`student/search`)

    dispatch(getStudentSearchSuccess(res))
  }
  catch (error) {
    return dispatch(getStudentSearchError(error))
  }
}

export const getStudentSearch = (searchTerm) => async (dispatch) => {
  try {
    dispatch(getStudentSearchRequest())
    const res = await fetchGet(`student/search/${searchTerm}`)

    dispatch(getStudentSearchSuccess(res))
  }
  catch (error) {
    return dispatch(getStudentSearchError(error))
  }
}
