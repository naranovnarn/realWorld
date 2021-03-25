import React, { useEffect } from "react";
import Article from "../Article";
import Spinner from "../Spinner";
import classes from "./ArticlePage.module.scss";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../service";
import { getSingleArticle } from "../../actionCreator";

const ArticlePage = ({
  getSingleArticle,
  loadingArticle,
  singleArticle,
  token,
}) => {
  const { slug } = useParams();

  const history = useHistory();

  useEffect(() => {
    getSingleArticle(slug);
  }, [slug, getSingleArticle]);

  if (loadingArticle || Object.keys(singleArticle).length === 0) {
    return <Spinner />;
  }

  const deleteArticleHandler = async () => {
    await api.deleteArticle(slug, token);
    history.push("/articles");
  };

  return (
    <div className={classes.ArticlePage}>
      <Article article={singleArticle} single onDelete={deleteArticleHandler} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingArticle: state.loadingArticle,
    singleArticle: state.singleArticle,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleArticle: (slug) => dispatch(getSingleArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
