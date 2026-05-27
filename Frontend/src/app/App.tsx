import React, { useState } from "react";
import { TriageForm, TriageFormData } from "./components/TriageForm";
import { TriageResult, KtasLevel } from "./components/TriageResult";
import { ECGLine } from "./components/ECGLine";
import { ActivitySquare, Building2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock inference logic
function inferKTAS(data: TriageFormData): KtasLevel {
  const { hr, spo2, sbp, rr, mental, nrsPain } = data;

  // Level 1: Resuscitation (Life-threatening)
  if (mental === "4" || spo2 < 85 || sbp < 80 || rr > 35) {
    return 1;
  }
  
  // Level 2: Emergency
  if (mental === "3" || spo2 < 90 || sbp < 90 || hr > 130 || nrsPain >= 8) {
    return 2;
  }

  // Level 3: Urgency
  if (mental === "2" || spo2 < 94 || hr > 110 || rr > 24 || nrsPain >= 5) {
    return 3;
  }

  // Level 4: Less Urgency
  if (hr > 100 || nrsPain >= 3) {
    return 4;
  }

  // Level 5: Non-Urgency
  return 5;
}

export default function App() {
  const [resultLevel, setResultLevel] = useState<KtasLevel | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHospitalMenu, setShowHospitalMenu] = useState(false);
  const [hospital, setHospital] = useState("Hospital Central");
  const [patientsPerHour, setPatientsPerHour] = useState(15);
  const [typeED, setTypeED] = useState("1");

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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-600/20">
              <ActivitySquare size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                Sistema de Triaje IA
              </h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Clasificación de emergencias automática
              </p>
            </div>
          </div>

          {/* Hospital Menu */}
          <div className="relative">
            <button
              onClick={() => setShowHospitalMenu(!showHospitalMenu)}
              className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <Building2 size={16} />
              <span>{hospital}</span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            {showHospitalMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 z-50"
              >
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">Configuración del Hospital</h3>
                
                {/* Hospital Name */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Hospital</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
                    placeholder="Nombre del hospital"
                  />
                </div>

                {/* Patients Per Hour */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Pacientes por Hora</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={patientsPerHour}
                      onChange={(e) => setPatientsPerHour(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
                      min="1"
                    />
                    <span className="text-sm text-slate-500">pacientes/hr</span>
                  </div>
                </div>

                {/* Type of ED */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Tipo de Urgencias</label>
                  <select
                    value={typeED}
                    onChange={(e) => setTypeED(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm appearance-none"
                  >
                    <option value="1">Servicio local nivel III</option>
                    <option value="2">Servicio regional nivel IV</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowHospitalMenu(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
                >
                  Cerrar
                </button>
              </motion.div>
            )}
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
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Evaluación de Nuevo Paciente</h2>
                <p className="text-slate-500 font-medium">Ingrese los signos vitales y observaciones clínicas para predecir el nivel KTAS.</p>
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
