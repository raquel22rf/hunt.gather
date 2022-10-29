import React, { useEffect, useState } from "react";
import Map, { Marker, GeolocateControl, Popup } from "react-map-gl";
import Multiselect from "multiselect-react-dropdown";
import { MONTHS_OF_YEAR, DUMMY_DATA } from "../utils/constants";
import { Coordinates, GeoMapProps } from "../utils/types";
import FoodSourceForm from "./FoodSourceForm";
import Modal from "./Modal";

const GeoMap: React.FC<GeoMapProps> = ({ isWalletConnected, setLatitude, setLongitude }) => {
  const [currentCoordinates, setCurrentCoordinates] =
    useState<GeolocationCoordinates>();
  const [newMarkerCoordinates, setNewMarkerCoordinates] =
    useState<Coordinates>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

  return (
    <div className="md:container md:mx-auto">
      {currentCoordinates ? (
        <Map
          mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
          style={{ height: "70vh" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
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
              onClick={() => console.log("click")}
            >
              {" "}
              <img
                src="./mapbox-icon.png"
                alt="Pin Marker"
                className="marker"
              />
            </Marker>
          )}
          {modalIsOpen && <Modal />}
        </Map>
      ) : (
        <div className="flex">
          <div className="spin w-1/2"></div>
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
//   <FoodSourceForm />
// </Popup>
