"use client";

import { motion } from "framer-motion";
import { Pill, Truck, ShieldCheck, Clock, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PharmacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-teal-500 bg-teal-500/10 rounded-full border border-teal-500/20"
          >
            <Pill className="h-4 w-4" />
            <span>Fastest Medicine Delivery</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
          >
            Your Health, <span className="text-primary">Delivered</span> to Your Door.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Order medicines, healthcare products, and wellness essentials from certified pharmacies nearby.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex max-w-lg mx-auto gap-2 pt-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search medicines..." className="pl-10 h-12 glass rounded-xl border-white/10" />
            </div>
            <Button className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">Find</Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "15 Min Delivery", desc: "Express delivery for urgent needs" },
              { icon: ShieldCheck, title: "100% Genuine", desc: "Verified and certified medicines" },
              { icon: ShoppingBag, title: "Best Prices", desc: "Up to 20% off on all orders" },
              { icon: Clock, title: "24/7 Service", desc: "Order anytime, anywhere" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            "Prescriptions", "Ayurvedic", "Personal Care", "Vitamins", "Baby Care", "First Aid"
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer border-white/5 hover:border-primary/30 transition-all aspect-square"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50" />
              <span className="font-medium text-sm">{cat}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotion */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-3xl bg-primary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="space-y-4 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold">New User Discount</h2>
              <p className="text-white/80 text-lg">Get 30% off on your first order with code <span className="font-bold text-white">DOCNEAR30</span></p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl px-10">Shop Now</Button>
            </div>
            <div className="w-48 h-48 bg-white/20 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-sm">
               <Pill className="h-24 w-24 text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
