import { splice } from 'helpers/polyfill';

const START_REQUEST = 'redux-example/contributors/START_REQUEST';
const FINISH_REQUEST = 'redux-example/contributors/FINISH_REQUEST';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return [
        ...state,
        {
          id: action.payload,
          loading: true
        }
      ];
    case FINISH_REQUEST:
      const requestIndex = state.findIndex(req => req.id === action.payload);
      const finishedRequest = {
        ...state[requestIndex],
        loading: false
      };
      return splice(state, requestIndex, 1, finishedRequest);
    default:
      return state;
  }
}

export function startRequest(id) {
  return {
    type: START_REQUEST,
    payload: id
  };
}

export function finishRequest(id) {
  return {
    type: FINISH_REQUEST,
    payload: id
  };
}
