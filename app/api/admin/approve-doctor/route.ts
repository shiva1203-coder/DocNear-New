import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { doctorProfileId, status } = await req.json();

    const profile = await prisma.doctorProfile.update({
      where: { id: doctorProfileId },
      data: { approvalStatus: status }
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
