import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalProps } from "../utils/types";
import FoodSourceForm from "./FoodSourceForm";

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, setImageUrl, setName, setDescription, setValidMonths }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <FoodSourceForm setImageUrl={setImageUrl} setName={setName} setDescription={setDescription} setValidMonths={setValidMonths}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
