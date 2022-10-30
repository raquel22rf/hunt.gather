import Multiselect from "multiselect-react-dropdown";
import UploadImage from "./UploadImage";
import { MONTHS_OF_YEAR } from "../utils/constants";
import { FoodSourceFormProps } from "../utils/types";
import { useEffect, useState } from "react";

const FoodSourceForm: React.FC<FoodSourceFormProps> = ({
  handleClose,
  setImageUrl,
  setName,
  setDescription,
  setValidMonths,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  const handleFormDataChange = (e: any) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("click!");
    handleClose();
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
            onChange={handleFormDataChange}
            value={formData.name}
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">What can you do with it?</span>
          </label>
          <input
            type="text"
            placeholder="Description"
            onChange={handleFormDataChange}
            value={formData.description}
            className="input input-bordered input-md input-secondary w-full max-w-xs"
          />
        </div>
      </form>
      <UploadImage setImageUrl={setImageUrl} />
      <div>
        <label className="label">
          <span className="label-text">When is it available?</span>
        </label>
        <Multiselect options={MONTHS_OF_YEAR} displayValue="name" />
      </div>
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
