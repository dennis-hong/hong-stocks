import { createAction } from 'redux-actions'
import { PENDING, FULFILLED, REJECTED } from 'constants/ActionSuffix'
import { imageService } from 'api/ApiService'
import { Map } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const GET_VALUE = 'GET_VALUE'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = '1') {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

const _getValue =
  createAction(GET_VALUE, () => (imageService.fetchValue()))

export const getValue = () => {
  return dispatch => dispatch(_getValue())
}

export const actions = {
  increment,
  getValue
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT] : (state, action) => state.set('counter', action.payload + '1'),
  [GET_VALUE + PENDING]: (state, action) => state.set('isFetching', true),
  [GET_VALUE + FULFILLED]: (state, action) => {
    sleep(5000)
    return state.set('isFetching', false)
      .set('counter', action.payload)
  },
  [GET_VALUE + REJECTED]: (state, action) => {
    return state.set('isFetching', false)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({ isFetching: false, counter: 'init' })
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
