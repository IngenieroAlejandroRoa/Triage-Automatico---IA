import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { 
  HeartPulse, 
  Thermometer, 
  Droplets, 
  Wind, 
  Brain, 
  User, 
  Ambulance, 
  Activity, 
  AlertCircle,
  Play,
  Check
} from "lucide-react";

const SYMPTOMS = [
  "Dolor abdominal",
  "Dolor en el pecho",
  "Disnea",
  "Mareos",
  "Fiebre",
  "Náusea",
  "Vómito",
  "Tos",
  "Dolor de cabeza",
  "Debilidad",
  "Palpitaciones",
  "Dificultad para respirar",
  "Desmayo",
  "Dolor de espalda",
  "Dolor articular",
  "Erupciones cutáneas",
  "Sangrado",
  "Herida",
  "Quemadura",
  "Fractura"
];

export type TriageFormData = {
  age: number;
  sex: string;
  injury: string;
  pain: string;
  hr: number;
  sbp: number;
  dbp: number;
  rr: number;
  bt: number;
  spo2: number;
  saturationTaken: boolean;
  nrsPain: number;
  mental: string;
  arrival: string;
  complaint: string[];
  otherComplaint: string;
};

interface TriageFormProps {
  onSubmit: (data: TriageFormData) => void;
  isAnalyzing: boolean;
}

export function TriageForm({ onSubmit, isAnalyzing }: TriageFormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherComplaint, setOtherComplaint] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<TriageFormData>({
    defaultValues: {
      age: 45,
      sex: "2",
      injury: "1",
      pain: "0",
      hr: 85,
      sbp: 120,
      dbp: 80,
      rr: 16,
      bt: 36.5,
      spo2: 98,
      saturationTaken: true,
      nrsPain: 3,
      mental: "1",
      arrival: "1",
      complaint: [],
      otherComplaint: ""
    }
  });

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleOtherCheckChange = (checked: boolean) => {
    setOtherChecked(checked);
    if (!checked) {
      setOtherComplaint("");
    }
  };

  const handleFormSubmit = (data: TriageFormData) => {
    const completeData = {
      ...data,
      complaint: selectedSymptoms,
      otherComplaint: otherChecked ? otherComplaint : ""
    };
    onSubmit(completeData);
  };

  const inputClasses = "w-full bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200/50 text-slate-900 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400 transition-all text-sm font-medium shadow-sm hover:shadow-md hover:border-blue-300/70";
  const labelClasses = "block text-xs font-semibold text-blue-700 mb-1.5 uppercase tracking-wider";
  const iconWrapper = "absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="relative bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl shadow-[0_20px_50px_rgba(59,130,246,0.15),0_8px_20px_rgba(0,0,0,0.08)] border border-blue-200/30 p-8 w-full max-w-4xl mx-auto overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 pointer-events-none rounded-3xl" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-t-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        
        {/* 1. Edad */}
        <div className="col-span-1">
          <label className={labelClasses}>Edad</label>
          <div className="relative">
            <div className={iconWrapper}><User size={18} /></div>
            <input type="number" {...register("age", { required: true })} className={inputClasses} placeholder="Años" />
          </div>
        </div>

        {/* 2. Sexo */}
        <div className="col-span-1">
          <label className={labelClasses}>Sexo</label>
          <div className="relative">
            <div className={iconWrapper}><User size={18} /></div>
            <select {...register("sex")} className={`${inputClasses} appearance-none`}>
              <option value="1">Femenino</option>
              <option value="2">Masculino</option>
            </select>
          </div>
        </div>

        {/* 3. Estado Mental */}
        <div className="col-span-1">
          <label className={labelClasses}>Estado Mental</label>
          <div className="relative">
            <div className={iconWrapper}><Brain size={18} /></div>
            <select {...register("mental")} className={`${inputClasses} appearance-none`}>
              <option value="1">Alerta</option>
              <option value="2">Respuesta verbal</option>
              <option value="3">Respuesta al dolor</option>
              <option value="4">Sin respuesta</option>
            </select>
          </div>
        </div>

        {/* 4. Modo de Llegada */}
        <div className="col-span-1">
          <label className={labelClasses}>Modo de Llegada</label>
          <div className="relative">
            <div className={iconWrapper}><Ambulance size={18} /></div>
            <select {...register("arrival")} className={`${inputClasses} appearance-none`}>
              <option value="1">Caminando</option>
              <option value="2">Ambulancia pública</option>
              <option value="3">Vehículo privado</option>
              <option value="4">Ambulancia privada</option>
              <option value="5">Otros</option>
            </select>
          </div>
        </div>

        {/* 5. Lesión */}
        <div className="col-span-1">
          <label className={labelClasses}>Lesión</label>
          <div className="relative">
            <div className={iconWrapper}><AlertCircle size={18} /></div>
            <select {...register("injury")} className={`${inputClasses} appearance-none`}>
              <option value="1">No</option>
              <option value="2">Sí</option>
            </select>
          </div>
        </div>

        {/* 6. Dolor */}
        <div className="col-span-1">
          <label className={labelClasses}>Dolor</label>
          <div className="relative">
            <div className={iconWrapper}><AlertCircle size={18} /></div>
            <select {...register("pain")} className={`${inputClasses} appearance-none`}>
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>
        </div>

        {/* 7. Escala de Dolor */}
        <div className="col-span-1">
          <label className={labelClasses}>Escala NRS Dolor (0-10)</label>
          <div className="relative">
            <div className={iconWrapper}><AlertCircle size={18} /></div>
            <input type="number" min="0" max="10" {...register("nrsPain")} className={inputClasses} placeholder="0 = Sin dolor" />
          </div>
        </div>

        {/* 8. Temperatura */}
        <div className="col-span-1">
          <label className={labelClasses}>Temperatura Corporal (°C)</label>
          <div className="relative">
            <div className={iconWrapper}><Thermometer size={18} /></div>
            <input type="number" step="0.1" {...register("bt")} className={inputClasses} placeholder="36.5" />
          </div>
        </div>

        {/* 9. Frecuencia Cardíaca */}
        <div className="col-span-1">
          <label className={labelClasses}>Frecuencia Cardíaca (lpm)</label>
          <div className="relative">
            <div className={iconWrapper}><HeartPulse size={18} /></div>
            <input type="number" {...register("hr")} className={inputClasses} placeholder="60-100" />
          </div>
        </div>

        {/* 10. Presión Sistólica */}
        <div className="col-span-1">
          <label className={labelClasses}>Presión Sistólica (mmHg)</label>
          <div className="relative">
            <div className={iconWrapper}><Activity size={18} /></div>
            <input type="number" {...register("sbp")} className={inputClasses} placeholder="120" />
          </div>
        </div>

        {/* 11. Presión Diastólica */}
        <div className="col-span-1">
          <label className={labelClasses}>Presión Diastólica (mmHg)</label>
          <div className="relative">
            <div className={iconWrapper}><Activity size={18} opacity={0.6}/></div>
            <input type="number" {...register("dbp")} className={inputClasses} placeholder="80" />
          </div>
        </div>

        {/* 12. Frecuencia Respiratoria */}
        <div className="col-span-1">
          <label className={labelClasses}>Frec. Respiratoria (bpm)</label>
          <div className="relative">
            <div className={iconWrapper}><Wind size={18} /></div>
            <input type="number" {...register("rr")} className={inputClasses} placeholder="12-20" />
          </div>
        </div>

        {/* 13. Saturación Tomada */}
        <div className="col-span-1 flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200/50 rounded-xl px-4 py-3 hover:bg-white hover:border-blue-300/70 hover:shadow-md transition-all w-full">
            <input
              type="checkbox"
              {...register("saturationTaken")}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700">Saturación tomada</span>
          </label>
        </div>

        {/* 14. SpO2 */}
        <div className="col-span-1">
          <label className={labelClasses}>SpO2 (%)</label>
          <div className="relative">
            <div className={iconWrapper}><Droplets size={18} /></div>
            <input type="number" {...register("spo2")} className={inputClasses} placeholder="95-100" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label className={labelClasses}>Síntomas Principales</label>
          <div className="bg-gradient-to-br from-blue-50/50 to-slate-50/50 border border-blue-200/50 rounded-2xl p-6 shadow-md shadow-blue-500/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {SYMPTOMS.map((symptom) => (
                <label key={symptom} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-white/50 border border-blue-100/50 hover:bg-white hover:border-blue-300/70 hover:shadow-md hover:shadow-blue-500/10 transition-all">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700">{symptom}</span>
                </label>
              ))}
            </div>

            {/* Otro síntoma */}
            <div className="border-t border-blue-200/50 pt-4 mt-4">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-white/50 border border-blue-100/50 hover:bg-white hover:border-blue-300/70 hover:shadow-md hover:shadow-blue-500/10 transition-all">
                <input
                  type="checkbox"
                  checked={otherChecked}
                  onChange={(e) => handleOtherCheckChange(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer mt-1"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-blue-700 block mb-2">Otro</span>
                  <input
                    type="text"
                    value={otherComplaint}
                    onChange={(e) => setOtherComplaint(e.target.value)}
                    placeholder="Especifique otro síntoma..."
                    className="w-full bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200/50 text-slate-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!otherChecked}
                  />
                </div>
              </label>
            </div>

            {selectedSymptoms.length === 0 && otherComplaint === "" && (
              <p className="text-xs text-blue-400 italic pt-3">Seleccione al menos un síntoma</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 relative z-10">
        <button 
          type="submit" 
          disabled={isAnalyzing}
          className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg py-4 px-12 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.45)] transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed border border-blue-500/20"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Analizando Vitales...
            </>
          ) : (
            <>
              Ejecutar Triaje IA
              <Play size={20} className="fill-white" />
            </>
          )}
          
          {/* Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
        </button>
      </div>
    </motion.form>
  );
}
