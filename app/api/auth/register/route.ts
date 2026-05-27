import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, phone, medicalCertificate, yearOfRegistration, stateMedicalCouncil, latitude, longitude } = await req.json();
    
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (role === "DOCTOR" && (!phone || !medicalCertificate || !yearOfRegistration || !stateMedicalCouncil || !latitude || !longitude)) {
      return NextResponse.json({ error: "Doctors must provide all verification fields including clinic location" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Mocked simple storage
        role,
        phone,
      }
    });

    if (role === "DOCTOR") {
      await prisma.doctorProfile.create({
        data: {
          userId: user.id,
          specialty: "General Practitioner",
          consultationFee: 150,
          latitude: latitude,
          longitude: longitude,
          address: "Healthcare Center",
          phone: phone,
          medicalCertificate: medicalCertificate,
          yearOfRegistration: yearOfRegistration,
          stateMedicalCouncil: stateMedicalCouncil,
          approvalStatus: "PENDING",
        }
      });
    }

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
