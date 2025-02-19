import React, { useState, useEffect } from "react";
import SwipeContainer from "../components/SwipeContainer";
import SearchFilters from "../components/SearchFilters";
import WelcomeScreen from "../components/WelcomeScreen";
import { Property } from "../../types/types";
import { sampleProperties } from "../data/propertyData";
import {
  IconButton,
  Button,
  Box,
  Badge,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropertyCard from "../components/PropertyCard";
import "./Home.css";
import logo from "../assets/SwipeMove-3.png";

const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    minBedrooms: 0,
    maxBedrooms: 0,
    type: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Liked properties dropdown
  const [loginAnchorEl, setLoginAnchorEl] = useState<null | HTMLElement>(null); // Login dropdown
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null); // User menu dropdown

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ name: string } | null>(null); // User state

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setUser({ name: storedUserName });
    }

    // Only fetch liked properties if the user is logged in
    if (storedUserName) {
      const storedLikedProperties = localStorage.getItem("likedProperties");
      if (storedLikedProperties) {
        setLikedProperties(JSON.parse(storedLikedProperties));
      }
    }
  }, []);

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleCloseLogin = () => {
    setLoginAnchorEl(null);
  };

  const handleLogin = () => {
    setUser({ name: username });
    localStorage.setItem("userName", username);
    setLoginAnchorEl(null); // Close after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userName");
    setLikedProperties([]); // Clear liked properties on logout
    localStorage.removeItem("likedProperties"); // Clear liked properties from localStorage
    setUserMenuAnchorEl(null); // Close user menu
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
  };

  const handlePropertyLike = (property: Property) => {
    if (user) {
      const updatedLikedProperties = [...likedProperties, property];
      setLikedProperties(updatedLikedProperties);
      localStorage.setItem("likedProperties", JSON.stringify(updatedLikedProperties)); // Save to localStorage
    }
  };

  const handleRemoveProperty = (property: Property) => {
    const updatedLikedProperties = likedProperties.filter(
      (likedProperty) => likedProperty.id !== property.id
    );
    setLikedProperties(updatedLikedProperties);
    localStorage.setItem("likedProperties", JSON.stringify(updatedLikedProperties)); // Save to localStorage
  };

  const handleClearLikedProperties = () => {
    setLikedProperties([]);
    localStorage.removeItem("likedProperties"); // Clear from localStorage
  };

  return (
    <div>
      {showWelcome ? (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "#f5f5f5",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            {/* Search Button */}
            <IconButton onClick={() => setShowSearchModal(true)}>
              <SearchIcon />
            </IconButton>

            {/* Logo */}
            <img
              src={logo}
              alt="SwipeMove Logo"
              style={{ width: "150px", height: "auto", maxWidth: "100%" }}
            />

            {/* Liked Properties and User Authentication */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Badge badgeContent={likedProperties.length} color="primary">
                </Badge>
              </IconButton>

              {!user ? (
                <>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#5DC2BB", color: "white" }}
                    onClick={handleLoginClick}
                  >
                    Sign In
                  </Button>

                  {/* Login Pop-down Menu */}
                  <Menu
                    anchorEl={loginAnchorEl}
                    open={Boolean(loginAnchorEl)}
                    onClose={handleCloseLogin}
                    sx={{ marginTop: "5px" }}
                  >
                    <Box sx={{ padding: "15px", width: "250px" }}>
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        size="small"
                        margin="dense"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        margin="dense"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ marginTop: "10px", backgroundColor: "#6200ea" }}
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </Box>
                  </Menu>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={handleUserMenuClick}
                  >
                    {user.name}
                  </Typography>

                  {/* User Menu (Sign Out and View Saved Properties) */}
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleCloseUserMenu}
                    sx={{ marginTop: "5px" }}
                  >
                 
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Box>

          {/* Liked Properties Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {likedProperties.map((property) => (
              <MenuItem
                key={property.id}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <PropertyCard property={property} onClick={() => {}} />
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering the link
                    handleRemoveProperty(property);
                  }}
                  sx={{ marginLeft: "10px", fontSize: "12px" }}
                >
                  Remove
                </Button>
              </MenuItem>
            ))}
            <MenuItem onClick={handleClearLikedProperties}>Clear All</MenuItem>
          </Menu>

          {/* Search Filters Modal */}
          {showSearchModal && (
            <SearchFilters
              onSearch={(filters) => {
                setSearchFilters(filters);
                setShowSearchModal(false);
              }}
              onClose={() => setShowSearchModal(false)}
            />
          )}

          {/* Main Content */}
          <Box sx={{ marginTop: "80px" }}>
            {properties.length > 0 ? (
              <SwipeContainer
                properties={properties}
                onSwipeLeft={() => {}}
                onSwipeRight={handlePropertyLike} // When a property is swiped right, like it
              />
            ) : (
              <Box className="landing-page">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#5DC2BB",
                    color: "white",
                    marginTop: "20px",
                  }}
                  onClick={() => setProperties(sampleProperties)}
                >
                  Start Swiping
                </Button>
                <Box className="sample-properties">
                  {sampleProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={() => window.open(property.url, "_blank")}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default Home;
