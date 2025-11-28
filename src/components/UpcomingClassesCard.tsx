import axios from "axios";
import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { AUTH_COOKIE_NAME } from "../types/CookieVars";
import Cookies from "js-cookie";
import { useTheme } from "../Contexts/ThemeContext";

type UpcomingClass = {
  courseName: string;
  courseCode: string;
  date: string;
  startEndTime: string;
  classRoom: string;
};

type ApiResp = { data: UpcomingClass[] };

const UpcomingClassesCard = () => {
  const { theme } = useTheme();
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
    <div
      className={`
        relative rounded-2xl px-5 py-6 transition-all duration-300 overflow-hidden group
        ${
          theme === "minimalist"
            ? "bg-white border-2 border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 text-slate-900"
            : "border border-cyan-500/30 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
        }
      `}
    >
      {/* Cyber grid background */}
      {theme === "cyberpunk" && (
        <>
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
        </>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays
            className={`
              h-5 w-5
              ${theme === "minimalist" ? "text-blue-600" : "text-cyan-400 animate-pulse"}
            `}
          />

          <h2
            className={`
              text-lg font-extrabold tracking-wide font-mono
              ${theme === "minimalist" ? "text-slate-800" : "text-cyan-400"}
            `}
          >
            UPCOMING SESSIONS
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <p
            className={`
              text-sm font-mono animate-pulse
              ${theme === "minimalist" ? "text-slate-600" : "text-cyan-300"}
            `}
          >
            LOADING…
          </p>
        )}

        {/* Empty */}
        {!loading && classes.length === 0 && (
          <p
            className={`
              text-sm font-mono
              ${theme === "minimalist" ? "text-slate-600" : "text-cyan-200"}
            `}
          >
            🎉 NO UPCOMING CLASSES
          </p>
        )}

        {/* List */}
        {!loading && classes.length > 0 && (
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
            {classes.map((cls, idx) => (
              <div
                key={idx}
                className={`
                  rounded-xl p-3 transition-all duration-300 group
                  ${
                    theme === "minimalist"
                      ? "bg-white border border-slate-300 shadow-sm hover:shadow-md"
                      : "bg-slate-800/60 border border-cyan-500/30 shadow-lg hover:bg-slate-800 hover:border-cyan-400/50 hover:shadow-cyan-500/30"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <p
                    className={`
                      font-bold font-mono
                      ${theme === "minimalist" ? "text-blue-700" : "text-cyan-300"}
                    `}
                  >
                    {cls.courseName}
                  </p>

                  <p
                    className={`
                      text-xs font-bold bg-opacity-20 px-2 py-1 rounded border font-mono
                      ${
                        theme === "minimalist"
                          ? "text-blue-700 bg-blue-100 border-blue-300"
                          : "text-cyan-400 bg-cyan-500/20 border-cyan-500/30"
                      }
                    `}
                  >
                    {cls.courseCode}
                  </p>
                </div>

                <div
                  className={`
                    flex items-center gap-2 text-xs mt-2 font-mono
                    ${theme === "minimalist" ? "text-slate-700" : "text-cyan-200/70"}
                  `}
                >
                  <Clock
                    className={`
                      h-3.5 w-3.5
                      ${theme === "minimalist" ? "text-blue-600" : "text-cyan-400"}
                    `}
                  />

                  <span>{cls.date}</span>
                  <span>•</span>
                  <span>{cls.startEndTime}</span>
                </div>

                <p
                  className={`
                    text-xs mt-2 font-mono
                    ${theme === "minimalist" ? "text-slate-800" : "text-cyan-300/70"}
                  `}
                >
                  ROOM:{" "}
                  <span
                    className={`
                      font-bold
                      ${theme === "minimalist" ? "text-blue-600" : "text-cyan-400"}
                    `}
                  >
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
