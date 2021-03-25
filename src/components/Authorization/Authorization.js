import React from "react";
import { Link } from "react-router-dom";

import classes from "./Authorization.module.scss";

const Authorization = () => {
  return (
    <div className={classes.autorize}>
      <Link to="/sign-in" type="button" className={classes.sign}>
        Sign In
      </Link>
      <Link to="/sign-up" type="button" className={classes.sign}>
        Sign Up
      </Link>
    </div>
  );
};
export default Authorization;
