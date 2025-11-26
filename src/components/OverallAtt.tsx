import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { AUTH_COOKIE_NAME } from "../types/CookieVars";
import type { AttendanceDataSummaryResponse } from "../types/response";

const OverallAtt = memo(function OverallAtt() {
  const [data, setData] = useState<AttendanceDataSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<AttendanceDataSummaryResponse>(
          "https://kiet.cybervidya.net/api/student/dashboard/attendance",
          {
            headers: {
              Authorization: `GlobalEducation ${Cookies.get(AUTH_COOKIE_NAME)}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError("Failed to load attendance.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const percent = data?.data?.presentPerc ?? 0;

  const getStatusLabel = () => {
    if (percent >= 90) return "EXCELLENT";
    if (percent >= 80) return "SAFE";
    if (percent >= 75) return "BORDERLINE";
    return "AT RISK";
  };

  const getStrokeColor = () => {
    if (percent >= 80) return "#10b981"; // green
    if (percent >= 75) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const getStatusColor = () => {
    if (percent >= 80) return "text-emerald-400 bg-emerald-500/20 border-emerald-500/40";
    if (percent >= 75) return "text-amber-400 bg-amber-500/20 border-amber-500/40";
    return "text-red-400 bg-red-500/20 border-red-500/40";
  };

  const radius = 52;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className="relative w-full rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(56,189,248,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden group">

      {/* Cyber grid */}
      {/*<div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>*/}

      {/* Hologram scan bar */}
      <div className="holo-scan pointer-events-none"></div>

      {/* Glow edge effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Content */}
      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-mono font-semibold text-cyan-300 tracking-widest">
            OVERALL ATTENDANCE
          </h2>

          {!loading && !error && (
            <span className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-2 ${getStatusColor()}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {getStatusLabel()}
            </span>
          )}
        </div>

        {/* States */}
        {loading ? (
          <div className="space-y-3 mt-4">
            <div className="h-5 w-24 bg-slate-700 animate-pulse rounded-md"></div>
            <div className="h-5 w-40 bg-slate-700 animate-pulse rounded-md"></div>
          </div>
        ) : error ? (
          <div className="mt-3 text-red-400 bg-red-500/20 border border-red-500/40 p-3 rounded-xl text-sm">
            {error}
          </div>
        ) : (
          <div className="flex items-center gap-6 mt-4">

            {/* Donut chart */}
            <div className="relative flex-shrink-0">
              <svg width={130} height={130} viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth={strokeWidth}
                  fill="none"
                />

                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={getStrokeColor()}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                  transform="rotate(-90 60 60)"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-xs text-cyan-300 font-mono">PRESENT</p>
                <p className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {percent.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Info text */}
            <div className="flex-1 space-y-2">
              <p className="text-sm text-cyan-200/70 font-mono">
                Based on all marked lectures for this semester.
              </p>
              <p className="text-xs text-cyan-200/50 font-mono">
                Minimum requirement: <span className="font-bold text-cyan-300">75%</span>
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
});

export default OverallAtt;
