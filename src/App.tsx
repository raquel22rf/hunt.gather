import React, { useEffect, useState } from "react";
import "./App.css";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import { Web3Button, useConnectModal } from "@web3modal/react";

const coordinates = [
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

const App = () => {
  return (
    <div className="artboard phone-1">
      <div>
        <h1>hunt.gather</h1>
        <Map
          mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          <Marker longitude={-9} latitude={38} anchor="bottom">
            {" "}
            <img src="./mapbox-icon.png" alt="Pin Marker" className="marker" />
          </Marker>
          ;
          {coordinates.map((element) => {
            console.log(element?.lat);
            return (
              <Marker
                longitude={element.lon}
                latitude={element.lat}
                anchor="bottom"
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
            trackUserLocation={true}
          />
        </Map>
      </div>
      <div>
        <Web3Button />
      </div>
    </div>
  );
};

export default App;
