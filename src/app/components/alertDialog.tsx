import { Button, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}> = ({ isOpen, onClose, onDelete }) => {
  return (
    isOpen && (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogContent>
          <p style={{ fontSize: 20 }}>Are you sure you want to delete?</p>
        </DialogContent>
        <DialogActions style={{ padding: 10 }}>
          <Button className="edit-btn" onClick={onDelete}>
            Yes
          </Button>
          <Button className="delete-btn" onClick={onClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};
export default DeleteConfirmationModal;
