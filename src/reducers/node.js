import {
  NODE_ERROR,
  NODE_REQUEST,
  TOGGLE_ENDING,
  STAGE_CHILD_NODE,
  SET_CURRENT_NODE,
  TOGGLE_CHILD_TYPE,
  TOGGLE_UPDATE_FORM,
  CLEAR_CURRENT_NODE,
  UPDATE_NODE_SUCCESS,
  CREATE_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  TOGGLE_NODE_DELETING,
  NODE_FORM_WITH_POINTER,
} from '../constants/node'

const initialState = {
  loading: false,
  error: null,
  nodeId: null,
  isEnding: false, //?
  parentInt: null, //?
  currentNode: null,
  showUpdate: false, //?
  isDeleting: false, //?
  stagedChildNode: null,
  useExistingNode: false, //?
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NODE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case NODE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case CREATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parentInt: null,
        nodeId: action.nodeId,
      })
    }


    case TOGGLE_UPDATE_FORM: {
      return Object.assign({}, state, {
        showUpdate: !state.showUpdate,
        nodeId: action.nodeId,
        isEnding: action.isEnding,
        parentInt: null,
        error: null,
      })
    }
    case UPDATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        showUpdate: false,
      })
    }
    case NODE_FORM_WITH_POINTER: {
      return Object.assign({}, state, {
        error: null,
        loading: false,
        stagedChildNode: null,
        useExistingNode: false,
        parentInt: action.parentInt,
      })
    }
    case SET_CURRENT_NODE: {
      // set current node will now also
      //  normalize isEnding in state to it so they are in  sync
      return Object.assign({}, state, {
        loading: false,
        currentNode: action.node,
        parentInt: null,
        isEnding: action.node.ending,
        error: null,
      })
    }
    case TOGGLE_ENDING: {
      return Object.assign({}, state, {
        isEnding: !state.isEnding,
        error: null,
      })
    }
    case TOGGLE_NODE_DELETING: {
      return Object.assign({}, state, {
        isDeleting: !state.isDeleting,
        error: null,
      })
    }

    case DELETE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        showUpdate: false,
      })
    }

    case TOGGLE_CHILD_TYPE: {
      return Object.assign({}, state, {
        useExistingNode: !state.useExistingNode,
        error: null,
      })
    }
    case STAGE_CHILD_NODE: {
      return Object.assign({}, state, {
        stagedChildNode: action.node,
        error: null,
      })
    }
    case CLEAR_CURRENT_NODE: {
      return Object.assign({}, state, {
        nodeId: null,
        parentInt: null,
        currentNode: null,
      })
    }
    default:
      return state
  }
}
