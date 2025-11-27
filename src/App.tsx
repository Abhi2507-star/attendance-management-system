import { useState } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Attendance from "./components/Attendance";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import BackgroundAnimation from "./components/BackgroundAnimation";
import MinimalistBackground from "./components/MinimalistBackground";
import ThemeToggle from "./components/ThemeToggle";
import type { AttendanceResponse } from "./types/response";

function AppContent() {
  const [attendanceData, setAttendanceData] =
    useState<AttendanceResponse | null>(null);
  const { theme } = useTheme();

  return (
    <>
      {theme === "cyberpunk" ? <BackgroundAnimation /> : <MinimalistBackground />}
      <ThemeToggle />

      <div className="min-h-screen relative z-10">
        {!attendanceData ? (
          <LoginForm setAttendanceData={setAttendanceData} />
        ) : (
          <Attendance
            attendanceData={attendanceData}
            setAttendanceData={setAttendanceData}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
