import React, { useEffect, useState } from "react";
import Map, { Marker, GeolocateControl, Popup } from "react-map-gl";
import Multiselect from 'multiselect-react-dropdown';

const op = [
  { name: 'January',
    value: 1 },
  { name: 'February',
    value: 2 },
  { name: 'March',
    value: 3 },
  { name: 'April',
    value: 4 },
  { name: 'May',
    value: 5 },
  { name: 'June',
    value: 6 },
  { name: 'July',
    value: 7 },
  { name: 'August',
    value: 8 },
  { name: 'September',
    value: 9 },
  { name: 'October',
    value: 10 },
  { name: 'November',
    value: 11 },
  { name: 'December',
    value: 12 }
]

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
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(position => {
          setCurrentLat(position.coords.latitude);
          setCurrentLong(position.coords.longitude);
      }); 
  }
  });

  const [newMarkerLat, setNewMarkerLat] = useState<any>(null);
  const [newMarkerLong, setNewMarkerLong] = useState<any>(null);
  const [currentLat, setCurrentLat] = useState<any>(null);
  const [currentLong, setCurrentLong] = useState<any>(null);

  const handleAddClick = (e: any ) =>{
    const { lat, lng} = e.lngLat;

    setNewMarkerLat(lat);
    setNewMarkerLong(lng);
    console.log('click')
    
    console.log(newMarkerLat, newMarkerLong)
  };
  
  return (
    <div className="md:container md:mx-auto">
      {currentLat && 
      (<Map
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
        style={{ height: "70vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onDblClick = {handleAddClick}
        initialViewState={{
          longitude: currentLong,
          latitude: currentLat,
          zoom: 10
        }}
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

{newMarkerLat && newMarkerLong && (
     <Popup 
        longitude={newMarkerLong} 
        latitude={newMarkerLat}
        anchor="left"
        closeButton ={true}
        closeOnClick={false}
        onClose={() => {setNewMarkerLat(null); setNewMarkerLong(null)}}>
          <form>
            <label> Name: <input type="text" name="name" /> </label>
            <label> Description: <input type="text" name="name" /> </label>
            <Multiselect
              options={op}
              displayValue="name"
              placeholder="Select months where food is available"
              />
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4  py-2 px-4 rounded-full"
            onClick={() => console.log('clickkk')}
          >
            Add
          </button>
    </Popup> 
    )}
      </Map>)}
    </div>
  );
};

export default GeoMap;
