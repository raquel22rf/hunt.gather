import Multiselect from "multiselect-react-dropdown";
import UploadImage from "./UploadImage";
import { MONTHS_OF_YEAR } from "../utils/constants";

const FoodSourceForm = () => {
  const handleSubmit = () => {
    console.log("click!");
  };

  return (
    <article className="prose flex flex-col justify-center ">
      <form className="flex flex-col">
        <div>
          <label className="label">
            <span className="label-text">What did you find?</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">When is it available?</span>
          </label>
          <Multiselect options={MONTHS_OF_YEAR} displayValue="name" />
        </div>
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">What can you do with it?</span>
          </label>
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
      </form>
      <UploadImage />
      <button
        className="btn btn-outline btn-secondary my-3"
        onClick={() => handleSubmit()}
      >
        upload
      </button>
    </article>
  );
};

export default FoodSourceForm;
