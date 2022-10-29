import React, { useEffect } from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";

const DUMMY_DATA = [
  {
    name: "apple tree",
    lat: 38,
    lon: -11,
  },
  {
    name: "orange tree",
    lat: 35,
    lon: -9,
  },
];

interface GeoMapProps {
  isWalletConnected: boolean;
}

const GeoMap: React.FC<GeoMapProps> = ({ isWalletConnected }) => {
  useEffect(() => {
    console.log("lat", Map);
  });
  return (
    <div className="md:container md:mx-auto">
      <Map
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
        style={{ height: "70vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {isWalletConnected && (
          <Marker longitude={-9} latitude={38} anchor="bottom">
            {" "}
            <img src="./mapbox-icon.png" alt="Pin Marker" className="marker" />
          </Marker>
        )}
        ;
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
      </Map>
    </div>
  );
};

export default GeoMap;