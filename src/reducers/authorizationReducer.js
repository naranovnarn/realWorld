import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '../actionTypes';


const authorization = createReducer( false, {
  [actionTypes.LOG_IN]: () => true,
  [actionTypes.LOG_OUT]: () => false
})

export default authorization;