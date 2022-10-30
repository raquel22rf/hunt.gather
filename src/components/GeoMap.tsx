import React, { useEffect, useState } from "react";
import Map, { Marker, GeolocateControl, Popup } from "react-map-gl";
import Multiselect from "multiselect-react-dropdown";
import { MONTHS_OF_YEAR, DUMMY_DATA } from "../utils/constants";
import { Coordinates, GeoMapProps } from "../utils/types";
import FoodSourceForm from "./FoodSourceForm";
import Modal from "./Modal";
import { ethers } from "ethers";

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

  /** const mintingNFT = async () => {
    let metadata: string = JSON.stringify({
      name,
      description,
      imageUrl,
      latitude,
      longitude
    })

    const added = await client.add(metadata);
    const uri = `https://ipfs.infura.io/ipfs/${added.path}`; // after metadata is uploaded to IPFS, return the URL to use it in the transaction 
       
    const account = await window.ethereum.request({ method: "eth_accounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const weddingManager = new ethers.Contract(
      contractAddress,
      WeddingContract.abi,
      signer
    );
    const weddingRing = await weddingManager.createRing(tokenUri);
    console.log(weddingRing);
  };*/

  const theme = document.getElementsByTagName("html")[0];
  console.log(theme.dataset.theme);
  const setMapTheme = () =>
    theme.dataset.theme === "dark" ? "dark" : "streets";

  return (
    <div className="md:container md:mx-auto">
      {currentCoordinates ? (
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
      ) : (
        <div className="flex justify-self-center">
          <div className="spin "></div>
        </div>
      )}
    </div>
  );
};

export default GeoMap;

// <Popup
//   longitude={newMarkerLong}
//   latitude={newMarkerLat}
//   closeButton={true}
//   closeOnClick={false}
//   onClose={() => {
//     setNewMarkerLat(undefined);
//     setNewMarkerLong(undefined);
//   }}
//   className="geomap-popup"
// >
//   <FoodSourceForm setImageUrl={setImageUrl} setName={setName} setDescription={setDescription} setValidMonths={setValidMonths}/>
// </Popup>
