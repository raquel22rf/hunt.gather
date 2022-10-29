import { useEffect, useState } from "react";
import "./App.css";
import GeoMap from "./components/GeoMap";
import Web3Wallet from "./components/Web3Wallet";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from "buffer";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [images, setImages] = useState<{ cid: CID; path: string }[]>([]);

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

  useEffect(() => {
    console.log(images);
  });

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
    <div className="px-2">
      <header className="App-header">
        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
      <article className="prose flex flex-col justify-center ">
        <h1 className="pt-6">hunt.gather</h1>
        <GeoMap isWalletConnected={isWalletConnected} />
        {!isWalletConnected ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4  py-2 px-4 rounded-full"
            onClick={() => setIsWalletConnected(true)}
          >
            Add food source
          </button>
        ) : (
          <Web3Wallet />
        )}
      </article>
      {ipfs && (
        <>
          <p>Upload File using IPFS</p>

          <form onSubmit={onSubmitHandler}>
            <input name="file" type="file" />

            <button type="submit">Upload File</button>
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
        </>
      )}
    </div>
  );
};

export default App;
