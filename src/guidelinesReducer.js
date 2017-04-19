import {
  FETCH_GUIDELINES_REQUEST,
  FETCH_GUIDELINES_SUCCESS,
  FETCH_GUIDELINES_ERROR
} from './constants'

const initialState = {
  isFetchingRequest = false;
  guidelines: []
}

function guidelines(state = initialState, action) {
  switch (action.type) {
    case FETCH_GUIDELINES_REQUEST:
      return Object.assign({}, state, {
        isFetchingRequest: true
      })
    case FETCH_GUIDELINES_SUCCESS:
      return Object.assign({}, state, {
        guidelines: action.payload
      })
    // case FETCH_GUIDELINES_ERROR:
    //   return Object.assign({}, state, {
    //     guidelines: action.payload
    //   })
    default:
      return state
  }
}
