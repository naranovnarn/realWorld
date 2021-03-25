import { createReducer } from "redux-create-reducer";
import * as actionTypes from "../actionTypes";


 const serverErrors = createReducer( null , {
    [actionTypes.SERVER_ERRORS]: (state, { errors }) => errors,
    [actionTypes.SERVER_ERRORS_CLEAR]: () => null
});


export default serverErrors;