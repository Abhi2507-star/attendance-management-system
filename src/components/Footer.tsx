export default function Footer() {
  return (
    <footer className="mt-12 relative rounded-2xl border border-cyan-500/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/30 overflow-hidden">

      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Animated glowing line – top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

      <div className="relative z-10 p-6">

        {/* Terminal header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
          </div>
          <span className="text-cyan-400 font-mono text-xs">
            █ SYSTEM STATUS: ONLINE
          </span>
        </div>

        {/* Developer credits */}
        <div className="text-center space-y-2">
          <div className="text-cyan-400 font-mono text-sm font-bold tracking-wider">
            &lt;/&gt; DEVELOPED BY
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">

            {/* TUSHAR */}
            <a
              href="https://github.com/Technophile58"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 rounded-lg 
              text-cyan-300 font-mono text-xs font-semibold shadow-lg shadow-cyan-500/20 
              hover:bg-cyan-500/30 hover:shadow-cyan-500/40 transition-all"
            >
              Tushar Pant
            </a>
            <span className="text-cyan-500">•</span>

            {/* ABHISHEK */}
            <a
              href="https://github.com/Abhi2507-star"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 rounded-lg 
              text-cyan-300 font-mono text-xs font-semibold shadow-lg shadow-cyan-500/20 
              hover:bg-cyan-500/30 hover:shadow-cyan-500/40 transition-all"
            >
              Abhishek Mishra
            </a>
            <span className="text-cyan-500">•</span>

            {/* AMBIKESH – placeholder for now */}
            <a
              href="#"
              className="px-3 py-1.5 bg-slate-800/50 border border-cyan-500/30 rounded-lg 
              text-slate-400 font-mono text-xs font-semibold shadow-lg shadow-cyan-500/10 
              cursor-not-allowed"
            >
              Ambikeshwar Dutt Dwivedi (GitHub Soon)
            </a>
            <span className="text-cyan-500">•</span>

            {/* ANKIT */}
            <a
              href="https://github.com/Ankitshahi895"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 rounded-lg 
              text-cyan-300 font-mono text-xs font-semibold shadow-lg shadow-cyan-500/20 
              hover:bg-cyan-500/30 hover:shadow-cyan-500/40 transition-all"
            >
              Ankit Kumar Shahi
            </a>
            <span className="text-cyan-500">•</span>

            {/* ALOK (same as Ankit's per your message) */}
            <a
              href="https://github.com/Mishra-Alok"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 rounded-lg 
              text-cyan-300 font-mono text-xs font-semibold shadow-lg shadow-cyan-500/20 
              hover:bg-cyan-500/30 hover:shadow-cyan-500/40 transition-all"
            >
              Alok Kumar
            </a>
          </div>

          {/* Build info */}
          <div className="text-slate-500 font-mono text-[10px] mt-3 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              BUILD: v2.0.0
            </span>
            <span>|</span>
            <span>© Student Attendance Management</span>
          </div>
        </div>
      </div>

      {/* Bottom glowing line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
    </footer>
  );
}
