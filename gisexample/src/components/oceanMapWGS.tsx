import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon} from "react-leaflet";
import { LatLngExpression} from "leaflet";
import {  FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; 
import "leaflet/dist/leaflet.css";
import theme from './theme';

// const oceanPoly: FeatureCollection = require('../../src/data/Ocean.json');
const oceanPoly: FeatureCollection = require('../../src/data/s1.json');

export default function MapWithPolygons() {

  return (
    <div style={{ width: '100vw', height: '100vh' }}>

      <MapContainer zoom={2.6} center={[70, 70]} style={{ height: '100%' }} zoomControl={false}>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON 
          data={oceanPoly} 
          style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
          />

      </MapContainer>

    </div>
  );
}








  

