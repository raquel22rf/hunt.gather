export interface GeoMapProps {
  isWalletConnected: boolean;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
