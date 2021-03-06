import ApiClient from 'helpers/ApiClient';
// import { splice } from 'helpers/polyfill';
import { startRequest, finishRequest } from './requests';
const request = new ApiClient();

const SAVE_CONTRIBUTORS = 'redux-example/contributors/SAVE_CONTRIBUTORS';
const CLEAR_CONTRIBUTORS = 'redux-example/contributors/CLEAR_CONTRIBUTORS';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_CONTRIBUTORS:
      const newState = [...state];
      const contributors = action.payload.contributors;
      contributors.forEach(user => {
        const userIndex = newState.findIndex(loadedUser => loadedUser.id === user.id);
        const isLoaded = userIndex > -1;
        if (!isLoaded) {
          const newUser = {
            ...user,
            total: user.contributions,
            repo: [{
              name: action.payload.repo,
              contributions: user.contributions
            }]
          };
          newState.push(newUser);
        } else {
          const loadedUser = newState[userIndex];
          const repo = {
            name: action.payload.repo,
            contributions: user.contributions
          };
          loadedUser.repo.push(repo);
          loadedUser.total += user.contributions;
        }
      });
      return newState;
    case CLEAR_CONTRIBUTORS:
      return [];
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

export function getInfo(user) {
  return (dispatch, getState) => new Promise(resolve => {
    const contributors = getState().contributors;
    const userIndex = contributors.findIndex(loadedUser => loadedUser.id === user.id);
    const isLoaded = userIndex > -1;
    if (!isLoaded) {
      const id = Math.random() * (new Date().valueOf());
      dispatch(startRequest(id));
      request
        .get(`users/${user.login}`)
        .then(res => {
          dispatch(finishRequest(id));
          resolve({
            ...user,
            ...res
          });
        });
    } else {
      resolve(user);
    }
  });
}

export function getContributors(org, repo, page = 1, perPage = 100) {
  return dispatch => {
    const id = Math.random() * (new Date().valueOf());
    const promises = [];
    dispatch(startRequest(id));
    request
      .get(`/repos/${org}/${repo}/contributors?page=${page}&per_page=${perPage}`)
      .then(res => {
        // page++;
        dispatch(finishRequest(id));
        if (res !== null) {
          res.forEach(user => {
            promises.push(dispatch(getInfo(user)));
          });
          Promise.all(promises)
            .then(contributors => {
              dispatch(saveContributors(org, repo, contributors));
            });
        }
        // if you want to load more than one page
        // if (page < 3) {
        //   dispatch(getContributors(org, repo, page));
        // }
      });
  };
}

export function clearContributors() {
  return {
    type: CLEAR_CONTRIBUTORS
  };
}
