// src/pages/LikedProperties.tsx
import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../../types/types';

interface LikedPropertiesProps {
  likedProperties: Property[];
}

const LikedProperties: React.FC<LikedPropertiesProps> = ({ likedProperties }) => {
  return (
    <div>
      <h1>Liked Properties</h1>
      {likedProperties.map((property) => (
        <PropertyCard key={property.id} property={property} onClick={() => window.open(property.url, '_blank')} />
      ))}
    </div>
  );
};

export default LikedProperties;