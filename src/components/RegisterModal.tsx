import React, { useState } from "react";
import { Box, TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import logo from "../assets/SwipeMove-3.png"; // Logo path

interface RegisterModalProps {
  onClose: () => void;
  open: boolean;
  onRegister: (userName: string) => void; // Pass the registered name to parent
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, open, onRegister }) => {
  const [userName, setUserName] = useState("");

  const handleRegister = () => {
    // Handle registration logic here
    onRegister(userName); // Call onRegister with the user name
    onClose(); // Close the modal after registration
  };

  const handleCancel = () => {
    onClose(); // Close the modal if canceled
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <img src={logo} alt="SwipeMove Logo" style={{ width: "150px", marginBottom: "20px" }} />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* User Name Field */}
          <TextField
            label="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            variant="outlined"
            required
            sx={{
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleRegister} variant="contained" sx={{ backgroundColor: "#5DC2BB", color: "white" }}>
          Register
        </Button>
        <Button onClick={handleCancel} variant="outlined" sx={{ color: "#FF5F5F", borderColor: "#FF5F5F" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
