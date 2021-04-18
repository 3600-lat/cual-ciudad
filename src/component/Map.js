import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2V2ZXJvYm8iLCJhIjoiY2trdTUxbWplMWs4ZDJxcW4wNDN6eTJ4bCJ9.nCWWPY2Lb8WuEngFH3GKNQ";

// See https://dev.to/justincy/using-mapbox-gl-in-react-d2n
function useMapBox({ onUpdate }) {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    // Don't create the map until the ref is connected to the container div.
    // Also don't create the map if it's already been created.
    if (ref.current) {
      if (map === null) {
        const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/severobo/ckku5e4l92qh117n4v7kmg91k",
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(
          new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" })
        );
        setMap(map);
      } else {
        onUpdate(map);
      }
    }
  }, [ref, map, onUpdate]);
  return { ref };
}

export default function Map(props) {
  const onUpdateHandler = (map) => {
    // Add data and events here
    // set the bounds, center and zoom
    const cx = props.place.longitude;
    const cy = props.place.latitude;
    var bounds = [
      [cx - 0.42, cy - 0.42], // Southwest
      [cx + 0.42, cy + 0.42], // Northeast
    ];
    map.setMaxBounds(bounds);
    map.setCenter([cx, cy]);
    map.setZoom(12.5);
  };
  const { ref } = useMapBox({ onUpdate: onUpdateHandler });
  return <div ref={ref} className="map-container" />;
}
