import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '../actionTypes';


const singleArticle = createReducer( {}, {
  [actionTypes.SINGLE_ARTICLE]: (state, { singleArticle }) => singleArticle 
})

export default singleArticle;