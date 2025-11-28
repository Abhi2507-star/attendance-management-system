import axios from "axios";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { useTheme } from "../Contexts/ThemeContext";

import {
  AUTH_COOKIE_NAME,
  COOKIE_EXPIRY,
  PASSWORD_COOKIE,
  REMEMBER_ME_COOKIE,
  USERNAME_COOKIE,
} from "../types/CookieVars";
import type { AttendanceResponse, LoginResponse } from "../types/response";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

function LoginForm({
  setAttendanceData,
}: {
  setAttendanceData: React.Dispatch<
    React.SetStateAction<AttendanceResponse | null>
  >;
}) {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fetchAttendanceData = useCallback(
    async (token: string) => {
      try {
        const attendanceResponse = await axios.get<AttendanceResponse>(
          "https://kiet.cybervidya.net/api/attendance/course/component/student",
          {
            headers: { Authorization: `GlobalEducation ${token}` },
          }
        );
        setAttendanceData(attendanceResponse.data);
      } catch {
        setError("Session expired. Please login again.");
        Cookies.remove(AUTH_COOKIE_NAME);
      }
    },
    [setAttendanceData]
  );

  useEffect(() => {
    const savedUsername = Cookies.get(USERNAME_COOKIE) || "";
    const savedRemember = Cookies.get(REMEMBER_ME_COOKIE) === "true";
    const savedPassword = savedRemember
      ? Cookies.get(PASSWORD_COOKIE) || ""
      : "";

    setUsername(savedUsername);
    setPassword(savedPassword);
    setRememberMe(savedRemember);

    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (token) fetchAttendanceData(token);
  }, [fetchAttendanceData]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((p) => !p);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginResponse = await axios.post<LoginResponse>(
        "https://kiet.cybervidya.net/api/auth/login",
        {
          userName: username,
          password: password,
        }
      );

      const token = loginResponse.data.data.token;

      Cookies.set(USERNAME_COOKIE, username, { expires: COOKIE_EXPIRY });
      Cookies.set(REMEMBER_ME_COOKIE, rememberMe.toString(), {
        expires: COOKIE_EXPIRY,
      });

      if (rememberMe) {
        Cookies.set(PASSWORD_COOKIE, password, { expires: COOKIE_EXPIRY });
        Cookies.set(AUTH_COOKIE_NAME, token, { expires: COOKIE_EXPIRY });
      } else {
        Cookies.remove(PASSWORD_COOKIE);
        Cookies.set(AUTH_COOKIE_NAME, token);
      }

      if (token) fetchAttendanceData(token);
    } catch {
      setError("Invalid roll number or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center px-4 py-10 relative z-50
        ${
          theme === "minimalist"
            ? "bg-white text-slate-900"
            : "bg-transparent"
        }
      `}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-4xl"
      >
        <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] items-center">

          {/* LEFT PANEL */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`hidden md:block rounded-3xl px-8 py-10 shadow-xl
              ${
                theme === "minimalist"
                  ? "border-2 border-slate-200 bg-white shadow-slate-200/50"
                  : "border border-white/10 bg-white/5 backdrop-blur-xl shadow-black/40"
              }
            `}
          >
            <div className="flex items-center gap-3 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em]">
                  CyberVidya
                </p>
                <h1 className="mt-1 text-2xl font-semibold">
                  Smart Attendance Portal
                </h1>
              </div>
            </div>

            <p className="text-sm mb-6">
              Sign in using your university roll number and password to view
              your full attendance dashboard.
            </p>
          </motion.div>

          {/* RIGHT LOGIN CARD */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-3xl px-6 py-7 sm:px-8 sm:py-9 shadow-xl
              ${
                theme === "minimalist"
                  ? "border-2 border-slate-200 bg-white shadow-slate-200/50"
                  : "border border-white/10 bg-white/10 backdrop-blur-xl shadow-black/40"
              }
            `}
          >
            <motion.div className="mb-6 text-center" variants={itemVariants} custom={0}>
              <h2 className="text-2xl font-bold">CyberVidya Attendance</h2>
              <p className="text-sm mt-2">Enter your credentials to continue</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial="hidden"
              animate="visible"
            >

              <motion.div variants={itemVariants} custom={1}>
                <label
                  htmlFor="username"
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                >
                  University Roll Number
                </label>

                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="20240XXXXXXXXXX"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm outline-none border
                    ${
                      theme === "minimalist"
                        ? "bg-white border-slate-300 focus:ring-2 focus:ring-blue-500"
                        : "bg-slate-900/50 text-white border-white/20"
                    }
                  `}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} custom={2}>
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                >
                  CyberVidya Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2.5 pr-10 text-sm outline-none border
                      ${
                        theme === "minimalist"
                          ? "bg-white border-slate-300 focus:ring-2 focus:ring-blue-500"
                          : "bg-slate-900/50 text-white border-white/20"
                      }
                    `}
                    required
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-3 top-2.5
                      ${theme === "minimalist" ? "text-slate-600" : "text-slate-300"}
                    `}
                  >
                    {isPasswordVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} custom={3} className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 rounded border
                    ${
                      theme === "minimalist"
                        ? "border-slate-300 text-blue-500"
                        : "border-white/30 bg-slate-900/50 text-emerald-400"
                    }
                  `}
                />
                <span>Remember me</span>
              </motion.div>

              <motion.div variants={itemVariants} custom={4} className="text-[11px]">
                By clicking <b>View Attendance</b>, you agree to CyberVidya’s{" "}
                <a
                  href="https://cybervidya.net/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Privacy Policy
                </a>.
              </motion.div>

              {error && (
                <motion.p variants={itemVariants} custom={5}
                  className={`px-3 py-2 text-xs rounded-xl border
                    ${
                      theme === "minimalist"
                        ? "bg-red-50 border-red-300 text-red-700"
                        : "bg-red-500/10 text-red-100 border-red-500/40"
                    }
                  `}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                variants={itemVariants}
                custom={6}
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-2.5 font-semibold transition
                  ${
                    theme === "minimalist"
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-emerald-500 text-slate-900 hover:bg-emerald-400"
                  }
                `}
              >
                {loading ? "Loading…" : "View Attendance"}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
