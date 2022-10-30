import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
//import FoodSourceFactory from "../../artifacts/contracts/foodSourceFactory.sol/FoodSourceFactory.json";
import FoodSourceFactory from "../FoodSourceFactory.json";
import { DUMMY_DATA } from "../utils/constants";
import { Coordinates, GeoMapProps } from "../utils/types";
import Modal from "./Modal";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from "buffer";

const GeoMap: React.FC<GeoMapProps> = ({ isWalletConnected }) => {
  const [currentCoordinates, setCurrentCoordinates] =
    useState<GeolocationCoordinates>();
  const [newMarkerCoordinates, setNewMarkerCoordinates] =
    useState<Coordinates>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [validMonths, setValidMonths] = useState<number[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [account, setAccount] = useState<any>("");

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

  const contractAddress = "0xbC111a8018aE6648948A85eBBacCC10Ace5C2901";

  const getCoordinates = (e: any) => {
    if (isWalletConnected) {
      setNewMarkerCoordinates(e.lngLat);
      console.log("new coordinates", newMarkerCoordinates);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoordinates(position.coords);
      });
    }
  }, []);

  const mintingNFT = async () => {
    let metadata: string = JSON.stringify({
      name,
      description,
      imageUrl,
      latitude,
      longitude,
    });

    const added = await ipfs?.add(metadata); // ipfs
    const uri = `https://ipfs.infura.io/ipfs/${added?.path}`; // after metadata is uploaded to IPFS, return the URL to use it in the transaction
    console.log(uri);
    try {
      if (window.ethereum) {
        const currentAccount = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccount(currentAccount);

        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        console.log(provider);
        const signer = provider.getSigner();
        const foodsourceManager = new ethers.Contract(
          contractAddress,
          FoodSourceFactory.abi,
          signer
        );
        const foodSource = await foodsourceManager.createFoodSource(
          [uri, uri],
          validMonths
        );
        console.log(foodSource);
      }
    } catch {}
  };

  const theme = document.getElementsByTagName("html")[0];
  console.log(theme.dataset.theme);
  const setMapTheme = () =>
    theme.dataset.theme === "dark" ? "dark" : "streets";

  return (
    <div className="md:container md:mx-auto">
      {currentCoordinates && (
        <Map
          mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
          style={{ height: "70vh" }}
          mapStyle={`mapbox://styles/mapbox/${setMapTheme()}-v9`}
          onDblClick={(e) => getCoordinates(e)}
          initialViewState={{
            longitude: currentCoordinates?.longitude,
            latitude: currentCoordinates?.latitude,
            zoom: 10,
          }}
        >
          {/* get NFTs and display them */}
          {DUMMY_DATA.map((element, index) => {
            return (
              <Marker
                longitude={element.lon}
                latitude={element.lat}
                anchor="bottom"
                key={index} // better to add id here when we have the metadata
              >
                {" "}
                <img
                  src="./mapbox-icon.png"
                  alt="Pin Marker"
                  className="marker"
                />
              </Marker>
            );
          })}
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ maxZoom: 16 }}
            trackUserLocation={true}
            showAccuracyCircle={true}
            showUserLocation={true}
            position={"bottom-right"}
          />
          {/* mint nft / create new food source */}
          {isWalletConnected && newMarkerCoordinates && (
            <Marker
              longitude={newMarkerCoordinates.lng}
              latitude={newMarkerCoordinates.lat}
              anchor="bottom"
              draggable={true}
              onDragEnd={(e) =>
                console.log(
                  "AFTER DRAG",
                  getCoordinates(e),
                  newMarkerCoordinates.lng,
                  newMarkerCoordinates.lat
                )
              }
              onClick={() => setIsOpen(true)}
            >
              {" "}
              <img
                src="./mapbox-icon.png"
                alt="Pin Marker"
                className="marker"
              />
            </Marker>
          )}
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setImageUrl={setImageUrl}
            setName={setName}
            setDescription={setDescription}
            setValidMonths={setValidMonths}
          />
        </Map>
      )}
    </div>
  );
};

export default GeoMap;
