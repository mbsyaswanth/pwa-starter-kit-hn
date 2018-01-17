import { UPDATE_LOCATION } from '../actions/location.js';
import { createSelector } from '../../node_modules/reselect/src/index.js';

const location = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const location = action.location;
      return {
        ...state,
        pathname: location.pathname,
        search: location.search,
        hash: location.hash
      };
    default:
      return state;
  }
}

export default location;

const pathnameSelector = state => state.location.pathname;

export const splitPathnameSelector = createSelector(
  pathnameSelector,
  pathname => {
    return pathname ? pathname.slice(1).split('/') : [];
  }
);

export const pageSelector = createSelector(
  splitPathnameSelector,
  splitPath => {
    switch (splitPath[0]) {
      case '':
      case 'new':
      case 'ask':
      case 'show':
      case 'jobs':
      case 'favorites':
        return 'list';
      case 'user':
      case 'item':
        return splitPath[0];
      default:
        return 'invalid-page';
    }
  }
);

const searchSelector = state => state.location.search;

export const urlSearchParamsSelector = createSelector(
  searchSelector,
  search => new URLSearchParams(search)
);

export const pageParamSelector = createSelector(
  urlSearchParamsSelector,
  params => {
    const stringValue = params.get('page');
    return stringValue ? parseInt(stringValue, 10) : 1;
  }
);
