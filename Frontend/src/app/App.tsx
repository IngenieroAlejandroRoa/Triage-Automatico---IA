import React, { useState } from "react";
import { TriageForm, TriageFormData } from "./components/TriageForm";
import { TriageResult, KtasLevel } from "./components/TriageResult";
import { ECGLine } from "./components/ECGLine";
import { ActivitySquare, ShieldPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock inference logic
function inferKTAS(data: TriageFormData): KtasLevel {
  const { hr, spo2, sbp, rr, mental, pain } = data;

  // Level 1: Resuscitation (Life-threatening)
  if (mental === "Unresponsive" || spo2 < 85 || sbp < 80 || rr > 35) {
    return 1;
  }
  
  // Level 2: Emergency
  if (mental === "Pain" || spo2 < 90 || sbp < 90 || hr > 130 || pain >= 8) {
    return 2;
  }

  // Level 3: Urgency
  if (mental === "Verbal" || spo2 < 94 || hr > 110 || rr > 24 || pain >= 5) {
    return 3;
  }

  // Level 4: Less Urgency
  if (hr > 100 || pain >= 3) {
    return 4;
  }

  // Level 5: Non-Urgency
  return 5;
}

export default function App() {
  const [resultLevel, setResultLevel] = useState<KtasLevel | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunTriage = (data: TriageFormData) => {
    setIsAnalyzing(true);
    
    // Simulate AI inference delay for realism
    setTimeout(() => {
      const level = inferKTAS(data);
      setResultLevel(level);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetTriage = () => {
    setResultLevel(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-blue-100 relative overflow-hidden flex flex-col">
      
      {/* Background ECG Decoration */}
      <div className="absolute top-20 left-0 w-full pointer-events-none opacity-40">
        <ECGLine />
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-600/20">
              <ActivitySquare size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Triage System
              </h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Automatic emergency classification
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
            <ShieldPlus size={16} />
            <span>Secure Clinical Environment</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 relative z-0 flex flex-col items-center justify-start">
        
        <AnimatePresence mode="wait">
          {!resultLevel ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">New Patient Assessment</h2>
                <p className="text-slate-500 font-medium">Enter vital signs and clinical observations to predict KTAS level.</p>
              </div>
              <TriageForm onSubmit={handleRunTriage} isAnalyzing={isAnalyzing} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-10"
            >
              <TriageResult level={resultLevel} onReset={resetTriage} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
}
