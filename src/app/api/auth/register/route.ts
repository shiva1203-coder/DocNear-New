import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
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
      }
    });

    if (role === "DOCTOR") {
      await prisma.doctorProfile.create({
        data: {
          userId: user.id,
          specialty: "General Practitioner",
          consultationFee: 150,
          latitude: 37.7749, // mock coords
          longitude: -122.4194,
          address: "Healthcare Center, SF",
        }
      });
    }

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
