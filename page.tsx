"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Search, Calendar, Video, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?specialty=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 space-y-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-3xl w-full"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mx-auto">
          <Activity className="h-4 w-4" />
          <span>Premium Healthcare Access</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 pb-2">
          Find Your Doctor. <br /> Book Instantly.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless healthcare. Search for top-rated doctors nearby, 
          book clinic visits or secure video consultations in seconds.
        </p>

        <div className="w-full max-w-xl mx-auto pt-6 flex gap-2 relative">
          <Search className="absolute left-4 top-4 h-6 w-6 text-muted-foreground z-10" />
          <Input 
            placeholder="Search doctors by specialty or name..." 
            className="h-14 bg-background/80 glass text-md rounded-2xl pl-12 pr-4 border-white/10 focus-visible:ring-primary/50 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <Button onClick={handleSearch} className="h-14 px-8 rounded-2xl shadow-lg shadow-primary/25 text-md">
            Search
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/search">
            <Button size="lg" variant="ghost" className="h-12 px-6 text-base w-full sm:w-auto hover:bg-primary/10 hover:text-primary">
              <MapPin className="mr-2 h-4 w-4" />
              Browse All Doctors
            </Button>
          </Link>
          <Link href={session ? "/search" : "/register"}>
            <Button size="lg" variant="outline" className="h-12 px-6 text-base w-full sm:w-auto glass">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12"
      >
        <div className="glass-card p-6 flex flex-col items-center text-center space-y-4 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
          <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <MapPin className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-semibold">Location Based</h3>
          <p className="text-muted-foreground">Find the best specialists in your area using our interactive map.</p>
        </div>
        
        <div className="glass-card p-6 flex flex-col items-center text-center space-y-4 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
            <Video className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-semibold">Telemedicine</h3>
          <p className="text-muted-foreground">Secure, high-quality video consultations from the comfort of your home.</p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center space-y-4 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
          <div className="h-14 w-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Activity className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-semibold">Instant Booking</h3>
          <p className="text-muted-foreground">Real-time calendar availability to prevent double booking.</p>
        </div>
      </motion.div>
    </div>
  );
}
