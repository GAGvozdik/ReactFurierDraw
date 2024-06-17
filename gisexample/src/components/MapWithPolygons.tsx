import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon} from "react-leaflet";
import { LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson"; // Импорт типа GeoJsonObject

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
  useEffect(() => {
    const load = async () => {
      fetch(

        // "https://uploads.codesandbox.io/uploads/user/62b9dbb1-3c1c-4e7b-ba99-83e8a1d963e6/B5_7-municipios.geojson"
        // "https://github.com/GAGvozdik/Mercator/blob/main/gisexample/src/myPoly/Ocean.geojson"
        "simplePoly.geojson"
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

