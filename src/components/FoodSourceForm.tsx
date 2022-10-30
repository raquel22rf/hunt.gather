import Multiselect from "multiselect-react-dropdown";
import UploadImage from "./UploadImage";
import { MONTHS_OF_YEAR } from "../utils/constants";
import { FoodSourceFormProps } from "../utils/types";
import { useEffect, useState } from "react";
import { Field, Formik } from "formik";

const FoodSourceForm: React.FC<FoodSourceFormProps> = ({
  handleClose,
  setImageUrl,
  setName,
  setDescription,
  setValidMonths,
}) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("click!");
    handleClose();
  };
  return (
    <article className="prose flex flex-col justify-center ">
      <div>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ name: "", description: "", availability: [] }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered input-md input-secondary w-full max-w-xs"
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <input
                type="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered input-md input-secondary w-full max-w-xs"
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              {/* <Field
                className="custom-select"
                name="multiLanguages"
                options={MONTHS_OF_YEAR}
                component={Multiselect}
                placeholder="Select availability..."
                isMulti={true}
              /> */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
      {/* <form className="flex flex-col">
        <div>
          <label className="label">
            <span className="label-text">what did you find?</span>
          </label>
          <input
            type="text"
            placeholder="name"
            onChange={handleFormDataChange}
            value={formData.name}
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">when is it available?</span>
          </label>
          <Multiselect options={MONTHS_OF_YEAR} displayValue="name" />
        </div>
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">what can you do with it?</span>
          </label>
          <input
            type="text"
            placeholder="description"
            onChange={handleFormDataChange}
            value={formData.description}
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
      </form> */}
      <UploadImage setImageUrl={setImageUrl} />
      <button
        className="btn btn-outline btn-secondary my-3"
        onClick={(e) => handleSubmit(e)}
      >
        upload
      </button>
    </article>
  );
};

export default FoodSourceForm;
