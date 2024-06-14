


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
import styles from './panelStyles.module.scss';
import theme from './theme';


interface MapProps {
  className?: string; // Добавьте className
  classes?: any; // Добавьте className
  theme?: Theme;

}

export default function MainMap(props: MapProps) {
  
    const classes = theme;

    return (

      
      <div style={{ width: '100vw', height: '90vh' }}>
      {/* <div className={styles.MainMap}> */}
        <MapContainer center={[51, 50]} zoom={1} style={{ height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>


    );
  };

// export default MainMap;


