import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Error from "../Error";
import FormArticle from "../FormComponent/FormArticle";
import { setServerErrors } from "../../actionCreator";
import api from "../../service";
import "antd/dist/antd.css";

const NewArticle = ({ user, serverErrors, authorization }) => {
  const [error, setErrors] = useState();

  const history = useHistory();

  if (!authorization) {
    history.push("/articles");
  }

  const onSubmit = async (data) => {
    try {
      const { token } = user;
      const response = await api.createArticle(data, token);

      const { errors, article } = response;

      if (errors) {
        setServerErrors(errors);
      }
      if (article) {
        history.push("/articles");
      }
    } catch (err) {
      setErrors(err);
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <FormArticle
      onSubmit={onSubmit}
      isNew
      formTitle="Create new article"
      error={serverErrors}
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  serverErrors: state.serverErrors,
  authorization: state.authorization,
});

const mapDispatchToProps = (dispatch) => ({
  setServerErrors: (errors) => dispatch(setServerErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
