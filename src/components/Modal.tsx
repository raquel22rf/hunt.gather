import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { ModalProps } from "../utils/types";
import FoodSourceForm from "./FoodSourceForm";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  setImageUrl,
  setName,
  setDescription,
  setValidMonths,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>add new food source</DialogTitle>
        <DialogContent>
          <FoodSourceForm
            setImageUrl={setImageUrl}
            setName={setName}
            setDescription={setDescription}
            setValidMonths={setValidMonths}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
