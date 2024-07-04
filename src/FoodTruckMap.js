import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
// Custom icon for the Marker
import truckIcon from './marker-icon.png';

const FoodTruckMap = ({ data, selectedTruck  }) => {
  // San Francisco Center
  const position = [37.7749, -122.4194];
  const mapRef = useRef(null);
  const truckMarkerIcon = L.icon({
    iconUrl: truckIcon,
    iconSize: [20, 32],
    iconAnchor: [20, 32],
    popupAnchor: [0, -32],
  });

    // Handle click on truck/applicant name
    const handleCardClick = useCallback((truck) => {
      console.log(mapRef);
      if (mapRef.current && truck.Location) {
        const [lat, lon] = truck.Location.replace(/[()]/g, '').split(', ').map(Number);

        if (!isNaN(lat) && !isNaN(lon)) {
          mapRef.current.target.setView([lat, lon], 15); // zoom to the selected truck
        }
      }
    }, []);

    useEffect(() => {

      if (selectedTruck) {
        handleCardClick(selectedTruck);
      }
    }, [selectedTruck, handleCardClick]);


    useEffect(() => {
      if (mapRef.current && !mapRef.current.leafletElement) {
        mapRef.current.leafletElement = mapRef.current;
      }
    }, []);

  const handleMapCreated = (map) => {
    mapRef.current = map;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: '350px', width: '100%' }}  whenReady={handleMapCreated}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
      />
      {data.map((truck, index) => {
        if (!truck.Location) {
          return null;
        }

        const [lat, lon] = truck.Location.replace(/[()]/g, '').split(', ').map(Number);

        if (isNaN(lat) || isNaN(lon)) {
          return null;
        }

        return (
          <Marker key={index} position={[lat, lon]} icon={truckMarkerIcon}>
            <Popup>
              <strong>{truck.Applicant}</strong><br />
              {truck.FacilityType}<br />
              {truck.Address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default FoodTruckMap;
