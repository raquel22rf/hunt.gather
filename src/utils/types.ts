export interface GeoMapProps {
  isWalletConnected: boolean;
}

export interface FoodSourceFormProps {
  setImageUrl: (imageUrl: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setValidMonths: (validMonths: number[]) => void;
  handleClose: () => void;
}

export interface UploadImagesProps {
  setImageUrl: (imageUrl: string) => void;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setImageUrl: (imageUrl: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setValidMonths: (validMonths: number[]) => void;
}
