import {
  RERENDER_GRAPH,
  ADVENTURE_ERROR,
  ADVENTURE_REQUEST,
  GET_ADVENTURE_SUCCESS,
  EDIT_ADVENTURE_SUCCESS,
  CLEAR_CURRENT_ADVENTURE,
  TOGGLE_ADVENTURE_EDITING,
  TOGGLE_ANALYTICS_DISPLAY,
  CREATE_ADVENTURE_SUCCESS,
  DELETE_ADVENTURE_SUCCESS,
  TOGGLE_ADVENTURE_DELETING,
  GET_ALL_ADVENTURES_SUCCESS,
} from '../constants/adventure'

const initialState = {
  adventures: [],
  error: null,
  loading: false,
  reRender: false,
  isEditing: true,
  isDeleting: false,
  adventureId: null,
  showAnalytics: false,
  currentAdventure: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADVENTURE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ADVENTURE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case GET_ALL_ADVENTURES_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventures: action.adventures,
      })
    }
    case DELETE_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        isDeleting: false,
      })
    }
    case GET_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        currentAdventure: action.currentAdventure,
      })
    }
    case EDIT_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        currentAdventure: action.currentAdventure,
      })
    }
    case CREATE_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        currentAdventure: action.currentAdventure,
      })
    }
    case TOGGLE_ADVENTURE_DELETING: {
      return Object.assign({}, state, {
        isDeleting: !state.isDeleting,
      })
    }
    case TOGGLE_ADVENTURE_EDITING: {
      return Object.assign({}, state, {
        isEditing: !state.isEditing,
      })
    }
    case TOGGLE_ANALYTICS_DISPLAY: {
      return Object.assign({}, state, {
        loading: false,
        showAnalytics: !state.showAnalytics,
      })
    }
    case RERENDER_GRAPH: {
      return Object.assign({}, state, {
        reRender: !state.reRender,
      })
    }
    case CLEAR_CURRENT_ADVENTURE: {
      return Object.assign({}, state, {
        error: null,
        adventureId: null,
        isDeleting: false,
        currentAdventure: null,
      })
    }
    default:
      return state
  }
}

// case UPDATE_CURRENT_NODE: {
//   return Object.assign({}, state, {
//     currentNode: state.currentAdventure.nodes.filter(node => node.id === action.nodeId)
//   });
// }
