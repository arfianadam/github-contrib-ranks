const GET_CONTRIB = 'redux-example/contributors/GET_CONTRIB';
const GET_CONTRIB_SUCCESS = 'redux-example/contributors/GET_CONTRIB_SUCCESS';
const GET_CONTRIB_FAIL = 'redux-example/contributors/GET_CONTRIB_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CONTRIB:
      return { ...state, action };
    case GET_CONTRIB_SUCCESS:
      return { ...state, action };
    case GET_CONTRIB_FAIL:
      return { ...state, action };
    default:
      return state;
  }
}

export function getContributors(org, repo) {
  return {
    types: [GET_CONTRIB, GET_CONTRIB_SUCCESS, GET_CONTRIB_FAIL],
    promise: ({ client }) => client.get(`/repos/${org}/${repo}/contributors`)
  };
}
