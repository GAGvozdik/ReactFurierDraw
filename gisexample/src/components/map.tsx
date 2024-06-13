


import React, { useState, useEffect} from 'react';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet/dist/leaflet.css';

import './Map.css';

// import { MapContainer, Marker } from 'react-leaflet';
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";


// function MainMap() {




const MainMap: React.FC = () => {
//   useEffect(() => {
//     // Создание карты
//     const map = L.map('map').setView([51.505, -0.09], 13);

//     // Добавление слоя карты
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
//   }, []);

  return (
    <div id="map" style={{ height: "400px" }}></div>
  );
};




export default MainMap;


