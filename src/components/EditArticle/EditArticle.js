import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Error from "../Error";
import FormArticle from "../FormComponent/FormArticle";
import { getSingleArticle } from "../../actionCreator";
import api from "../../service";
import "antd/dist/antd.css";

const EditArticle = ({
  token,
  singleArticle,
  getSingleArticle,
  authorization,
}) => {
  const [errorServer, setErrorServer] = useState();

  const { slug } = useParams();
  const history = useHistory();

  if (!authorization) {
    history.push("/articles");
  }

  const [error, setErrors] = useState();

  const onSubmit = async (data) => {
    try {
      const response = await api.updateArticle(data, slug, token);

      const { errors, article } = response;

      if (errors) {
        setErrorServer(errors);
      }

      if (article) {
        const { slug } = article;
        getSingleArticle(slug);
        history.push(`/articles/${slug}`);
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
      isNew={false}
      articleData={singleArticle}
      formTitle="Edit article"
      error={errorServer}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    singleArticle: state.singleArticle,
    authorization: state.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleArticle: (slug) => dispatch(getSingleArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
