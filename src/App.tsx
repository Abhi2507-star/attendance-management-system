import { useState } from "react";
import type { ComponentType, Dispatch, SetStateAction } from "react";
import Attendance from "./components/Attendance";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import BackgroundAnimation from "./components/BackgroundAnimation";
import type { AttendanceResponse } from "./types/response";
function App() {
  const [attendanceData, setAttendanceData] =
    useState<AttendanceResponse | null>(null);

  // Cast the imported LoginForm to a proper React component type so it can be used in JSX
  const Login = (LoginForm as unknown) as ComponentType<{
    setAttendanceData: Dispatch<SetStateAction<AttendanceResponse | null>>;
  }>;

  return (
    <>
      <BackgroundAnimation />
      <div className="min-h-screen relative z-10">
        {!attendanceData ? (
          <Login setAttendanceData={setAttendanceData} />
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

export default App;