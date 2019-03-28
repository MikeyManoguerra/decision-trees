import {
  CREATE_ADVENTURE_REQUEST,
  CREATE_ADVENTURE_SUCCESS,
  CREATE_ADVENTURE_ERROR,
  GET_ADVENTURE_SUCCESS
} from '../actions/createAdventure'

const initialState = {
  loading: false,
  error: null,
  adventureId: null,
  adventure: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADVENTURE_REQUEST : {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case CREATE_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventureId: action.adventureId
      });
    }
    case CREATE_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case GET_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventure : action.adventure
      });
    }
    default:
      return state
  }
}