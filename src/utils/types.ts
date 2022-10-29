export interface GeoMapProps {
  isWalletConnected: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
