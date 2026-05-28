"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Video, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchAppointments();
  }, [session]);

  if (loading) return <div className="p-12 text-center text-muted-foreground">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20 shadow-inner">
          {session?.user?.name?.charAt(0) || "P"}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session?.user?.name}. Manage your appointments here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{appointments.filter(a => a.status === "PENDING" || a.status === "CONFIRMED").length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-500">{appointments.filter(a => a.status === "COMPLETED").length}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Your Appointments</h2>
      
      {appointments.length === 0 ? (
        <Card className="glass-card p-12 text-center border-dashed border-2">
          <p className="text-muted-foreground">You have no appointments yet.</p>
          <Button className="mt-4" variant="outline">Find Doctors</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="glass-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${apt.type === "ONLINE" ? "bg-blue-500/20 text-blue-500" : "bg-teal-500/20 text-teal-400"}`}>
                    {apt.type === "ONLINE" ? <Video className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{apt.doctor?.name || "Dr. Unknown"}</h3>
                    <p className="text-sm text-primary">{apt.doctor?.doctorProfile?.specialty || "Specialist"}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(apt.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${apt.status === "PENDING" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" : apt.status === "CONFIRMED" ? "bg-blue-500/20 text-blue-500" : apt.status === "COMPLETED" ? "bg-green-500/20 text-green-500" : "bg-destructive/20 text-destructive"}`}>
                    {apt.status}
                  </span>
                  {apt.type === "ONLINE" && apt.status === "CONFIRMED" && (
                    <Button size="sm" className="ml-2">Join Call</Button>
                  )}
                  {apt.status === "CONFIRMED" && apt.doctor?.doctorProfile?.phone && (
                    <a href={`https://wa.me/${apt.doctor.doctorProfile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="ml-2 bg-[#25D366] hover:bg-[#20bd5a] text-white">
                        <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
