import React from "react";
import { DateTime } from "luxon";

import userLogo from "../../image/user-logo.svg";
import classes from "./UserInfo.module.scss";

const UserInfo = ({ author, createdAt, showDate }) => {
  const dt = DateTime.fromISO(createdAt, { locale: "en" });
  const { username, image } = author;
  return (
    <div className={classes.UserInfo}>
      <div className={classes.UserInfo__info}>
        <div className={classes.UserInfo__name}>{username}</div>
        {showDate && (
          <div className={classes.UserInfo__date}>
            {`${dt.monthLong} ${dt.day}, ${dt.year}`}
          </div>
        )}
      </div>
      <img
        className={classes.UserInfo__avatar}
        src={image || userLogo}
        alt=""
      />
    </div>
  );
};

export default UserInfo;
