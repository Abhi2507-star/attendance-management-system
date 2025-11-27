import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`
        mt-12 relative rounded-2xl overflow-hidden transition-all duration-300
        ${
          theme === "minimalist"
            ? "bg-white border-2 border-slate-200 shadow-md text-slate-800"
            : "border border-cyan-500/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/30"
        }
      `}
    >

      {/* Cyber grid background */}
      {theme === "cyberpunk" && (
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
      )}

      {/* Animated glowing line – top */}
      {theme === "cyberpunk" && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
      )}

      <div className="relative z-10 p-6">

        {/* Terminal header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div
              className={`
                w-2.5 h-2.5 rounded-full
                ${
                  theme === "minimalist"
                    ? "bg-red-500"
                    : "bg-red-500 shadow-lg shadow-red-500/50"
                }
              `}
            />
            <div
              className={`
                w-2.5 h-2.5 rounded-full
                ${
                  theme === "minimalist"
                    ? "bg-yellow-500"
                    : "bg-amber-500 shadow-lg shadow-amber-500/50"
                }
              `}
            />
            <div
              className={`
                w-2.5 h-2.5 rounded-full animate-pulse
                ${
                  theme === "minimalist"
                    ? "bg-green-600"
                    : "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                }
              `}
            />
          </div>

          <span
            className={`
              font-mono text-xs
              ${
                theme === "minimalist"
                  ? "text-slate-600"
                  : "text-cyan-400"
              }
            `}
          >
            █ SYSTEM STATUS: ONLINE
          </span>
        </div>

        {/* Developer credits */}
        <div className="text-center space-y-2">
          <div
            className={`
              font-mono text-sm font-bold tracking-wider
              ${
                theme === "minimalist"
                  ? "text-blue-700"
                  : "text-cyan-400"
              }
            `}
          >
            &lt;/&gt; DEVELOPED BY
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">

            {/* TUSHAR */}
            <a
              href="https://github.com/Technophile58"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all
                ${
                  theme === "minimalist"
                    ? "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                    : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-cyan-500/40"
                }
              `}
            >
              Tushar Pant
            </a>
            <span className={theme === "minimalist" ? "text-slate-500" : "text-cyan-500"}>•</span>

            {/* ABHISHEK */}
            <a
              href="https://github.com/Abhi2507-star"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all
                ${
                  theme === "minimalist"
                    ? "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                    : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-cyan-500/40"
                }
              `}
            >
              Abhishek Mishra
            </a>
            <span className={theme === "minimalist" ? "text-slate-500" : "text-cyan-500"}>•</span>

            {/* ANKIT */}
            <a
              href="https://github.com/Ankitshahi895"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all
                ${
                  theme === "minimalist"
                    ? "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                    : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-cyan-500/40"
                }
              `}
            >
              Ankit Kumar Shahi
            </a>
            <span className={theme === "minimalist" ? "text-slate-500" : "text-cyan-500"}>•</span>

            {/* ALOK */}
            <a
              href="https://github.com/Mishra-Alok"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all
                ${
                  theme === "minimalist"
                    ? "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                    : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-cyan-500/40"
                }
              `}
            >
              Alok Kumar
            </a>
          </div>

          {/* Build info */}
          <div
            className={`
              font-mono text-[10px] mt-3 flex items-center justify-center gap-3
              ${theme === "minimalist" ? "text-slate-500" : "text-slate-500"}
            `}
          >
            <span className="flex items-center gap-1">
              <div
                className={`
                  w-1.5 h-1.5 rounded-full animate-pulse
                  ${theme === "minimalist" ? "bg-emerald-500" : "bg-emerald-400"}
                `}
              />
              BUILD: v2.0.0
            </span>
            <span>|</span>
            <span>© Student Attendance Management</span>
          </div>
        </div>
      </div>

      {/* Bottom glowing line */}
      {theme === "cyberpunk" && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      )}
    </footer>
  );
}
