"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return position ? <Marker position={position} icon={icon} /> : null;
}

export default function LocationPicker({ position, setPosition }: any) {
  return (
    <div className="h-48 w-full rounded-md overflow-hidden border border-white/10 z-0 relative">
      <MapContainer center={[37.7749, -122.4194]} zoom={12} className="h-full w-full" zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div className="absolute top-2 left-2 z-[1000] bg-background/90 px-2 py-1.5 rounded-md text-xs font-semibold shadow-md pointer-events-none">
        Click map to pin clinic location
      </div>
    </div>
  );
}
