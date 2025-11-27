import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Cpu, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  AttendanceApiResponse,
  DaywiseReportProps,
  LectureListProps,
} from "../types/response";
import { useTheme } from "../contexts/ThemeContext";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export default function DaywiseReport({ token, payload }: DaywiseReportProps) {
  const { theme } = useTheme();

  const [daywiseData, setDaywiseData] = useState<LectureListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDaywiseAttendance = async () => {
      try {
        const response = await axios.post<AttendanceApiResponse>(
          "https://kiet.cybervidya.net/api/attendance/schedule/student/course/attendance/percentage",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `GlobalEducation ${token}`,
            },
          }
        );

        if (response.data.data?.length > 0) {
          const lectures = [...response.data.data[0].lectureList].sort(
            (a, b) =>
              new Date(b.planLecDate).getTime() -
              new Date(a.planLecDate).getTime()
          );
          setDaywiseData(lectures);
        } else {
          setDaywiseData([]);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch detailed attendance. Try later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDaywiseAttendance();
  }, [token, payload]);

  // 🔹 theme-based loading
  if (loading) {
    return theme === "minimalist" ? (
      <div className="flex items-center justify-center py-10">
        <p className="text-slate-500 text-sm">Loading attendance…</p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-full border-4 border-transparent border-t-blue-400 border-r-blue-500"
          />
          {/* Middle pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-2 rounded-full border-2 border-cyan-400/50"
          />
          {/* Inner spinning core */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
          >
            <Cpu className="h-6 w-6 text-white" />
          </motion.div>
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-blue-400 font-mono text-sm flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          PROCESSING DATA...
        </motion.p>
      </div>
    );
  }

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border-2 border-red-500/40 bg-red-500/10 p-4 flex items-center gap-3 shadow-lg"
      >
        <XCircle className="h-5 w-5 text-red-400" />
        <p className="text-red-300 text-sm">{error}</p>
      </motion.div>
    );

  if (daywiseData.length === 0)
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow">
        <AlertCircle className="h-8 w-8 text-slate-500 mx-auto mb-2" />
        <p className="text-slate-600 font-medium">No Daywise Data</p>
      </div>
    );

  const getStatusStyle = (status: string) => {
    if (theme === "minimalist") {
      switch (status) {
        case "PRESENT":
          return "bg-green-100 text-green-700 border-green-300";
        case "ABSENT":
          return "bg-red-100 text-red-700 border-red-300";
        case "ADJUSTED":
          return "bg-amber-100 text-amber-700 border-amber-300";
      }
    }

    // Cyberpunk fallback
    switch (status) {
      case "PRESENT":
        return "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
      case "ABSENT":
        return "border-red-400/40 bg-red-500/10 text-red-300";
      case "ADJUSTED":
        return "border-amber-400/40 bg-amber-500/10 text-amber-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
      max-h-[450px] overflow-y-auto rounded-xl
      ${theme === "minimalist"
        ? "bg-white border border-slate-300 shadow-md"
        : "bg-slate-900 border border-blue-500/30 shadow-blue-500/20 shadow-lg"}
    `}
    >
      {daywiseData.map((lecture, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`
            flex justify-between items-center px-4 py-3
            ${theme === "minimalist"
              ? "border-b border-slate-200 hover:bg-slate-50"
              : "border-b border-blue-500/20 hover:bg-blue-900/30"}
          `}
        >
          {/* DATE */}
          <div className="text-left">
            <p
              className={`
              font-semibold
              ${theme === "minimalist" ? "text-slate-700" : "text-blue-300 font-mono"}
            `}
            >
              {formatDate(lecture.planLecDate)}
            </p>
            <p className="text-[10px] uppercase text-slate-400">
              {lecture.dayName}
            </p>
          </div>

          {/* TIME */}
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className={theme === "minimalist" ? "text-slate-600" : "text-slate-200 font-mono"}>
              {lecture.timeSlot}
            </span>
          </div>

          {/* STATUS */}
          <span
            className={`text-xs px-3 py-1 font-bold rounded-lg border ${getStatusStyle(lecture.attendance)}`}
          >
            {lecture.attendance}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
