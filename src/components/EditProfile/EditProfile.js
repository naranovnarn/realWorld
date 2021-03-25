import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import api from "../../service";
import isURL from "validator/es/lib/isURL";
import FormInput from "../FormComponent/FormInput";
import { setLocaltorage } from "../../localStorageUtils";
import {
  setServerErrors,
  logIn,
  clearServerError,
  updateUser,
} from "../../actionCreator";
import Error from "../Error";

import "antd/dist/antd.css";
import form from "../FormComponent/form.module.scss";

const EditProfile = ({
  user,
  serverErrors,
  updateUser,
  logIn,
  authorization,
}) => {
  const [error, setErrors] = useState();

  const history = useHistory();

  const {
    token,
    username: usernameFromStore,
    email: emailFromStore,
    image: imageFromStore,
  } = user;

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      username: usernameFromStore,
      email: emailFromStore,
      image: imageFromStore,
    },
  });

  console.log(logIn);

  if (!authorization) {
    history.push("/articles");
  }

  const onSubmit = async (data) => {
    try {
      const response = await api.updateUser(data, token);

      const { errors, user } = response;

      if (errors) {
        setServerErrors(errors);
      }

      if (user) {
        updateUser(user);
        logIn();
        clearServerError();
        setLocaltorage("user", user);
        history.push("/articles");
      }
    } catch (err) {
      setErrors(err);
    }
  };

  const errorHandler = () => {
    const errorsNames = Object.keys(error);
    const errorMsgs = errorsNames.map((err) => {
      const msgs = error[err].join(` and `);
      return `${err} ${msgs}`;
    });

    return (
      <Alert
        style={{ marginBottom: "10px" }}
        message={errorMsgs}
        type="warning"
        showIcon
        closable
      />
    );
  };

  if (error) {
    return <Error />;
  }

  return (
    <div className={form.container}>
      {serverErrors && errorHandler(serverErrors)}
      <h1 className={form.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Username"
          name="username"
          value={usernameFromStore}
          type="text"
          errors={errors}
          ref={register({
            minLength: {
              value: 3,
              message: "Your username needs to be at least 3 characters.",
            },
            maxLength: {
              value: 20,
              message: "Your username needs to be at maximum 20 characters.",
            },
            validate: {
              checkUsername: async (value) => {
                if (value === usernameFromStore) {
                  return true;
                }
                return (
                  (await api.isUsernameFree(value)) ||
                  "this username is not free"
                );
              },
            },
          })}
        />
        <FormInput
          key={2}
          label="Email address"
          name="email"
          type="text"
          value={emailFromStore}
          errors={errors}
          ref={register({
            minLength: {
              value: 6,
              message: "Your email needs to be at least 6 characters.",
            },
            validate: () => {
              return isEmail(watch("email")) || "Enter correct email";
            },
          })}
        />
        <FormInput
          key={3}
          label="New password"
          name="password"
          type="password"
          value=""
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter password" },
            minLength: {
              value: 8,
              message: "Your password needs to be at least 8 characters.",
            },
            maxLength: {
              value: 40,
              message: "Your password needs to be at maximum 40 characters.",
            },
          })}
        />
        <FormInput
          key={4}
          label="Avatar image (url)"
          name="image"
          type="text"
          value={imageFromStore}
          errors={errors}
          ref={register({
            minLength: { value: 8, message: "too short" },
            validate: () => {
              return isURL(watch("image")) || "Enter correct url";
            },
          })}
        />

        <button className={form.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  serverErrors: state.serverErrors,
  authorization: state.authorization,
});

const mapDispatchToProps = (dispatch) => ({
  setServerErrors: (errors) => dispatch(setServerErrors(errors)),
  logIn: () => dispatch(logIn()),
  clearServerError: () => dispatch(clearServerError()),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
