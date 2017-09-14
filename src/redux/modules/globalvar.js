const SET_ORG_NAME = 'redux-example/globalvar/SET_ORG_NAME';
const SET_PAGE = 'redux-example/globalvar/SET_PAGE';

const initialState = {
  orgName: '',
  page: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ORG_NAME:
      return {
        ...state,
        orgName: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
}

export function setOrgName(name) {
  return {
    type: SET_ORG_NAME,
    payload: name
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  };
}
