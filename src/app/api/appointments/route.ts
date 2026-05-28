import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { doctorId, date, type } = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        patientId: (session.user as any).id,
        doctorId,
        date: new Date(date),
        type,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to book" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const role = (session.user as any).role;

    if (role === "DOCTOR") {
      const appointments = await prisma.appointment.findMany({
        where: { doctorId: userId },
        include: { patient: { select: { name: true, phone: true } } },
        orderBy: { date: "asc" }
      });
      return NextResponse.json(appointments);
    } else {
      const appointments = await prisma.appointment.findMany({
        where: { patientId: userId },
        include: { doctor: { select: { name: true, doctorProfile: true } } },
        orderBy: { date: "asc" }
      });
      return NextResponse.json(appointments);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
