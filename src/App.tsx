import React, { useEffect, useState } from "react";
import "./App.css";
import Map, { Marker } from "react-map-gl";
import { useGeolocated } from "react-geolocated";

const App = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return (
    <div className="artboard phone-1">
      <h1>hunt.gather</h1>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        Button
      </button>
      <div id="map"></div>
      {coords && (
        <Map
          mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
          initialViewState={{
            longitude: coords?.longitude,
            latitude: coords?.latitude,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker
            longitude={coords.longitude}
            latitude={coords.latitude}
            anchor="bottom"
          >
            <img src="./marker.png" alt="Pin Marker" />
          </Marker>
        </Map>
      )}
    </div>
  );
};

export default App;
