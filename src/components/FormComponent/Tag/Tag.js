import React from "react";
import classes from "./Tag.module.scss";

const Tag = React.forwardRef((props, ref) => {
  const {
    name,
    last,
    placeholder,
    errors,
    onDelete,
    onAdd,
    value = "",
  } = props;
  return (
    <div className={classes.tag__item}>
      <div className={classes.tag__input_box}>
        <input
          className={classes.tag__input}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          type="text"
          errors={errors}
          ref={ref}
        />
      </div>
      <button className={classes.tag__delete} type="button" onClick={onDelete}>
        Delete
      </button>
      {last && (
        <button className={classes.tag__add} type="button" onClick={onAdd}>
          Add tag
        </button>
      )}
    </div>
  );
});
export default Tag;
