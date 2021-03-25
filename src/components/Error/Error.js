import React from "react";
import { Result } from "antd";

import classes from "./error.module.scss";

const Error = () => {
  return (
    <div className={classes.error}>
      <Result
        status="warning"
        title="There are some problems with your operation."
      />
    </div>
  );
};
export default Error;
