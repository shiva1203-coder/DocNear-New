"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PendingDoctorsList({ doctors: initialDoctors }: { doctors: any[] }) {
  const [doctors, setDoctors] = useState(initialDoctors);

  const handleUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/approve-doctor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorProfileId: id, status })
      });
      if (res.ok) {
        setDoctors(docs => docs.filter(d => d.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (doctors.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-foreground text-yellow-500">Pending Doctor Approvals</h2>
      <div className="space-y-4">
        {doctors.map(doc => (
          <Card key={doc.id} className="glass-card border-yellow-500/30">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                 <h3 className="font-bold text-lg text-foreground">{doc.user.name}</h3>
                 <p className="text-sm text-muted-foreground">{doc.user.email} | Ph: {doc.phone}</p>
                 <p className="text-sm text-primary font-medium mt-1 uppercase tracking-wider">Medical Cert: {doc.medicalCertificate}</p>
                 <p className="text-sm text-muted-foreground mt-1 font-medium">Council: <span className="text-foreground">{doc.stateMedicalCouncil}</span> | YOR: <span className="text-foreground">{doc.yearOfRegistration}</span></p>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => handleUpdate(doc.id, "REJECTED")}>Reject</Button>
                 <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleUpdate(doc.id, "APPROVED")}>Approve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
