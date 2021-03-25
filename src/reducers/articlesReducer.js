import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '../actionTypes';


const articles = createReducer( [], {
  [actionTypes.GET_ARTICLES]: (state, { articles }) => [...articles]
})

export default articles;