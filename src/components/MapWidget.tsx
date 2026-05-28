"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

export default function MapWidget({ doctors }: { doctors: any[] }) {
  const [center, setCenter] = useState<[number, number]>([37.7749, -122.4194]);

  useEffect(() => {
    if (doctors.length > 0 && doctors[0].latitude && doctors[0].longitude) {
      setCenter([doctors[0].latitude, doctors[0].longitude]);
    }
  }, [doctors]);

  return (
    <div className="w-full h-full z-0">
      <MapContainer center={center} zoom={12} className="w-full h-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={center} />
        {doctors.map((doc) => (
          doc.latitude && doc.longitude && (
            <Marker key={doc.id} position={[doc.latitude, doc.longitude]} icon={icon}>
              <Popup className="rounded-xl overflow-hidden shadow-xl border-0">
                <div className="p-1 space-y-2 min-w-[200px]">
                  <h4 className="font-bold text-base text-foreground block">{doc.user?.name}</h4>
                  <p className="text-sm text-primary font-medium m-0">{doc.specialty}</p>
                  <p className="text-xs text-muted-foreground m-0 pb-1">{doc.address}</p>
                  <Link href={`/doctor/${doc.id}`} className="block w-full mt-2">
                    <Button size="sm" className="w-full h-8">View Profile</Button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}
