import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson"; // Импорт типа GeoJsonObject

const MapWithPolygons: React.FC = () => {
  const [geojsonData, setGeojsonData] = useState<GeoJsonObject | null>(null); // Указываем тип GeoJsonObject

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const response = await fetch('../../src/myPoly/Ocean.json');
        const data: GeoJsonObject = await response.json(); // Указываем тип данных
        setGeojsonData(data);
      } catch (error) {
        console.error("Failed to fetch GeoJSON", error);
      }
    };
    fetchGeoJson();
  }, []);

  return (

    <div style={{ width: '100vw', height: '100vh' }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh" }}  zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geojsonData && (
            <GeoJSON data={geojsonData} style={() => ({
            color: "blue",
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.3,
            })} />
        )}
        </MapContainer>
    </div>
  );
};

export default MapWithPolygons;
