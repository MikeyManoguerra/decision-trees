// TODO: implement?

import {
  ERROR,
  LOADING,
  CLEAR_ERROR,
  CLEAR_LOADING,
} from '../constants/common'

export const setError = (error) => ({
  type: ERROR,
  error,
})

export const clearError = () => ({
  type: CLEAR_ERROR,
})

export const setLoading = () => ({
  type: LOADING,
})

export const clearLoading = () => ({
  type: CLEAR_LOADING,
})

