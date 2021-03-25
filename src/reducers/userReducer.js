import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '../actionTypes';


const user = createReducer( {}, {
  [actionTypes.REGISTRATION_USER]: (state, { user }) => user ,
  [actionTypes.AUTH_USER]: (state, { user }) => user,
  [actionTypes.LOG_OUT]: (state) => ({}),
  [actionTypes.UPDATE_USER]: (state, { user }) => user,
})

export default user;