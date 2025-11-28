import axios from "axios";
import Cookies from "js-cookie";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AUTH_COOKIE_NAME } from "../types/CookieVars";
import { useTheme } from "../Contexts/ThemeContext";

export default function PerformanceCard() {
  const { theme } = useTheme();
  const [cgpa, setCgpa] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (!token) return;

    const fetchCGPA = async () => {
      try {
        const res = await axios.get(
          "https://kiet.cybervidya.net/api/student/dashboard/performance",
          {
            headers: { Authorization: `GlobalEducation ${token}` },
          }
        );

        const value = res.data?.data;
        if (value && typeof value === "string") {
          const clean = value.replace("CGPA", "").trim();
          setCgpa(clean);
        } else {
          setCgpa(null);
        }
      } catch (error) {
        console.error("Performance API Error:", error);
        setCgpa(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCGPA();
  }, []);

  const progress = cgpa ? Math.min(parseFloat(cgpa) * 10, 100) : 0;

  return (
    <div
      className={`
        relative rounded-3xl p-6 transition-all duration-300 overflow-hidden group
        ${
          theme === "minimalist"
            ? "bg-white border-2 border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 text-slate-800"
            : "border border-cyan-400/40 bg-slate-900/70 backdrop-blur-2xl shadow-[0_0_45px_rgba(56,189,248,0.7)] hover:shadow-[0_0_65px_rgba(56,189,248,1)] hover:-translate-y-1"
        }
      `}
    >

      {/* Cyber grid */}
      {theme === "cyberpunk" && (
        <>
          {/*<div className="absolute inset-0 opacity-[0.06] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>*/}

          {/* Glow pulse */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Hologram scanning bar */}
          <div className="holo-scan pointer-events-none" />

          {/* Top neon beam */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp
            className={`
            h-6 w-6
            ${
              theme === "minimalist"
                ? "text-blue-600"
                : "text-cyan-300 animate-pulse drop-shadow-[0_0_10px_cyan]"
            }
          `}
          />
          <h2
            className={`
              text-xl font-bold tracking-widest font-mono
              ${
                theme === "minimalist"
                  ? "text-slate-800"
                  : "text-cyan-200"
              }
            `}
          >
            PERFORMANCE
          </h2>
        </div>

        {/* CGPA */}
        <p
          className={`
            text-sm font-mono tracking-wider
            ${theme === "minimalist" ? "text-slate-600" : "text-cyan-300/80"}
          `}
        >
          CGPA
        </p>

        <h1
          className={`
            text-5xl font-extrabold mt-1 tabular-nums transition-all duration-300
            ${
              theme === "minimalist"
                ? "text-blue-600"
                : "bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_25px_cyan]"
            }
          `}
        >
          {loading ? "…" : cgpa ?? "N/A"}
        </h1>

        {/* Progress bar */}
        <div
          className={`
            mt-5 h-3 rounded-full overflow-hidden border 
            ${
              theme === "minimalist"
                ? "bg-slate-200 border-slate-300"
                : "bg-slate-800/60 border-cyan-400/40 shadow-[inset_0_0_15px_rgba(56,189,248,0.5)]"
            }
          `}
        >
          <div
            className={`
              h-full transition-all duration-700 rounded-full
              ${
                theme === "minimalist"
                  ? "bg-blue-600"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_cyan]"
              }
            `}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status */}
        <p
          className={`
            mt-3 text-xs font-mono tracking-wide
            ${theme === "minimalist" ? "text-slate-600" : "text-cyan-300/70"}
          `}
        >
          {cgpa ? "⚡ EXCELLENT PROGRESS — KEEP IT UP" : "⏳ FETCHING DATA…"}
        </p>
      </div>
    </div>
  );
}
