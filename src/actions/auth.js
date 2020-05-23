import jwtDecode from 'jwt-decode'
import { SubmissionError } from 'redux-form'

import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from '../utils/normalizeResponseErrors'
import { saveAuthToken, clearAuthToken } from '../utils/local-storage'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const setAuthToken = (authToken) => ({
  type: SET_AUTH_TOKEN,
  authToken,
})

export const CLEAR_AUTH = 'CLEAR_AUTH'
export const clearAuth = () => ({
  type: CLEAR_AUTH,
})

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const authRequest = () => ({
  type: AUTH_REQUEST,
})

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const authSuccess = (currentUser) => ({
  type: AUTH_SUCCESS,
  currentUser,
})

export const AUTH_ERROR = 'AUTH_ERROR'
export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
})

export const TOGGLE_ONBOARDING = 'TOGGLE_ONBOARDING'
export const toggleOnboarding = () => ({
  type: TOGGLE_ONBOARDING,
})

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken)
  dispatch(setAuthToken(authToken))
  dispatch(authSuccess(decodedToken.user))
  saveAuthToken(authToken)
}

export const loginUser = (user) => (dispatch) => {
  dispatch(authRequest())
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => normalizeResponseErrors(res))
    .then((res) => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch((err) => {
      const { code } = err
      const message =
        code === 401 ? 'Incorrect username or password' : 'Unable to login, please try again'
      dispatch(authError(err))
      // Could not authenticate, so return a SubmissionError for Redux
      // Form
      return Promise.reject(
        new SubmissionError({
          _error: message,
        })
      )
    })
}

export const refreshAuthToken = () => (dispatch, getState) => {
  console.log('refresh');
  dispatch(authRequest())
  const authToken = getState().auth.authToken
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => normalizeResponseErrors(res))
    .then((res) => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch((err) => {
      dispatch(authError(err))
      dispatch(clearAuth())
      clearAuthToken(authToken)
    })
}
