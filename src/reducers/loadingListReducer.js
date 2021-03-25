import { createReducer } from "redux-create-reducer";
import * as actionTypes from "../actionTypes";


 const loading = createReducer( null , {
    [actionTypes.START_LOADING_LIST]: () => true ,
    [actionTypes.FINISH_LOADING_LIST]: () => false 
});


export default loading;