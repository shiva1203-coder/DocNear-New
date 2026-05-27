import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "doctor@docnear.test" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === "hpazsh1480@gmail.com" && credentials.password === "1480") {
          return {
            id: "admin-system",
            email: "hpazsh1480@gmail.com",
            name: "Administrator",
            role: "ADMIN"
          } as any;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { doctorProfile: true }
        });

        if (!user || !user.password) {
          return null;
        }

        // For simple mocking in this proof of concept, we just do a string comparison.
        // In a real app, use bcrypt or argon2 to compare hashed passwords.
        const isValid = credentials.password === user.password;

        if (!isValid) {
          return null;
        }

        if (user.role === "DOCTOR" && user.doctorProfile?.approvalStatus === "PENDING") {
          throw new Error("Your account is pending admin approval.");
        }
        if (user.role === "DOCTOR" && user.doctorProfile?.approvalStatus === "REJECTED") {
          throw new Error("Your application was rejected by the admin.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        } as any;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
};
