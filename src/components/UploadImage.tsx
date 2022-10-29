import React, { useState } from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from "buffer";

const UploadImage = () => {
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

  const projectId = "2GoLceGgGWOzXdWgQdVamXSe61t";
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
          <h4>Upload Image</h4>
          <form onSubmit={onSubmitHandler}>
            <label className="block">
              <span className="sr-only">Choose File</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded-full"
            >
              Upload File
            </button>
          </form>

          <div>
            {images.map((image, index) => (
              <img
                alt={`Uploaded #${index + 1}`}
                src={"https://hunt-gather.infura-ipfs.io/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
                key={image.cid.toString() + index}
              />
            ))}
          </div>
        </article>
      )}
    </div>
  );
};

export default UploadImage;
