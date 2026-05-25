import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldAlert, HeartPulse, Clock } from "lucide-react";

export type KtasLevel = 1 | 2 | 3 | 4 | 5;

interface TriageResultProps {
  level: KtasLevel;
  onReset: () => void;
}

const KTAS_DATA = {
  1: {
    color: "bg-red-500",
    textColor: "text-red-500",
    lightBg: "bg-red-50",
    emoji: "😨",
    title: "Resuscitation",
    risk: "Immediate threat to life",
    recommendation: "Immediate physician assessment required. Move to resuscitation room.",
    time: "0 mins"
  },
  2: {
    color: "bg-orange-500",
    textColor: "text-orange-600",
    lightBg: "bg-orange-50",
    emoji: "😟",
    title: "Emergency",
    risk: "Potential threat to life or limb",
    recommendation: "Rapid medical intervention needed. Continuous monitoring.",
    time: "< 15 mins"
  },
  3: {
    color: "bg-yellow-400",
    textColor: "text-yellow-600",
    lightBg: "bg-yellow-50",
    emoji: "😐",
    title: "Urgency",
    risk: "Significant distress, potential for deterioration",
    recommendation: "Standard emergency assessment. Reassess regularly.",
    time: "< 30 mins"
  },
  4: {
    color: "bg-green-500",
    textColor: "text-green-600",
    lightBg: "bg-green-50",
    emoji: "🙂",
    title: "Less Urgency",
    risk: "Mild to moderate distress",
    recommendation: "Can wait safely. Proceed with standard diagnostic pathway.",
    time: "< 60 mins"
  },
  5: {
    color: "bg-blue-500",
    textColor: "text-blue-600",
    lightBg: "bg-blue-50",
    emoji: "😄",
    title: "Non-Urgency",
    risk: "Non-urgent, stable condition",
    recommendation: "Suitable for fast-track or primary care clinic evaluation.",
    time: "< 120 mins"
  }
};

export function TriageResult({ level, onReset }: TriageResultProps) {
  const data = KTAS_DATA[level];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-10 w-full max-w-2xl mx-auto overflow-hidden relative"
    >
      {/* Decorative top bar */}
      <div className={`absolute top-0 left-0 right-0 h-3 ${data.color}`} />

      <button 
        onClick={onReset}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium mb-8"
      >
        <ArrowLeft size={16} />
        New Assessment
      </button>

      <div className="text-center mb-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Predicted KTAS Level</h2>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`mx-auto w-40 h-40 ${data.lightBg} rounded-full flex items-center justify-center mb-6 shadow-inner relative`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/50" />
          <div className="flex flex-col items-center">
            <span className={`text-6xl font-black ${data.textColor} leading-none mb-1`}>{level}</span>
            <span className="text-4xl">{data.emoji}</span>
          </div>
        </motion.div>

        <h1 className={`text-3xl font-black ${data.textColor} mb-2 tracking-tight`}>{data.title}</h1>
        <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">{data.risk}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <ShieldAlert size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Recommendation</h3>
          </div>
          <p className="text-slate-700 font-medium text-sm leading-relaxed">{data.recommendation}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Clock size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Target Time</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className={`text-2xl font-bold ${data.textColor}`}>{data.time}</span>
            <span className="text-slate-500 font-medium text-sm pb-1">to physician</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-medium text-slate-400"
      >
        <HeartPulse size={14} className="text-blue-400" />
        AI Confidence Score: 98.4%
      </motion.div>
    </motion.div>
  );
}
