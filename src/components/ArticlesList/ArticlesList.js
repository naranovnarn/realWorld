import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../../actionCreator";
import { Pagination } from "antd";
import Article from "../Article";
import classes from "./ArticlesList.module.scss";
import "./antPagination.scss";
import "antd/dist/antd.css";
import Spinner from "../Spinner";

const ArticlesList = ({ articles, getArticles, loading }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    getArticles(5, page);
  }, [getArticles, page]);

  const changePage = (page) => {
    setPage(page);
  };

  const articlesList = articles.map((article) => {
    return <Article key={article.createdAt} article={article} single={false} />;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={classes.ArticlesList}>
      {articlesList}
      <div className={classes.Pagination}>
        <Pagination
          current={page}
          onChange={changePage}
          size="small"
          total={500}
          defaultPageSize={5}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (count, offset) => dispatch(getArticles(count, offset)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
