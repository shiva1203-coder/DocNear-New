"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Video, MapPin, Activity, CheckCircle2 } from "lucide-react";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Mock dates for UI
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultType, setConsultType] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  
  const dates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const times = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "04:45 PM"];

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch("/api/doctors");
        const list = await res.json();
        const found = list.find((d: any) => d.id === params.id || d.userId === params.id);
        if (found) setDoctor(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [params.id]);

  const handleBook = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setBooking(true);
    try {
      const selectedDateTime = new Date(dates[selectedDate]);
      
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctor?.user?.id || doctor?.userId || params.id,
          date: selectedDateTime.toISOString(),
          type: consultType,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-muted-foreground flex items-center justify-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span> Loading profile...</div>;
  if (!doctor) return <div className="p-12 text-center text-destructive">Doctor not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Doctor Info */}
        <div className="md:w-1/3 space-y-6">
          <Card className="glass-card text-center border-white/10 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/40 to-blue-500/40" />
            <div className="relative px-4 pb-6 -mt-12 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-background flex items-center justify-center text-4xl text-primary font-bold shadow-lg">
                {doctor.user?.name?.charAt(0) || "D"}
              </div>
              <h1 className="mt-4 text-2xl font-bold">{doctor.user?.name}</h1>
              <p className="text-primary font-medium">{doctor.specialty}</p>
              
              <div className="mt-6 flex flex-col space-y-3 w-full text-left bg-muted/30 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{doctor.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground/80">Fee: ${doctor.consultationFee}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Calendar */}
        <div className="md:w-2/3 space-y-6">
          {success ? (
            <Card className="glass-card border-green-500/30 bg-green-500/5 text-center p-12">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">Your appointment has been successfully scheduled.</p>
              <Button onClick={() => router.push("/dashboard/patient")}>View My Dashboard</Button>
            </Card>
          ) : (
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Select a date, time, and consultation type.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Consultation Type */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Session Type</h3>
                  <div className="flex gap-4">
                    <button 
                      className={`flex flex-1 items-center justify-center gap-2 p-3 rounded-xl border transition-all ${consultType === "ONLINE" ? "bg-primary/20 border-primary text-primary" : "border-border hover:bg-muted"}`}
                      onClick={() => setConsultType("ONLINE")}
                    >
                      <Video className="h-5 w-5" /> <span className="font-semibold">Video Call</span>
                    </button>
                    <button 
                      className={`flex flex-1 items-center justify-center gap-2 p-3 rounded-xl border transition-all ${consultType === "OFFLINE" ? "bg-primary/20 border-primary text-primary" : "border-border hover:bg-muted"}`}
                      onClick={() => setConsultType("OFFLINE")}
                    >
                      <MapPin className="h-5 w-5" /> <span className="font-semibold">Clinic Visit</span>
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Select Date</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x hide-scrollbar">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        className={`flex flex-col items-center min-w-[70px] p-3 rounded-xl border transition-all snap-start ${selectedDate === i ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25" : "bg-card border-border hover:bg-muted"}`}
                        onClick={() => setSelectedDate(i)}
                      >
                        <span className="text-xs uppercase font-medium opacity-80">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xl font-bold my-1">{d.getDate()}</span>
                        <span className="text-xs opacity-80">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {times.map((t, i) => (
                      <button
                        key={i}
                        className={`p-2 rounded-lg border text-sm font-medium transition-all ${selectedTime === t ? "bg-primary/20 border-primary text-primary" : "border-border hover:bg-muted text-foreground"}`}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkout */}
                <div className="pt-4 border-t border-border mt-6">
                  <Button 
                    className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
                    disabled={!selectedTime || booking}
                    onClick={handleBook}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {booking ? "Confirming..." : `Confirm Booking`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
