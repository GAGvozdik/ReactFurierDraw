


import React, { useState, useEffect} from 'react';
// import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from "leaflet";
// // import './Map.css';

import 'leaflet/dist/leaflet.css';

import {  MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Theme } from '@mui/material/styles'; 

import SlidingPanel from '../../src/components/panel'
import MapWithPolygons from '../../src/components/MapWithPolygons'
import styles from './panelStyles.module.scss';
import theme from './theme';


interface MapProps {
  className?: string; // Добавьте className
  classes?: any; // Добавьте className
  theme?: Theme;
  pr?: string;

}

export default function MainMap(props: MapProps) {
  
    const classes = theme;

    return (
      <>
      {props.pr == 'WGS84' ? (

        <div style={{ width: '100vw', height: '100vh' }}>
          <MapContainer center={[51, 50]} zoom={5} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>

      ) : (

        <div>
          <MapWithPolygons />
        </div>

      )}
      
      </>

    );
  };

// export default MainMap;


