import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Linkedin, Instagram, Twitter, Mail } from "lucide-react";

const TARGET_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime();

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET_DATE - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const Index = () => {
  const countdown = useCountdown();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "You're on the list!", description: "We'll notify you when we launch." });
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto animate-fade-in">
        {/* Brand */}
        <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Ancolia Holding</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Under Construction
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-12">
          We're building something exceptional. Stay tuned.
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-6 md:gap-10 mb-14">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className="text-center">
              <span className="block text-4xl md:text-5xl font-bold text-white tabular-nums">
                {String(countdown[unit]).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/50 mt-1 block">
                {unit}
              </span>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Index;
