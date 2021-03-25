import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "antd";
import FormInput from "../FormInput";
import Tag from "../Tag";

import classes from "./FormArticle.module.scss";

const FormArticle = (props) => {
  const [tagsCount, setTagsCount] = useState(1);
  const [tagsDefault, setTagsDefault] = useState({});

  const { onSubmit, isNew, articleData = {}, formTitle } = props;
  const {
    title: defaultTitle,
    description: defaultDesc,
    body: defaultBody,
    tagList: tegsListFromProps,
    error,
  } = articleData;

  useEffect(() => {
    if (!isNew) {
      setTagsCount(tegsListFromProps.length);
      const tagObject = {};
      tegsListFromProps.reverse().forEach((tag, i) => {
        tagObject[`tag${i + 1}`] = tag;
      });
      setTagsDefault(tagObject);
    }
  }, [isNew, tegsListFromProps]);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: defaultTitle,
      description: defaultDesc,
      body: defaultBody,
    },
  });

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

  const deleteTagHandler = () => {
    setTagsCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };
  const addTagHandler = () => {
    setTagsCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const tagsInputs = [];
  let last = false;
  for (let i = 1; i <= tagsCount; i++) {
    if (i === tagsCount) last = true;
    tagsInputs.push(
      <Tag
        key={i}
        name={`tag${i}`}
        placeholder="Tag"
        errors={errors}
        last={last}
        onDelete={deleteTagHandler}
        onAdd={addTagHandler}
        value={tagsDefault[`tag${i}`] || ""}
        ref={register({
          required: { value: true, message: "this field is required" },
          minLength: { value: 1, message: "too short" },
        })}
      />
    );
  }

  return (
    <div className={classes.article__container}>
      {error && errorHandler(error)}
      <h1 className={classes.title}>{formTitle}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          key={1}
          label="Title"
          name="title"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "too short" },
            maxLength: { value: 20, message: "too long" },
          })}
        />
        <FormInput
          key={2}
          label="Short description"
          name="description"
          type="text"
          errors={errors}
          ref={register({
            required: { value: true, message: "this field is required" },
            minLength: { value: 6, message: "too short" },
          })}
        />
        <div className={classes.body}>
          <div className={classes.body__label}>Text</div>
          <textarea
            className={classes.body__textarea}
            name="body"
            rows="7"
            placeholder="Text"
            errors={errors}
            ref={register({
              required: { value: true, message: "this field is required" },
              minLength: { value: 6, message: "too short" },
            })}
          />
        </div>
        <div className={classes.tags}>
          <div className={classes.tags__label}>Tags</div>
          {tagsInputs}
        </div>

        <div className={classes.sendButtonBox}>
          <button className={classes.button} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormArticle;
