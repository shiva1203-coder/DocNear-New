"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, XCircle, DollarSign, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DoctorDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [fee, setFee] = useState<number>(150);
  const [savingFee, setSavingFee] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const fetchProfile = async () => {
    const res = await fetch("/api/doctor/profile");
    if (res.ok) {
      const data = await res.json();
      if (data.consultationFee) setFee(data.consultationFee);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAppointments();
      fetchProfile();
    }
  }, [session]);

  const updateFee = async () => {
    setSavingFee(true);
    try {
      await fetch("/api/doctor/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fee })
      });
    } finally {
      setSavingFee(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchAppointments(); // Refresh list on UI
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-12 text-center text-muted-foreground">Loading dashboard...</div>;

  const revenue = appointments.filter(a => a.status === "COMPLETED").length * 150;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20 shadow-inner">
          {session?.user?.name?.charAt(0) || "D"}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your schedule and track earnings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{appointments.filter(a => a.status === "PENDING").length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{appointments.filter(a => a.status === "CONFIRMED").length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500 flex items-center"><DollarSign className="h-6 w-6 mr-1 -ml-1 text-green-500/70" />{revenue}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Set Consultation Fee</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-2 mt-2">
            <div className="relative">
              <DollarSign className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <input type="number" className="w-24 h-9 bg-background/50 border border-white/10 rounded-md pl-8 pr-2 outline-none focus:border-primary/50 text-sm font-medium" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
            </div>
            <Button size="sm" onClick={updateFee} disabled={savingFee}>{savingFee ? "Saving..." : "Save Fee"}</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground"><Clock className="h-5 w-5 text-primary" /> Schedule Management</h2>
      
      {appointments.length === 0 ? (
        <Card className="glass-card p-12 text-center border-dashed border-2">
          <p className="text-muted-foreground">No appointments booked yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="glass-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{apt.patient?.name || "Patient"}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-sm border border-border"><Calendar className="h-3 w-3" /> {new Date(apt.date).toLocaleDateString()} {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/20">{apt.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full justify-between sm:w-auto sm:justify-end">
                  {apt.status === "PENDING" && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 border-destructive/30" onClick={() => updateStatus(apt.id, "CANCELLED")}><XCircle className="h-4 w-4 mr-1" /> Decline</Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => updateStatus(apt.id, "CONFIRMED")}><CheckCircle2 className="h-4 w-4 mr-1" /> Accept</Button>
                    </div>
                  )}
                  {apt.status === "CONFIRMED" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto" onClick={() => updateStatus(apt.id, "COMPLETED")}>Mark Completed</Button>
                      {apt.patient?.phone && (
                        <a href={`https://wa.me/${apt.patient.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white">
                            <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                  {apt.status === "COMPLETED" && (
                     <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500 uppercase tracking-wider border border-green-500/20">COMPLETED</span>
                  )}
                  {apt.status === "CANCELLED" && (
                     <span className="px-3 py-1 rounded-full text-xs font-semibold bg-destructive/20 text-destructive uppercase tracking-wider border border-destructive/20">CANCELLED</span>
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
