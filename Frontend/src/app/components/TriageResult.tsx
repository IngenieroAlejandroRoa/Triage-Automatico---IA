import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldAlert, HeartPulse, Clock, TrendingUp } from "lucide-react";

export type KtasLevel = 1 | 2 | 3 | 4 | 5;

interface TriageResultData {
  level: KtasLevel;
  confidence: number;
  description: string;
  probabilities: Record<number, number>;
}

interface TriageResultProps {
  data: TriageResultData;
  onReset: () => void;
}

const KTAS_DATA = {
  1: {
    color: "bg-red-500",
    textColor: "text-red-500",
    lightBg: "bg-red-50",
    emoji: "😨",
    title: "Reanimación",
    risk: "Amenaza inmediata para la vida",
    recommendation: "Evaluación inmediata del médico requerida. Traslade a la sala de reanimación.",
    time: "0 mins"
  },
  2: {
    color: "bg-orange-500",
    textColor: "text-orange-600",
    lightBg: "bg-orange-50",
    emoji: "😟",
    title: "Emergencia",
    risk: "Amenaza potencial para la vida o extremidades",
    recommendation: "Se requiere intervención médica rápida. Monitoreo continuo.",
    time: "< 15 mins"
  },
  3: {
    color: "bg-yellow-400",
    textColor: "text-yellow-600",
    lightBg: "bg-yellow-50",
    emoji: "😐",
    title: "Urgencia",
    risk: "Malestar significativo, potencial de deterioro",
    recommendation: "Evaluación de emergencia estándar. Reevalúe regularmente.",
    time: "< 30 mins"
  },
  4: {
    color: "bg-green-500",
    textColor: "text-green-600",
    lightBg: "bg-green-50",
    emoji: "🙂",
    title: "Menos Urgencia",
    risk: "Malestar leve a moderado",
    recommendation: "Puede esperar de manera segura. Continúe con el protocolo diagnóstico estándar.",
    time: "< 60 mins"
  },
  5: {
    color: "bg-blue-500",
    textColor: "text-blue-600",
    lightBg: "bg-blue-50",
    emoji: "😄",
    title: "No Urgencia",
    risk: "Condición no urgente, estable",
    recommendation: "Adecuado para evaluación en clínica de acceso rápido o atención primaria.",
    time: "< 120 mins"
  }
};

export function TriageResult({ data, onReset }: TriageResultProps) {
  const ktasData = KTAS_DATA[data.level];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-10 w-full max-w-2xl mx-auto overflow-hidden relative"
    >
      {/* Decorative top bar */}
      <div className={`absolute top-0 left-0 right-0 h-3 ${ktasData.color}`} />

      <button 
        onClick={onReset}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 transition-colors text-sm font-medium mb-8"
      >
        <ArrowLeft size={16} />
        Nueva Evaluación
      </button>

      <div className="text-center mb-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Nivel KTAS Predicho</h2>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`mx-auto w-40 h-40 ${ktasData.lightBg} rounded-full flex items-center justify-center mb-6 shadow-inner relative`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/50" />
          <div className="flex flex-col items-center">
            <span className={`text-6xl font-black ${ktasData.textColor} leading-none mb-1`}>{data.level}</span>
            <span className="text-4xl">{ktasData.emoji}</span>
          </div>
        </motion.div>

        <h1 className={`text-3xl font-black ${ktasData.textColor} mb-2 tracking-tight`}>{ktasData.title}</h1>
        <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">{ktasData.risk}</p>
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
            <h3 className="text-xs font-bold uppercase tracking-wider">Recomendación</h3>
          </div>
          <p className="text-slate-700 font-medium text-sm leading-relaxed">{ktasData.recommendation}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Clock size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Tiempo Objetivo</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className={`text-2xl font-bold ${ktasData.textColor}`}>{ktasData.time}</span>
            <span className="text-slate-500 font-medium text-sm pb-1">para el médico</span>
          </div>
        </motion.div>
      </div>

      {/* Confidence Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-3">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-widest">Confianza</span>
          </div>
          <span className={`text-3xl font-bold ${ktasData.textColor}`}>{data.confidence.toFixed(1)}%</span>
        </div>
      </motion.div>

      {/* Bottom note */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-medium text-slate-400"
      >
        <HeartPulse size={14} className="text-blue-400" />
        Predicción basada en Random Forest
      </motion.div>
    </motion.div>
  );
}
