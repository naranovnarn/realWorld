import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Likes.module.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "../../localStorageUtils";
import api from "../../service";
import Error from "../Error";

const Likes = ({ favorited, favoritesCount, authorization, slug }) => {
  const [like, setLike] = useState(favorited);
  const [countLike, setCountLike] = useState(favoritesCount);
  const [error, setError] = useState(false);

  const history = useHistory();

  const likeArticleHandler = async () => {
    try {
      if (authorization) {
        const user = getLocalStorage("user");
        const { token } = user;
        const response = await api.likeArticle(slug, token, like);
        const {
          article: { favorited, favoritesCount },
        } = response;
        setCountLike(favoritesCount);
        setLike(favorited);
      } else {
        history.push("/sign-in");
      }
    } catch (err) {
      setError(true);
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <React.Fragment>
      {like ? (
        <HeartFilled
          onClick={likeArticleHandler}
          className={classes.Likes}
          style={{ fontSize: "16px", color: "red" }}
        />
      ) : (
        <HeartOutlined
          onClick={likeArticleHandler}
          className={classes.Likes}
          style={{ fontSize: "16px" }}
        />
      )}
      <span className={classes.Counts}>{countLike}</span>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps)(Likes);
