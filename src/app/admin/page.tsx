import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Calendar } from "lucide-react";
import { PendingDoctorsList } from "@/components/PendingDoctorsList";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const [totalDoctors, totalPatients, totalAppointments] = await Promise.all([
    prisma.user.count({ where: { role: "DOCTOR" } }),
    prisma.user.count({ where: { role: "PATIENT" } }),
    prisma.appointment.count()
  ]);

  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      patient: { select: { name: true, email: true } },
      doctor: { select: { name: true, email: true } }
    }
  });

  const pendingDoctors = await prisma.doctorProfile.findMany({
    where: { approvalStatus: "PENDING" },
    include: { user: true }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20 shadow-inner">
          A
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Control Panel</h1>
          <p className="text-muted-foreground">Manage platform users and view system statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" /> Total Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{totalDoctors}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" /> Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{totalPatients}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-yellow-500" /> Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{totalAppointments}</div>
          </CardContent>
        </Card>
      </div>

      <PendingDoctorsList doctors={pendingDoctors} />

      <h2 className="text-xl font-bold mb-4 text-foreground">Recent Appointments</h2>
      
      {recentAppointments.length === 0 ? (
        <Card className="glass-card p-12 text-center border-dashed border-2">
           <p className="text-muted-foreground">No appointments in the system yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {recentAppointments.map(apt => (
            <Card key={apt.id} className="glass-card transition-colors hover:border-primary/20">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                   <h3 className="font-bold text-lg text-foreground">
                      Patient: <span className="text-primary">{apt.patient.name}</span>
                   </h3>
                   <p className="text-sm text-muted-foreground">Doctor: {apt.doctor.name}</p>
                </div>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                   <span className="font-medium bg-muted px-2 py-1 rounded-sm border border-border">
                     {new Date(apt.date).toLocaleDateString()} {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                   <span className={`px-2 py-1 rounded-sm border text-xs font-semibold tracking-wider ${
                     apt.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                     apt.status === 'CANCELLED' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                     apt.status === 'CONFIRMED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                     'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                   }`}>
                     {apt.status}
                   </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
