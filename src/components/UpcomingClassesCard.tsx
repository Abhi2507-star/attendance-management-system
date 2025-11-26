import axios from "axios";
import Cookies from "js-cookie";
import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { AUTH_COOKIE_NAME } from "../types/CookieVars";

type UpcomingClass = {
  courseName: string;
  courseCode: string;
  date: string;
  startEndTime: string;
  classRoom: string;
};

type ApiResp = { data: UpcomingClass[] };

const UpcomingClassesCard = () => {
  const [classes, setClasses] = useState<UpcomingClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (!token) return setLoading(false);

    const fetchData = async () => {
      try {
        const res = await axios.get<ApiResp>(
          "https://kiet.cybervidya.net/api/student/dashboard/upcoming/classes",
          {
            headers: { Authorization: `GlobalEducation ${token}` },
          }
        );

        setClasses(res.data.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 px-5 py-6 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden group">

      {/* Cyber grid */}
      {/*<div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>*/}

      {/* Hologram beam */}
      <div className="holo-scan pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-5 w-5 text-cyan-400 animate-pulse" />
          <h2 className="text-lg font-extrabold text-cyan-400 tracking-wide font-mono">
            UPCOMING SESSIONS
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-cyan-300 font-mono animate-pulse">
            LOADING…
          </p>
        )}

        {/* Empty */}
        {!loading && classes.length === 0 && (
          <p className="text-sm text-cyan-200 font-mono">
            🎉 NO UPCOMING CLASSES
          </p>
        )}

        {/* List */}
        {!loading && classes.length > 0 && (
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
            {classes.map((cls, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-800/60 border border-cyan-500/30 p-3 shadow-lg hover:bg-slate-800 hover:border-cyan-400/50 hover:shadow-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-cyan-300 font-mono">
                    {cls.courseName}
                  </p>
                  <p className="text-xs text-cyan-400 font-bold bg-cyan-500/20 px-2 py-1 rounded border border-cyan-500/30">
                    {cls.courseCode}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-cyan-200/70 mt-2 font-mono">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{cls.date}</span>
                  <span>•</span>
                  <span>{cls.startEndTime}</span>
                </div>

                <p className="text-xs text-cyan-300/70 mt-2 font-mono">
                  ROOM:{" "}
                  <span className="font-bold text-cyan-400">
                    {cls.classRoom}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingClassesCard;
