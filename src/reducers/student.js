import {
  END_STUDENT_ADVENTURE,
  GET_STUDENT_SEARCH_ERROR,
  GET_STUDENT_ADVENTURE_ERROR,
  GET_STUDENT_CURRENTNODE_ERROR,
  GET_STUDENT_SEARCH_REQUEST,
  GET_STUDENT_ADVENTURE_REQUEST,
  GET_STUDENT_CURRENTNODE_REQUEST,
  RESTART_STUDENT_ADVENTURE,
  GET_STUDENT_SEARCH_SUCCESS,
  GET_STUDENT_ADVENTURE_SUCCESS,
  GET_STUDENT_CURRENTNODE_SUCCESS,
  STUDENT_END_TUTORIAL,
  STUDENT_NEXT_TUTORIAL,
  STUDENT_START_TUTORIAL,
  STUDENT_PREVIOUS_TUTORIAL,
} from '../actions/student'

const initialState = {
  error: null,
  loading: false,
  adventure: null,
  tutorial: false,
  tutorialPage: 0,
  currentNode: null,
  searchResults: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    }
    case GET_STUDENT_ADVENTURE_SUCCESS: {

      return Object.assign({}, state, {
        adventure: action.adventure,
        loading: false,
        error: null,
      })
    }
    case GET_STUDENT_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    }
    case GET_STUDENT_CURRENTNODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    }
    case GET_STUDENT_CURRENTNODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        currentNode: action.node,
        error: null,
      })
    }
    case GET_STUDENT_CURRENTNODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    }
    case RESTART_STUDENT_ADVENTURE: {
      return Object.assign({}, state, {
        error: null,
        currentNode: null,
      })
    }
    case END_STUDENT_ADVENTURE: {
      return Object.assign({}, state, {
        error: null,
        tutorial: null,
        adventure: null,
        currentNode: null,
        searchResults: null,
      })
    }
    case GET_STUDENT_SEARCH_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    }
    case GET_STUDENT_SEARCH_SUCCESS: {
      console.log(action);

      return Object.assign({}, state, {
        error: null,
        loading: false,
        searchResults: action.results,
      })
    }
    case GET_STUDENT_SEARCH_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    }
    case STUDENT_START_TUTORIAL: {
      return Object.assign({}, state, {
        tutorial: true,
      })
    }
    case STUDENT_END_TUTORIAL: {
      return Object.assign({}, state, {
        tutorial: false,
        tutorialPage: 0,
      })
    }
    case STUDENT_NEXT_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialPage: action.tutorialPageNumber + 1,
      })
    }
    case STUDENT_PREVIOUS_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialPage: action.tutorialPageNumber - 1,
      })
    }
    default:
      return state
  }
}
