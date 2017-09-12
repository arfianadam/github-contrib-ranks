import ApiClient from 'helpers/ApiClient';
import { startRequest, finishRequest } from './requests';
const request = new ApiClient();

const SAVE_CONTRIBUTORS = 'redux-example/contributors/SAVE_CONTRIBUTORS';
const GET_CONTRIB_SUCCESS = 'redux-example/contributors/GET_CONTRIB_SUCCESS';
const GET_CONTRIB_FAIL = 'redux-example/contributors/GET_CONTRIB_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_CONTRIBUTORS:
      const newState = { ...state };
      let org = newState[action.payload.org];
      if (org) {
        let repo = org[action.payload.repo];
        if (repo) {
          repo = [...repo, ...action.payload.contributors];
        } else {
          repo = action.payload.contributors;
        }
        org[action.payload.repo] = repo;
      } else {
        org = {};
        org[action.payload.repo] = action.payload.contributors;
      }
      newState[action.payload.org] = org;
      // let repoContributors = newState[action.payload.org];
      // if (repoContributors) {
      //   repoContributors = [...repoContributors, ...action.payload.contributors];
      // } else {
      //   repoContributors = action.payload.contributors;
      // }
      // newState[action.payload.org] = repoContributors;
      return newState;
    case GET_CONTRIB_SUCCESS:
      return { ...state, action };
    case GET_CONTRIB_FAIL:
      return { ...state, action };
    default:
      return state;
  }
}

export function saveContributors(org, repo, contributors) {
  return {
    type: SAVE_CONTRIBUTORS,
    payload: {
      org, repo, contributors
    }
  };
}

export function getContributors(org, repo, page = 1) {
  return dispatch => {
    const id = Math.random() * (new Date().valueOf());
    dispatch(startRequest(id));
    request
      .get(`/repos/${org}/${repo}/contributors?page=${page}`)
      .then(res => {
        page++;
        dispatch(finishRequest(id));
        dispatch(saveContributors(org, repo, res));
        if (page < 3) {
          dispatch(getContributors(org, repo, page));
        }
      });
  };
}
