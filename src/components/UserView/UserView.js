import React from "react";
import { connect } from "react-redux";
import { logOutUser } from "../../actionCreator";
import { removeLocaltorage } from "../../localStorageUtils";

import { Link, useHistory } from "react-router-dom";

import UserInfo from "../UserInfo";

import classes from "./UserView.module.scss";

const UserView = ({ user, logOutUser }) => {
  const history = useHistory();

  const logOut = () => {
    removeLocaltorage("user");
    logOutUser();
    history.push("/articles");
  };

  return (
    <div className={classes.UserView}>
      <Link to={"/new-article"} className={classes.createArticle}>
        Create article
      </Link>
      <Link to={"/profile"}>
        <UserInfo author={user} isArticle={false} showDate={false} />
      </Link>

      <button onClick={logOut} className={classes.logOut} type="button">
        Log Out
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
