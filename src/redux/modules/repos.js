import ApiClient from 'helpers/ApiClient';
import { getContributors } from './contributors';
import { startRequest, finishRequest } from './requests';
const request = new ApiClient();

const SAVE_REPOS = 'redux-example/contributors/SAVE_REPOS';
const CLEAR_REPOS = 'redux-example/contributors/CLEAR_REPOS';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_REPOS:
      return [...state, ...action.payload.repos];
    case CLEAR_REPOS:
      return [];
    default:
      return state;
  }
}

export function saveRepos(repos) {
  return {
    type: SAVE_REPOS,
    payload: { repos }
  };
}

export function getRepos(org, page = 1, perPage = 100) {
  return dispatch => {
    const id = Math.random() * (new Date().valueOf());
    dispatch(startRequest(id));
    request
      .get(`/orgs/${org}/repos?page=${page}&per_page=${perPage}`)
      .then(res => {
        // page++;
        dispatch(finishRequest(id));
        dispatch(saveRepos(res));
        // if you want to load more than one page
        // if (page < 3) {
        //   dispatch(getRepos(org, page));
        // }
        res.forEach(repo => {
          dispatch(getContributors(org, repo.name));
        });
      });
  };
}

export function clearRepos() {
  return {
    type: CLEAR_REPOS
  };
}
