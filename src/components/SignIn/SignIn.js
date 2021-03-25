import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  setServerErrors,
  logIn,
  clearServerError,
  authUser,
} from "../../actionCreator";
import { setLocaltorage } from "../../localStorageUtils";
import FormInput from "../FormComponent/FormInput";
import api from "../../service";
import "antd/dist/antd.css";
import form from "../FormComponent/form.module.scss";
import Error from "../Error";

const SignIn = ({
  setServerErrors,
  serverErrors,
  logIn,
  clearServerError,
  authUser,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const [error, setErrors] = useState(null);

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await api.authUser(data);

      const { errors, user } = response;

      if (errors) {
        setServerErrors(errors);
      }

      if (user) {
        authUser(user);
        logIn();
        clearServerError();
        setLocaltorage("user", user);
        history.push("/articles");
      }
    } catch (e) {
      setErrors(e);
    }
  };

  const errorHandler = (serverErrors) => {
    const errorsNames = Object.keys(serverErrors);
    const errorMsgs = errorsNames.map((err) => {
      const msgs = serverErrors[err].join(` and `);
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
      <h1 className={form.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Email address"
          name="email"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter email" },
            minLength: {
              value: 6,
              message: "Your email needs to be at least 6 characters.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter valid email",
            },
          })}
        />
        <FormInput
          key={2}
          label="Password"
          name="password"
          type="password"
          errors={errors}
          ref={register({
            required: { value: true, message: "Enter valid password" },
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

        <button className={form.button} type="submit">
          Login
        </button>
        <p className={form.accExist}>
          Don’t have an account?&nbsp;
          <Link className={form.accExist__link} to={"/sign-up"}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  serverErrors: state.serverErrors,
});

const mapDispatchToProps = (dispatch) => ({
  setServerErrors: (errors) => dispatch(setServerErrors(errors)),
  logIn: () => dispatch(logIn()),
  clearServerError: () => dispatch(clearServerError()),
  authUser: (user) => dispatch(authUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
