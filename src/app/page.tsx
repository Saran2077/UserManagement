"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UserForm from "./components/form";
import UserTable from "./components/table";
import styles from "./page.module.css";
import { getRandomString, User } from "./utils/config";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DeleteConfirmationModal from "./components/alertDialog";
const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId?: number | string | null;
  }>({ isOpen: false });

  const handleToggleModal = (userData?: User | undefined) => {
    setIsModalOpen((prevState) => !prevState);
    setFormData(userData || null);
  };
  console.log("varshhhh");

  const handleAddUser = (userData: User) => {
    if (userData?.id) {
      setUsers((prevState) =>
        prevState.map((user) => {
          if (user.id === userData.id) {
            return userData;
          }
          return user;
        })
      );
    } else {
      const newUser = { ...userData, id: getRandomString(8) };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId: string | number | null) => {
    console.log("Deleting user with ID:", userId);
    setDeleteConfirmation({ isOpen: true, userId });
  };
  const confirmDelete = () => {
    console.log("Deleting user:", deleteConfirmation);
    if (deleteConfirmation.userId !== undefined) {
      console.log("Users before deletion:", users);
      setUsers(users.filter((user) => user.id !== deleteConfirmation.userId));
      console.log("Users after deletion:", users);
    }
    setDeleteConfirmation({ isOpen: false });
  };

  const handleEditUser = (userData: User) => {
    setEditingUser(userData);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>User list</h1>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleToggleModal()}
        >
          Add
        </Button>
      </div>
      <UserTable
        userList={users as any}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser as any}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => handleToggleModal()}
        maxWidth="md"
        fullWidth
        // BackdropProps={{ invisible: true }}
        BackdropProps={{ invisible: true }}
      >
        <IconButton
          aria-label="close"
          onClick={() => handleToggleModal()}
          sx={{
            position: "absolute",
            right: 24,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <UserForm onSubmit={handleAddUser as any} user={editingUser as any} />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false })}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default MainPage;
