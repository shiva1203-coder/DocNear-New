"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), { ssr: false });

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [phone, setPhone] = useState("");
  const [medicalCertificate, setMedicalCertificate] = useState("");
  const [yearOfRegistration, setYearOfRegistration] = useState("");
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone, medicalCertificate, yearOfRegistration, stateMedicalCouncil, latitude: position?.[0], longitude: position?.[1] }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md glass-card border-white/10 mt-[-5vh]">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Join DocNear to find or provide healthcare</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-background/50" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/50" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">I am a...</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-background/30 p-2 rounded-md border border-white/5 flex-1 justify-center">
                  <input type="radio" value="PATIENT" checked={role === "PATIENT"} onChange={(e) => setRole(e.target.value)} className="text-primary accent-primary" />
                  <span className="text-sm font-medium">Patient</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-background/30 p-2 rounded-md border border-white/5 flex-1 justify-center">
                  <input type="radio" value="DOCTOR" checked={role === "DOCTOR"} onChange={(e) => setRole(e.target.value)} className="text-primary accent-primary" />
                  <span className="text-sm font-medium">Doctor</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="bg-background/50" placeholder="+1234567890" />
            </div>
            {role === "DOCTOR" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="certificate">Medical Certificate Number</Label>
                  <Input id="certificate" value={medicalCertificate} onChange={(e) => setMedicalCertificate(e.target.value)} required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearOfRegistration">Year of Registration</Label>
                  <Input id="yearOfRegistration" value={yearOfRegistration} onChange={(e) => setYearOfRegistration(e.target.value)} required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateMedicalCouncil">State Medical Council</Label>
                  <Input id="stateMedicalCouncil" value={stateMedicalCouncil} onChange={(e) => setStateMedicalCouncil(e.target.value)} required className="bg-background/50" />
                </div>
                <div className="space-y-2 mt-2">
                  <Label>Clinic Location</Label>
                  <LocationPicker position={position} setPosition={setPosition} />
                </div>
              </>
            )}
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
