import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ArticlesList from "../ArticlesList";
import ArticlePage from "../ArticlePage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "../Header";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import NewArticle from "../NewArticle";
import { getLocalStorage } from "../../localStorageUtils";
import api from "../../service";
import Error from "../Error";
import {
  setServerErrors,
  logIn,
  clearServerError,
  authUser,
} from "../../actionCreator";
import classes from "./App.module.scss";
import EditProfile from "../EditProfile";
import EditArticle from "../EditArticle";

const App = ({ logIn, authUser }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const loginUser = async () => {
      try {
        const user = getLocalStorage("user");

        if (user) {
          const response = await api.getCurrentUser(user.token);
          authUser(response.user);
          logIn();
        }
      } catch (err) {
        setError(err);
      }
    };

    loginUser();
  }, [logIn, authUser]);

  if (error) {
    return <Error />;
  }

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path={["/", "/articles"]} component={ArticlesList} exact />
          <Route path="/articles/:slug" component={ArticlePage} exact />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route component={EditProfile} path="/profile" />
          <Route component={NewArticle} path="/new-article" />
          <Route component={EditArticle} path="/articles/:slug/edit" exact />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setServerErrors: (errors) => dispatch(setServerErrors(errors)),
  logIn: () => dispatch(logIn()),
  clearServerError: () => dispatch(clearServerError()),
  authUser: (user) => dispatch(authUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
