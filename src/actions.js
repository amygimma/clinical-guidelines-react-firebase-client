import {
  FETCH_GUIDELINES_REQUEST,
  FETCH_GUIDELINES_SUCCESS,
  FETCH_GUIDELINES_ERROR
} from './constants'

function fetchGuidelinesRequest() {
  return {
    type: FETCH_GUIDELINES_REQUEST
  }
}

function fetchGuidelinesSuccess(data) {
  return {
    type: FETCH_GUIDELINES_SUCCESS,
    payload: data
  }
}

function fetchGuidelinesError(error) {
  type: FETCH_GUIDELINES_ERROR,
  payload: error
}
