import React, { useState } from "react";
import { Box, TextField, Button, Typography, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import logo from "../assets/SwipeMove-3.png"; // Logo path

interface LoginModalProps {
  onClose: () => void;
  open: boolean;
  onLogin: (userName: string) => void; // Prop for login functionality
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, open, onLogin }) => {
  const [userName, setUserName] = useState("");

  const handleLogin = () => {
    // Call the onLogin function passed down from the parent component
    onLogin(userName);
    onClose(); // Close the modal after logging in
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
          {/* User Name Field for Login */}
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
        <Button onClick={handleLogin} variant="contained" sx={{ backgroundColor: "#5DC2BB", color: "white" }}>
          Log In
        </Button>
        <Button onClick={handleCancel} variant="outlined" sx={{ color: "#FF5F5F", borderColor: "#FF5F5F" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
