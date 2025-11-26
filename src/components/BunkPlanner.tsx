import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Zap, Target, X } from 'lucide-react';

interface BunkPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAttendance?: {
    present: number;
    total: number;
  };
}

const BunkPlannerModal: React.FC<BunkPlannerModalProps> = ({ isOpen, onClose, currentAttendance }) => {
  const [present, setPresent] = useState(currentAttendance?.present || 30);
  const [total, setTotal] = useState(currentAttendance?.total || 40);
  const [targetPercentage, setTargetPercentage] = useState(75);

  if (!isOpen) return null;

  // Calculate current stats
  const currentPercentage = total > 0 ? (present / total) * 100 : 0;
  const requiredRatio = targetPercentage / 100;

  // Calculate how many classes can be missed
  const calculateCanMiss = () => {
    if (currentPercentage < targetPercentage) return 0;
    const canMiss = Math.floor((present - requiredRatio * total) / requiredRatio);
    return Math.max(canMiss, 0);
  };

  // Calculate how many classes need to attend
  const calculateNeedAttend = () => {
    if (currentPercentage >= targetPercentage) return 0;
    const needAttend = Math.ceil(((requiredRatio * total) - present) / (1 - requiredRatio));
    return needAttend;
  };

  // Simulate scenarios
  const simulateScenario = (missCount: number) => {
    const newTotal = total + missCount;
    const newPresent = present;
    return newTotal > 0 ? ((newPresent / newTotal) * 100).toFixed(2) : "0";
  };

  const simulateAttendScenario = (attendCount: number) => {
    const newTotal = total + attendCount;
    const newPresent = present + attendCount;
    return newTotal > 0 ? ((newPresent / newTotal) * 100).toFixed(2) : "0";
  };

  const canMiss = calculateCanMiss();
  const needAttend = calculateNeedAttend();

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return "text-emerald-400 border-emerald-500/50 bg-emerald-500/20";
    if (percentage >= targetPercentage) return "text-cyan-400 border-cyan-500/50 bg-cyan-500/20";
    if (percentage >= 70) return "text-amber-400 border-amber-500/50 bg-amber-500/20";
    return "text-red-400 border-red-500/50 bg-red-500/20";
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= targetPercentage) return <CheckCircle className="h-5 w-5" />;
    if (percentage >= 70) return <AlertTriangle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="relative bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/50 max-w-5xl w-full my-8">
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto z-20 text-cyan-400 hover:text-cyan-300 transition-colors p-2 hover:bg-cyan-500/20 rounded-lg float-right"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative z-10 p-6 md:p-8 clear-both">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono mb-2">
              BUNK PLANNER
            </h1>
            <p className="text-slate-400 font-mono text-sm">Strategic Attendance Calculator</p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Current Stats Input */}
            <div className="relative rounded-xl border border-cyan-500/30 bg-slate-800/60 backdrop-blur-xl p-5">
              <h2 className="text-lg font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                CURRENT STATUS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-2">Classes Attended</label>
                  <input
                    type="number"
                    value={present}
                    onChange={(e) => setPresent(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 transition-all"
                    min="0"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-2">Total Classes</label>
                  <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 transition-all"
                    min="0"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-2">Target Percentage (%)</label>
                  <input
                    type="number"
                    value={targetPercentage}
                    onChange={(e) => setTargetPercentage(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 transition-all"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Current Status Display */}
            <div className="relative rounded-xl border border-cyan-500/30 bg-slate-800/60 backdrop-blur-xl p-5">
              <h2 className="text-lg font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ANALYSIS
              </h2>

              {/* Current Percentage */}
              <div className="text-center mb-4">
                <p className="text-xs text-slate-400 font-mono mb-2">CURRENT ATTENDANCE</p>
                <div className={`text-5xl font-extrabold font-mono ${currentPercentage >= targetPercentage ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentPercentage.toFixed(1)}%
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {getStatusIcon(currentPercentage)}
                  <span className={`text-xs font-bold font-mono ${currentPercentage >= targetPercentage ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentPercentage >= targetPercentage ? 'SAFE ZONE' : 'AT RISK'}
                  </span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-3">
                  <p className="text-xs text-slate-500 font-mono">PRESENT</p>
                  <p className="text-xl font-bold text-cyan-400 font-mono">{present}</p>
                </div>
                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-3">
                  <p className="text-xs text-slate-500 font-mono">ABSENT</p>
                  <p className="text-xl font-bold text-red-400 font-mono">{total - present}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Recommendation */}
          <div className="mb-6">
            {currentPercentage >= targetPercentage ? (
              <div className="relative rounded-xl border border-emerald-500/50 bg-emerald-500/20 backdrop-blur-xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 font-mono mb-1">✅ YOU'RE SAFE!</h3>
                    <p className="text-sm text-emerald-300 font-mono mb-1">
                      You can miss <span className="text-2xl font-extrabold">{canMiss}</span> more {canMiss === 1 ? 'class' : 'classes'} and still maintain {targetPercentage}%
                    </p>
                    <p className="text-xs text-emerald-400/80 font-mono">
                      💡 After missing {canMiss} classes, attendance will be exactly at {targetPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl border border-red-500/50 bg-red-500/20 backdrop-blur-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h3 className="text-xl font-bold text-red-400 font-mono mb-1">⚠️ ATTENDANCE ALERT!</h3>
                    <p className="text-sm text-red-300 font-mono mb-1">
                      Attend the next <span className="text-2xl font-extrabold">{needAttend}</span> {needAttend === 1 ? 'class' : 'classes'} continuously to reach {targetPercentage}%
                    </p>
                    <p className="text-xs text-red-400/80 font-mono">
                      🚨 Missing any more classes will make recovery harder!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scenario Buttons - Side by Side */}
          <div className="relative rounded-xl border border-cyan-500/30 bg-slate-800/60 backdrop-blur-xl p-5 mb-6">
            <h2 className="text-lg font-bold text-cyan-400 font-mono mb-4 text-center">SCENARIO SIMULATOR</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Skip Classes Column */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingDown className="h-4 w-4 text-red-400" />
                  <h3 className="text-sm font-bold text-red-400 font-mono">SKIP CLASSES</h3>
                </div>
                <div className="space-y-2">
                  {[0, 1, 3, 5, 10].map((skipCount) => {
                    const projectedPercent = skipCount === 0 ? currentPercentage : parseFloat(simulateScenario(skipCount));
                    return (
                      <button
                        key={skipCount}
                        className={`w-full p-3 rounded-lg border ${getStatusColor(projectedPercent)} transition-all hover:scale-105 hover:shadow-lg text-left`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-mono text-xs">
                            {skipCount === 0 ? 'CURRENT' : `SKIP ${skipCount}`}
                          </span>
                          <div className="text-right">
                            <div className="text-xl font-extrabold font-mono">{projectedPercent.toFixed(1)}%</div>
                            {skipCount > 0 && (
                              <div className="text-[10px] font-mono opacity-80 text-red-400">
                                {(projectedPercent - currentPercentage).toFixed(1)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Attend Classes Column */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-emerald-400 font-mono">ATTEND CLASSES</h3>
                </div>
                <div className="space-y-2">
                  {[1, 3, 5, 10, needAttend > 10 ? needAttend : 15].map((attendCount) => {
                    const projectedPercent = parseFloat(simulateAttendScenario(attendCount));
                    return (
                      <button
                        key={attendCount}
                        className={`w-full p-3 rounded-lg border ${getStatusColor(projectedPercent)} transition-all hover:scale-105 hover:shadow-lg text-left`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-mono text-xs">
                            {attendCount === needAttend && currentPercentage < targetPercentage ? `TARGET ${attendCount}` : `ATTEND ${attendCount}`}
                          </span>
                          <div className="text-right">
                            <div className="text-xl font-extrabold font-mono">{projectedPercent.toFixed(1)}%</div>
                            <div className="text-[10px] font-mono opacity-80 text-emerald-400">
                              +{(projectedPercent - currentPercentage).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="relative rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl p-5">
            <h3 className="text-sm font-bold text-blue-400 font-mono mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              PRO TIPS
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Maintain buffer above 75% for emergencies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Prioritize subjects with lower attendance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Plan bunks around important events</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Track attendance weekly, not monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BunkPlannerModal;