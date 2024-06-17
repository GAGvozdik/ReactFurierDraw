import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon} from "react-leaflet";
import { LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import theme from '../../src/components/theme';


import { Feature, Geometry, GeoJsonObject } from 'geojson'; // Import GeoJSON types
// 
// const MapWithPolygons: React.FC = () => {

//   const polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = [
//     [51.515, 7],
//     [70.52, 55],
//     [51.52, 15],
//   ];

//   return (
//     <>
//       <div style={{ width: '100vw', height: '100vh' }}>
//         <MapContainer center={[51, 50]} zoom={5} style={{ height: '100%' }} zoomControl={false}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


//           <Polygon positions={polygon} color={"blue"} />

//         </MapContainer>
//       </div>
//     </>
//   );
// };



// export default MapWithPolygons;



import {
  Circle,
  Tooltip
} from "react-leaflet";

export default function MapWithPolygons() {
  const geo = useRef(null);
  const map = useRef(null);
  const [iten, setIten] = useState(null);


  fetch('simplePoly.geojson')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Вы можете работать с данными здесь
  });

  useEffect(() => {
    const load = async () => {
      fetch(

        // "https://uploads.codesandbox.io/uploads/user/62b9dbb1-3c1c-4e7b-ba99-83e8a1d963e6/B5_7-municipios.geojson"
        // 'https://disk.yandex.ru/d/z75EWc90X9unbA'
        // "https://github.com/GAGvozdik/Mercator/blob/main/gisexample/src/myPoly/Ocean.geojson"
        "simplePoly.geojson"
        // 'https://github.com/GAGvozdik/Mercator/blob/main/gisexample/src/components/simplePoly.geojson'
      )
        .then((r) => r.json())
        .then((r) => {
          setIten(r);
          console.log("ok");
        });
    };

    load();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>


    <MapContainer zoom={0} center={[0, 0]} style={{ height: '100%' }} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {iten && (
          <GeoJSON
            data={iten}
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
        )}
      </MapContainer>
    </div>
  );
}




// import features from '../../src/components/simplePoly.json';

// type MyGeoJsonType = GeoJsonObject & {
//   features: Feature<Geometry, { BCR: number; BCRNAME: string; Label: string }>[];
// };

// export const Page = () => {
//   const geoJsonData: MyGeoJsonType = bar;

//   return (
//     <main>
//       <MapContainer center={[45, -95]} zoom={3}>
//         <TileLayer
//           // ...other props
//         />
//         <GeoJSON data={geoJsonData} />
//       </MapContainer>
//     </main>
//   );
// };




// interface MapWithPolygonsProps {
//   geoJsonData: GeoJsonObject; // тип для GeoJSON данных
// }


// const gjd = {
//   "type": "FeatureCollection",
//   "features": [
//   { "type": "Feature", "properties": { "Id": 0 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 5.330322265625, 82.210693359375 ], [ 50.3682861328125, 84.99932861328125 ], [ 40.18951416015625, 72.17108154296875 ], [ -13.21478271484375, 59.76129150390625 ], [ 5.330322265625, 82.210693359375 ] ] ] } },
//   { "type": "Feature", "properties": { "Id": 0 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 47.8585205078125, 62.82891845703125 ], [ 69.05291748046875, 55.29931640625 ], [ 8.9556884765625, 45.2598876953125 ], [ 23.95892333984375, 59.9500732421875 ], [ 47.8585205078125, 62.82891845703125 ] ] ] } }
//   ]
//   };



// export default function MapWithPolygons() {


//     const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);

//     useEffect(() => {
//       // Загрузка данных из файла simplePoly.geojson
//       fetch('./simplePoly.geojson')
//         .then(response => response.json())
//         .then(data => setGeoJsonData(data));
//     }, []);


//   return (

//     <div style={{ width: '100vw', height: '100vh' }}>

//       <MapContainer zoom={0} center={[0, 0]} style={{ height: '100%' }} zoomControl={false}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {geoJsonData && <GeoJSON data={geoJsonData} style={() => ({ color: 'blue', weight: 2 })} />}
//       </MapContainer>

//     </div>
//   );
// };






  

