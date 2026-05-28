"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageSquare, Maximize } from "lucide-react";

export default function TelemedicineRoom() {
  const params = useParams();
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [ended, setEnded] = useState(false);

  if (ended) {
    return (
      <div className="flex items-center justify-center min-h-[85vh] p-4">
        <Card className="glass-card p-12 text-center max-w-md w-full border-white/10">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Consultation Ended</h1>
          <p className="text-muted-foreground mb-8">Thank you for using DocNear Telemedicine. Your secure session has been closed.</p>
          <button onClick={() => router.back()} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Return to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-black/95 p-4 lg:p-6 text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Secure Video Consultation</h2>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            End-to-end encrypted • Session #{params.id}
          </p>
        </div>
        <div className="bg-gray-800/80 px-4 py-1.5 rounded-full font-mono text-sm border border-gray-700">
          14:23
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
          {/* Main Remote Video Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-teal-900/20">
            <div className="h-32 w-32 rounded-full border-4 border-gray-800 bg-gray-800 flex items-center justify-center text-5xl font-bold text-gray-500 shadow-xl overflow-hidden group">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${params.id}&backgroundColor=b6e3f4`} alt="Remote User" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-4 text-xl font-medium text-gray-300">Dr. Sarah Jenkins</p>
            <p className="text-sm text-gray-500">Connected</p>
          </div>
          
          {/* Controls overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur rounded-lg text-gray-300 transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            Dr. Jenkins (Host)
          </div>
        </div>

        {/* Sidebar Stream / Local Video constraints */}
        <div className="flex flex-col gap-4">
          <div className="relative h-48 lg:h-1/3 rounded-2xl overflow-hidden bg-gray-900 border border-gray-700 shadow-xl group">
             {videoOn ? (
               <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-600">
                 [Your Camera Feed]
               </div>
             ) : (
               <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                 <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                   You
                 </div>
               </div>
             )}
             <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                You
             </div>
             {!micOn && (
               <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur p-1 rounded">
                 <MicOff className="h-3 w-3 text-white" />
               </div>
             )}
          </div>
          
          {/* Placeholder Chat/Notes panel */}
          <div className="flex-1 bg-gray-900/50 rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-gray-800 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Session Chat</span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-center">
               <p className="text-xs text-gray-600 px-4">Messages sent here are end-to-end encrypted and not saved after the session.</p>
            </div>
            <div className="p-3 border-t border-gray-800">
              <input type="text" placeholder="Type a message..." className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-600 transition-colors" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="mt-6 flex justify-center pb-4 lg:pb-0">
        <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl px-8 py-4 rounded-full border border-white/5 shadow-2xl">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`p-4 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-500/20 hover:bg-red-500/30 text-red-500'}`}
          >
            {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>
          
          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`p-4 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-500/20 hover:bg-red-500/30 text-red-500'}`}
          >
            {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </button>

          <div className="w-px h-8 bg-gray-700 mx-2"></div>

          <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors flex md:hidden lg:flex">
            <Settings className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setEnded(true)}
            className="p-4 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors font-medium ml-4 shadow-lg shadow-red-600/20 flex items-center gap-2 tracking-wide"
          >
            <PhoneOff className="h-5 w-5" />
            <span className="hidden sm:inline">End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
