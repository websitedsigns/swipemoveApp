import { Property } from "../../types/types";
import { sampleProperties } from "../data/propertyData";

export const handleSearch = (
  filters: {
    minPrice: number;
    maxPrice: number;
    minBedrooms: number;
    maxBedrooms: number;
    type: string;
  },
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  setSearchFilters: React.Dispatch<React.SetStateAction<any>>,
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setSearchFilters(filters); // Save the filters
  
  // Simulate the filtering of sampleProperties based on search filters
  const filteredProperties = sampleProperties.filter((property) => {
    return (
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice &&
      property.bedrooms >= filters.minBedrooms &&
      property.bedrooms <= filters.maxBedrooms &&
      (filters.type === "" ||
        property.type.toLowerCase() === filters.type.toLowerCase())
    );
  });

  setProperties(filteredProperties); // Update the properties with the filtered list
  setShowSearchModal(false); // Close the modal after searching
};
