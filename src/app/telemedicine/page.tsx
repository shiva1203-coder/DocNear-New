"use client";

import { motion } from "framer-motion";
import { Video, Shield, Headphones, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TelemedicinePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] -z-10" />
        <div className="container mx-auto text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-blue-500 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4"
          >
            <Video className="h-4 w-4" />
            <span>Secure Video Consultations</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-foreground"
          >
            Doctor Visits <br /> <span className="text-primary italic">Simplified.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Consult with top specialists from anywhere in the world. 
            No waiting rooms, no travel, just quality healthcare at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link href="/search">
              <Button size="lg" className="h-14 px-10 rounded-2xl text-lg shadow-xl shadow-primary/25">
                Find Online Doctor <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl text-lg glass border-white/10">
              How it Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Placeholder for Trust Logos */}
           <div className="text-xl font-bold italic tracking-wider">HEALTHCARE+</div>
           <div className="text-xl font-bold italic tracking-wider">MEDTRUST</div>
           <div className="text-xl font-bold italic tracking-wider">GLOBALMED</div>
           <div className="text-xl font-bold italic tracking-wider">SECURECONSULT</div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Why Choose Our <br /> Telemedicine Platform?</h2>
            <div className="space-y-6">
              {[
                { icon: Shield, title: "100% Private & Secure", desc: "Our platform is HIPAA compliant and uses end-to-end encryption for all calls." },
                { icon: Headphones, title: "24/7 Support", desc: "Access healthcare anytime with our round-the-clock emergency video services." },
                { icon: Globe, title: "Global Experts", desc: "Consult with international specialists without leaving your home." },
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-3xl bg-gradient-to-tr from-primary to-blue-600 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-background overflow-hidden relative">
                   <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <Video className="h-32 w-32 text-primary opacity-20" />
                   </div>
                   <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-sm font-semibold">Live Session in Progress</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium italic">"The consultation was seamless. It felt just like being in the clinic but much more comfortable."</p>
                   </div>
                </div>
             </div>
             <div className="absolute -top-6 -right-6 h-32 w-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Start Your Consultation in 3 Steps</h2>
            <p className="text-muted-foreground">Easy, fast, and completely digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Select Doctor", desc: "Choose from our list of verified online specialists." },
              { step: "02", title: "Book a Slot", desc: "Pick a time that works for you and pay securely." },
              { step: "03", title: "Join Video Call", desc: "Access the call from your dashboard at the scheduled time." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl space-y-4 relative border-white/10 hover:border-primary/50 transition-colors group">
                <span className="text-6xl font-black text-primary/5 absolute top-4 right-8 group-hover:text-primary/10 transition-colors">{item.step}</span>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                   <CheckCircle className="h-6 w-6 text-primary" /> {item.title}
                </h3>
                <p className="text-muted-foreground text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
