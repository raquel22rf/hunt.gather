import React, { useState } from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from "buffer";
import { UploadImagesProps } from "../utils/types";

const UploadImage: React.FC<UploadImagesProps> = () => {
  /**
   * @description event handler that uploads the file selected by the user
   */
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file);

    const uniquePaths = new Set([
      ...images.map((image) => image.path),
      result.path,
    ]);
    const uniqueImages = [...uniquePaths.values()].map((path) => {
      return [
        ...images,
        {
          cid: result.cid,
          path: result.path,
        },
      ].find((image) => image.path === path);
    });

    // @ts-ignore
    setImages(uniqueImages);

    form.reset();
  };

  const [images, setImages] = useState<{ cid: CID; path: string }[]>([]);

  const projectId = process.env.REACT_APP_INFURA_ID;
  const projectSecret = process.env.REACT_APP_INFURA_SECRET;

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  return (
    <div>
      {!ipfs ? (
        <header>
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        </header>
      ) : (
        <article className="prose flex flex-col justify-center ">
          <label className="label">
            <span className="label-text text-md">Upload image</span>
          </label>
          <form onSubmit={onSubmitHandler}>
            <label className="block">
              <span className="sr-only">Choose File</span>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs text-sm"
              />
            </label>
            <button
              type="submit"
              className="btn btn-outline btn-secondary my-3"
            >
              Upload File
            </button>
          </form>
        </article>
      )}
    </div>
  );
};

export default UploadImage;
