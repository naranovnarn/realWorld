import React from "react";
import classes from "./FormInput.module.scss";

const FormInput = React.forwardRef((props, ref) => {
  const { label, name, errors, type } = props;

  return (
    <div className={classes.formInput}>
      <label className={classes.label} htmlFor="">
        {label}
      </label>
      <input
        className={classes.input}
        placeholder={label}
        type={type}
        name={name}
        autoComplete="on"
        ref={ref}
      />
      {errors[name] && (
        <p className={classes.errorMsg}>{`${errors[name].message}`}</p>
      )}
    </div>
  );
});
export default FormInput;
