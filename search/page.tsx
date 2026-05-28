"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import MapWidget to avoid SSR issues with Leaflet
const MapWidget = dynamic(() => import("@/components/MapWidget"), { ssr: false });

export default function SearchPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (specialty) p.append("specialty", specialty);
      const res = await fetch("/api/doctors?" + p.toString());
      const data = await res.json();
      setDoctors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left panel: Filters and List */}
      <div className="w-full md:w-[450px] lg:w-[500px] border-r border-white/10 flex flex-col bg-background/95 backdrop-blur z-10 sticky top-16 h-full">
        <div className="p-4 border-b border-white/10 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Find Doctors NEAR You</h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Specialty (e.g. Cardiologist)" 
                className="pl-8 bg-background/50"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchDoctors()}
              />
            </div>
            <Button variant="outline" size="icon" onClick={fetchDoctors}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-muted-foreground text-center py-8 flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
              Loading doctors...
            </p>
          ) : doctors.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No doctors found for this criteria.</p>
          ) : (
            doctors.map((doc) => (
              <Card key={doc.id} className="glass-card hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary border border-primary/20">
                    <span className="text-xl font-bold">{doc.user?.name?.charAt(0) || "D"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate text-foreground">{doc.user?.name || "Unknown Doctor"}</h3>
                    <p className="text-primary text-sm font-medium">{doc.specialty}</p>
                    <div className="flex items-center text-muted-foreground text-sm mt-2">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-teal-400" />
                      <span className="truncate">{doc.address || "Location hidden"}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium text-foreground">4.8</span>
                        <span className="text-muted-foreground ml-1">(120)</span>
                      </div>
                      <Link href={`/doctor/${doc.id}`}>
                        <Button size="sm" className="h-8">Book</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Right panel: Map */}
      <div className="hidden md:block flex-1 h-full relative bg-muted/20">
        <MapWidget doctors={doctors} />
      </div>
    </div>
  );
}
