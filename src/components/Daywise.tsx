import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Cpu, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  AttendanceApiResponse,
  DaywiseReportProps,
  LectureListProps,
} from "../types/response";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export default function DaywiseReport({ token, payload }: DaywiseReportProps) {
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

  if (loading)
    return (
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

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border-2 border-red-500/40 bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm p-4 flex items-center gap-3 shadow-lg shadow-red-500/20"
      >
        <div className="p-2 rounded-lg bg-red-500/20">
          <XCircle className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <p className="text-red-200 text-sm font-bold">System Error</p>
          <p className="text-red-300/80 text-xs font-mono mt-0.5">{error}</p>
        </div>
      </motion.div>
    );

  if (daywiseData.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm p-6 text-center shadow-lg shadow-blue-500/10"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block p-3 rounded-xl bg-blue-500/20 mb-3"
        >
          <AlertCircle className="h-10 w-10 text-blue-400" />
        </motion.div>
        <p className="text-slate-200 font-bold">No Records Found</p>
        <p className="text-blue-400/80 text-sm mt-1 font-mono">Database query returned 0 results</p>
      </motion.div>
    );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle2 className="h-4 w-4" />;
      case "ABSENT":
        return <XCircle className="h-4 w-4" />;
      case "ADJUSTED":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 to-green-500/10 text-emerald-300 shadow-emerald-500/20";
      case "ABSENT":
        return "border-red-400/40 bg-gradient-to-r from-red-500/15 to-rose-500/10 text-red-300 shadow-red-500/20";
      case "ADJUSTED":
        return "border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-300 shadow-amber-500/20";
      default:
        return "border-slate-400/40 bg-gradient-to-r from-slate-500/15 to-gray-500/10 text-slate-300 shadow-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Animated circuit board background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Glowing corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-cyan-500/20 blur-2xl rounded-full" />

      <div className="relative rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-slate-900/90 backdrop-blur-xl overflow-hidden max-h-[450px] overflow-y-auto shadow-2xl shadow-blue-500/20">
        {/* Header with robotic design */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-900/95 via-slate-900/95 to-blue-900/95 backdrop-blur-xl border-b-2 border-blue-500/30 px-4 py-3 shadow-lg shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ 
                  boxShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 10px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30"
              >
                <Cpu className="h-5 w-5 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  Lecture Database
                </h3>
                <p className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">System Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-blue-400"
              />
              <span className="text-xs font-mono text-blue-400/80">{daywiseData.length} RECORDS</span>
            </div>
          </div>
        </div>

        {/* Records with robotic styling */}
        <div className="divide-y divide-blue-500/10">
          {daywiseData.map((lecture, index) => (
            <motion.div
              key={`${lecture.planLecDate}-${lecture.timeSlot}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="group relative px-4 py-3 hover:bg-blue-500/5 transition-all duration-200"
            >
              {/* Scan line effect on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <div className="relative flex items-center justify-between gap-4">
                {/* Date & Day with robotic frame */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/10 blur-sm rounded" />
                    <div className="relative p-2 rounded-lg border border-blue-500/30 bg-slate-900/50">
                      <div className="flex flex-col">
                        <span className="text-sm font-mono font-bold text-blue-300">
                          {formatDate(lecture.planLecDate)}
                        </span>
                        <span className="text-[10px] font-bold text-cyan-400/70 uppercase tracking-widest">
                          {lecture.dayName.slice(0, 3)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Slot with icon */}
                <div className="flex items-center gap-2 min-w-[140px] px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    {lecture.timeSlot}
                  </span>
                </div>

                {/* Status Badge - Robotic */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px currentColor" }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 font-bold text-xs uppercase tracking-wider shadow-lg ${getStatusColor(
                      lecture.attendance
                    )}`}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-1 h-1 border-t-2 border-l-2 border-current" />
                    <div className="absolute top-0 right-0 w-1 h-1 border-t-2 border-r-2 border-current" />
                    <div className="absolute bottom-0 left-0 w-1 h-1 border-b-2 border-l-2 border-current" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b-2 border-r-2 border-current" />
                    
                    {getStatusIcon(lecture.attendance)}
                    <span>
                      {lecture.attendance === "PRESENT" && "PRESENT"}
                      {lecture.attendance === "ABSENT" && "ABSENT"}
                      {lecture.attendance === "ADJUSTED" && "ADJUSTED"}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Tech-style separator */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Footer with robotic stats panel */}
        <div className="sticky bottom-0 bg-gradient-to-r from-blue-900/95 via-slate-900/95 to-blue-900/95 backdrop-blur-xl border-t-2 border-blue-500/30 px-4 py-3 shadow-lg shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-emerald-500/30 bg-emerald-500/10">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-400">
                  P: {daywiseData.filter((l) => l.attendance === "PRESENT").length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-red-500/30 bg-red-500/10">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-red-400">
                  A: {daywiseData.filter((l) => l.attendance === "ABSENT").length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-amber-500/30 bg-amber-500/10">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-amber-400">
                  ADJ: {daywiseData.filter((l) => l.attendance === "ADJUSTED").length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400/80">
              <Zap className="h-3 w-3" />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="uppercase tracking-wider">LIVE</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}