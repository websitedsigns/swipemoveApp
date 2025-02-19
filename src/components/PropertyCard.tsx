//PropertyCard.tsx

import React from "react";
import { Property } from "../../types/types";
import { Box, Typography } from "@mui/material";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        width: "100%", // Full width for mobile
        maxWidth: { xs: "90%", sm: "300px" }, // Limit width for desktop
        margin: "auto",
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      <img
        src={property.image}
        alt={property.address}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.2rem" } }}
        >
          £{property.price.toLocaleString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "gray", fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {property.bedrooms} Bedrooms | {property.type}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "gray", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          {property.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default PropertyCard;
