import React from "react";
import classes from "./Article.module.scss";
import { connect } from "react-redux";
import UserInfo from "../UserInfo/UserInfo";
import { Popconfirm } from "antd";
import Markdown from "markdown-to-jsx";
import { Link, useHistory } from "react-router-dom";
import Likes from "../Likes";

const Article = ({ article, single, username, onDelete }) => {
  const history = useHistory();

  const {
    createdAt,
    tagList,
    slug,
    title,
    favoritesCount,
    favorited,
    author,
    description,
    body,
  } = article;

  const renderTags = tagList.map((tag) => {
    return (
      <span key={tag} className={classes.article__tag}>
        {tag}
      </span>
    );
  });

  const isMyArticle = username === author.username && single;

  return (
    <div className={classes.Article}>
      <div className={classes.Article__header}>
        <div className={classes.Article__left}>
          <div className={classes.Article__top}>
            {single ? (
              <div className={classes.Article__title}>{title}</div>
            ) : (
              <Link to={`/articles/${slug}`} className={classes.Article__title}>
                {title}
              </Link>
            )}
            <Likes
              favorited={favorited}
              slug={slug}
              favoritesCount={favoritesCount}
            />
          </div>
          <div className={classes.Article__tags}>{renderTags}</div>
        </div>
        <div className={classes.Article__right}>
          <UserInfo author={author} createdAt={createdAt} showDate />
          {isMyArticle && (
            <div className={classes.Article__actions}>
              <Popconfirm
                placement="rightTop"
                title="Delete this article?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={classes.Article__delete}>
                  Delete
                </button>
              </Popconfirm>
              <button
                onClick={() => {
                  history.push(`/articles/${slug}/edit`);
                }}
                type="button"
                className={classes.Article__edit}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.Article__content}>
        {description}
        {single && (
          <div className={classes.Article__markdown}>
            <Markdown options={{ forceBlock: true }}>{body}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Article);
