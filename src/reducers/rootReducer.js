import { combineReducers } from "redux";
import articles from "./articlesReducer";
import loading from "./loadingListReducer";
import singleArticle from "./singleArticleReducer";
import loadingArticle from "./loadingArticleReducer";
import user from "./userReducer";
import serverErrors from "./serverErrorsReducer";
import authorization from "./authorizationReducer";

export const rootReducer = combineReducers({
  articles,
  loading,
  singleArticle,
  loadingArticle,
  user,
  serverErrors,
  authorization,
});

export default rootReducer;
