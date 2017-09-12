import ApiClient from 'helpers/ApiClient';
import { getContributors } from './contributors';
import { startRequest, finishRequest } from './requests';
const request = new ApiClient();

const SAVE_REPOS = 'redux-example/contributors/SAVE_REPOS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_REPOS:
      const newState = { ...state };
      let repos = newState[action.payload.org];
      if (repos) {
        repos = [...repos, ...action.payload.repos];
      } else {
        repos = action.payload.repos;
      }
      newState[action.payload.org] = repos;
      return newState;
    default:
      return state;
  }
}

export function saveRepos(org, repos) {
  return {
    type: SAVE_REPOS,
    payload: {
      org, repos
    }
  };
}

export function getRepos(org, page = 1) {
  return dispatch => {
    const id = Math.random() * (new Date().valueOf());
    dispatch(startRequest(id));
    request
      .get(`/orgs/${org}/repos?page=${page}`)
      .then(res => {
        page++;
        dispatch(finishRequest(id));
        dispatch(saveRepos(org, res));
        if (page < 3) {
          dispatch(getRepos(org, page));
        }
        res.forEach(repo => {
          dispatch(getContributors(org, repo.name));
        });
      });
  };
}
