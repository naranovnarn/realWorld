import * as actionTypes from "../actionTypes";

export const getArticles = (count, offset) => async (
  dispatch,
  getState,
  api
) => {
  dispatch(startLoadingList());

  const data = await api.getArticles(count, offset);

  const { articles } = data;

  dispatch({
    type: actionTypes.GET_ARTICLES,
    articles,
  });

  dispatch(finishLoadingList());
};

export const startLoadingList = () => ({
  type: actionTypes.START_LOADING_LIST,
});

export const finishLoadingList = () => ({
  type: actionTypes.FINISH_LOADING_LIST,
});

export const startLoadingArticle = () => ({
  type: actionTypes.START_LOADING_ARTICLE,
});

export const finishLoadingArticle = () => ({
  type: actionTypes.FINISH_LOADING_ARTICLE,
});

export const getSingleArticle = (slug) => async (dispatch, getState, api) => {
  dispatch(startLoadingArticle());

  const data = await api.getSingleArticle(slug);

  const { article } = data;

  dispatch({
    type: actionTypes.SINGLE_ARTICLE,
    singleArticle: article,
  });

  dispatch(finishLoadingArticle());
};

export const regUser = (user) => ({
  type: actionTypes.REGISTRATION_USER,
  user,
});

export const authUser = (user) => ({
  type: actionTypes.AUTH_USER,
  user,
});

export const setServerErrors = (errors) => ({
  type: actionTypes.SERVER_ERRORS,
  errors,
});

export const clearServerError = () => ({
  type: actionTypes.SERVER_ERRORS_CLEAR,
});

export const logIn = () => ({
  type: actionTypes.LOG_IN,
});

export const logOutUser = () => ({
  type: actionTypes.LOG_OUT,
});

export const updateUser = (user) => ({
  type: actionTypes.UPDATE_USER,
  user,
});
