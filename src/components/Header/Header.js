import React from "react";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Authorization from "../Authorization";
import UserView from "../UserView";

const Header = ({ authorization }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.Header__title}>
        <Link to={"/articles"}>Realworld Blog</Link>
      </div>
      {authorization ? <UserView /> : <Authorization />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authorization: state.authorization,
  };
};

export default connect(mapStateToProps)(Header);
