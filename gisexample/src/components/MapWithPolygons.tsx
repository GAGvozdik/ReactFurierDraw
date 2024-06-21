import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon} from "react-leaflet";
import { LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import theme from '../../src/components/theme';

import {  FeatureCollection, Feature, Geometry, GeoJsonObject } from 'geojson'; // Import GeoJSON types




     

// import oceanPoly from '../../src/myPoly/Ocean.json';
// import oceanGeoPoly from '../../src/myPoly/Ocean.geojson';

import f from '../../src/myPoly/func';
import CustomTreeItem from './catalog';

import {
  Circle,
  Tooltip
} from "react-leaflet";


const oceanPoly: FeatureCollection = require('../../src/myPoly/Ocean.json');
// const oceanPoly: FeatureCollection = require('./sP');
// const oceanPoly: FeatureCollection = require('../../src/myPoly/Ocean.geojson');



const polyGeoJs: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
  { "type": "Feature", "properties": { "Id": 0 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.330322265625, 82.210693359375 ], [ 50.3682861328125, 84.99932861328125 ], [ 40.18951416015625, 72.17108154296875 ], [ -13.21478271484375, 59.76129150390625 ], [ 5.330322265625, 82.210693359375 ] ] ] } },
  { "type": "Feature", "properties": { "Id": 0 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 47.8585205078125, 62.82891845703125 ], [ 69.05291748046875, 55.29931640625 ], [ 8.9556884765625, 45.2598876953125 ], [ 23.95892333984375, 59.9500732421875 ], [ 47.8585205078125, 62.82891845703125 ] ] ] } }
  ]
  };


export default function MapWithPolygons() {

  const polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = [
    [51.515, 7],
    [70.52, 55],
    [51.52, 15],
  ];


  return (
    <div style={{ width: '100vw', height: '100vh' }}>


    <MapContainer zoom={0} center={[0, 0]} style={{ height: '100%' }} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* {iten && (
          <GeoJSON
            data={polyGeoJs}
            ref={geo}
            pathOptions={{
              color: "#9370DB",
              fillColor: "lightblue",
              fillOpacity: 0.7,
              opacity: 1,
              weight: 1
            }}

            attribution="&copy; credits due..."
          ></GeoJSON>
        )} */}


        {/* <Polygon positions={polygon} color={"blue"} /> */}
        <GeoJSON 
          data={oceanPoly} 
          // data={polyGeoJs} 
          style={{ color: 'red', weight: 2, fillOpacity: 0.5 }} 
          />



      </MapContainer>
    </div>
  );
}








  

