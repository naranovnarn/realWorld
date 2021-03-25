import { createReducer } from "redux-create-reducer";
import * as actionTypes from "../actionTypes";


 const loadingArticle = createReducer( null , {
    [actionTypes.START_LOADING_ARTICLE]: () => true ,
    [actionTypes.FINISH_LOADING_ARTICLE]: () => false 
});


export default loadingArticle;