import Cookies from "js-cookie";
import { LogOut, User, X, Calculator } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  AUTH_COOKIE_NAME,
  PASSWORD_COOKIE,
  REMEMBER_ME_COOKIE,
  USERNAME_COOKIE,
} from "../types/CookieVars";

import type { AttendanceResponse } from "../types/response";
import { fetchStudentId } from "../types/utils";

import DaywiseReport from "./Daywise";
import OverallAtt from "./OverallAtt";
import UpcomingClassesCard from "./UpcomingClassesCard";
import PerformanceCard from "./PerformanceCard";
import BunkPlannerModal from "./BunkPlanner";

interface SelectedComponentType {
  course: AttendanceResponse["data"]["attendanceCourseComponentInfoList"][0];
  component: AttendanceResponse["data"]["attendanceCourseComponentInfoList"][0]["attendanceCourseComponentNameInfoList"][0];
}

type AttendanceHook = {
  attendanceData: AttendanceResponse;
  setAttendanceData: React.Dispatch<
    React.SetStateAction<AttendanceResponse | null>
  >;
};



const Attendance = ({ attendanceData, setAttendanceData }: AttendanceHook) => {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<SelectedComponentType | null>(null);
  const [isDaywiseModalOpen, setIsDaywiseModalOpen] = useState(false);
  const [isBunkPlannerOpen, setIsBunkPlannerOpen] = useState(false);

  function handleLogout(): void {
    Cookies.remove(AUTH_COOKIE_NAME);
    if (!Cookies.get(REMEMBER_ME_COOKIE)) {
      Cookies.remove(USERNAME_COOKIE);
      Cookies.remove(PASSWORD_COOKIE);
    }
    setAttendanceData(null);
  }

  useEffect(() => {
    const token = Cookies.get(AUTH_COOKIE_NAME) || "";
    fetchStudentId(token).then((id) => {
      if (id) setStudentId(id);
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function getAttendanceMessage(present: number, total: number): string {
    if (total === 0) return "No classes conducted yet";

    const percentage = (present / total) * 100;
    const requiredRatio = 0.75;

    if (percentage >= 75) {
      const canMiss = Math.floor((present - requiredRatio * total) / requiredRatio);
      return `You can miss ${Math.max(canMiss, 0)} more classes 🎯`;
    } else {
      const needAttend = Math.ceil(((requiredRatio * total) - present) / (1 - requiredRatio));
      return `Need to attend next ${needAttend} classes ⚠️`;
    }
  }

  return (
    <div className="min-h-screen relative z-10 overflow-hidden">
      {/* Animated cyber grid background */}
      {/* <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          animation: 'grid-flow 20s linear infinite'
        }} />
      </div> */}

      {/* Glowing orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 py-6 flex-grow relative z-10">
        {/* Terminal-style Header */}
        {/* <div className="mb-6 p-4 bg-slate-900/90 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/30">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="ml-2">user@attendance-system:~$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div> */}

        {/* Profile Card */}
        <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 p-6 mb-8 transition-all hover:shadow-cyan-500/40 overflow-hidden group">
          {/* Cyber grid */}
          {/*<div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>*/}

          {/* Glowing border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <User className="h-16 w-16 text-cyan-400" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
                  {attendanceData.data.fullName.toUpperCase()}
                </h1>
                <p className="text-sm text-slate-400 font-medium font-mono">
                  {attendanceData.data.registrationNumber} • {attendanceData.data.branchShortName}-{attendanceData.data.sectionName}
                </p>
                <p className="text-sm text-slate-500 font-medium font-mono">
                  {attendanceData.data.degreeName} — SEM {attendanceData.data.semesterName}
                </p>
              </div>
            </div>

            {/* Buttons Container */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Bunk Planner Button */}
              <button
                type="button"
                onClick={() => setIsBunkPlannerOpen(true)}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-900 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 font-mono"
              >
                <Calculator className="h-4 w-4" /> SMART BUNK PLANNER
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 font-mono"
              >
                <LogOut className="h-4 w-4" /> LOGOUT
              </button>
            </div>
          </div>
        </div>

        {/* Performance + Overall Attendance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <PerformanceCard />
          <OverallAtt />
        </div>

        {/* Upcoming Classes */}
        <div className="mb-10">
          <UpcomingClassesCard />
        </div>

        {/* Subject-wise Attendance Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attendanceData.data.attendanceCourseComponentInfoList.map((course, courseIdx) => (
            <div
              key={course.courseCode}
              className="relative rounded-xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300 p-5 group overflow-hidden"
              style={{ animationDelay: `${courseIdx * 100}ms` }}
            >
              {/* Grid pattern */}
              {/*<div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>*/}

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-bold text-cyan-300 font-mono">
                    {course.courseName.toUpperCase()}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-mono border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 rounded inline-block">
                  CODE: {course.courseCode}
                </p>

                {course.attendanceCourseComponentNameInfoList.map((component) => {
                  const present = component.numberOfPresent + component.numberOfExtraAttendance;
                  const total = component.numberOfPeriods;
                  const percentage = (present / total) * 100;
                  const message = getAttendanceMessage(present, total);

                  return (
                    <div
                      key={component.componentName}
                      className="border-t border-cyan-500/30 pt-4 mt-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300 font-bold font-mono">
                          {component.componentName.toUpperCase()}
                        </span>
                        <span
                          className={`text-sm font-bold font-mono ${
                            percentage >= 75 ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {component.presentPercentageWith}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-mono">
                        PRESENT: {present}/{total}
                      </p>

                      <p className="text-xs font-bold text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                        {message}
                      </p>

                      <button
                        type="button"
                        className="mt-3 w-full px-4 py-2 text-xs rounded-lg font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 font-mono"
                        onClick={() => {
                          setSelectedComponent({ course, component });
                          setIsDaywiseModalOpen(true);
                        }}
                      >
                        ⚡ DAYWISE REPORT
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Daywise Modal */}
        {isDaywiseModalOpen && selectedComponent && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 px-3">
            <div className="relative bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/50 p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-cyan-400 font-mono">
                  {selectedComponent.course.courseName.toUpperCase()} — {selectedComponent.component.componentName.toUpperCase()}
                </h2>
                <button
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  onClick={() => setIsDaywiseModalOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <DaywiseReport
                token={Cookies.get(AUTH_COOKIE_NAME) || ""}
                payload={{
                  courseCompId: selectedComponent.component.courseComponentId,
                  courseId: selectedComponent.course.courseId,
                  sessionId: null,
                  studentId: studentId || 0,
                }}
              />
            </div>
          </div>
        )}

        {/* Bunk Planner Modal */}
        <BunkPlannerModal 
          isOpen={isBunkPlannerOpen}
          onClose={() => setIsBunkPlannerOpen(false)}
          currentAttendance={{
            present: attendanceData.data.attendanceCourseComponentInfoList[0]?.attendanceCourseComponentNameInfoList[0]?.numberOfPresent || 0,
            total: attendanceData.data.attendanceCourseComponentInfoList[0]?.attendanceCourseComponentNameInfoList[0]?.numberOfPeriods || 0
          }}
        />
      </div>

      <style jsx>{`
        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
      `}</style>
    </div>
  );
};

export default Attendance;