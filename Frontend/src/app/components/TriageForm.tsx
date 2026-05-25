import React from "react";
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
  Play
} from "lucide-react";

export type TriageFormData = {
  age: number;
  sex: string;
  hr: number;
  sbp: number;
  dbp: number;
  rr: number;
  bt: number;
  spo2: number;
  pain: number;
  mental: string;
  arrival: string;
  complaint: string;
};

interface TriageFormProps {
  onSubmit: (data: TriageFormData) => void;
  isAnalyzing: boolean;
}

export function TriageForm({ onSubmit, isAnalyzing }: TriageFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<TriageFormData>({
    defaultValues: {
      age: 45,
      sex: "Male",
      hr: 85,
      sbp: 120,
      dbp: 80,
      rr: 16,
      bt: 36.5,
      spo2: 98,
      pain: 3,
      mental: "Alert",
      arrival: "Walk-in",
      complaint: "Mild chest pain and shortness of breath."
    }
  });

  const inputClasses = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-medium";
  const labelClasses = "block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider";
  const iconWrapper = "absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Basic Info */}
        <div className="col-span-1">
          <label className={labelClasses}>Age</label>
          <div className="relative">
            <div className={iconWrapper}><User size={18} /></div>
            <input type="number" {...register("age", { required: true })} className={inputClasses} placeholder="Years" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Sex</label>
          <div className="relative">
            <div className={iconWrapper}><User size={18} /></div>
            <select {...register("sex")} className={`${inputClasses} appearance-none`}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Vitals */}
        <div className="col-span-1">
          <label className={labelClasses}>Heart Rate (bpm)</label>
          <div className="relative">
            <div className={iconWrapper}><HeartPulse size={18} /></div>
            <input type="number" {...register("hr")} className={inputClasses} placeholder="60-100" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Systolic BP (mmHg)</label>
          <div className="relative">
            <div className={iconWrapper}><Activity size={18} /></div>
            <input type="number" {...register("sbp")} className={inputClasses} placeholder="120" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Diastolic BP (mmHg)</label>
          <div className="relative">
            <div className={iconWrapper}><Activity size={18} opacity={0.6}/></div>
            <input type="number" {...register("dbp")} className={inputClasses} placeholder="80" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Resp. Rate (bpm)</label>
          <div className="relative">
            <div className={iconWrapper}><Wind size={18} /></div>
            <input type="number" {...register("rr")} className={inputClasses} placeholder="12-20" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Body Temp (°C)</label>
          <div className="relative">
            <div className={iconWrapper}><Thermometer size={18} /></div>
            <input type="number" step="0.1" {...register("bt")} className={inputClasses} placeholder="36.5" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>SpO2 (%)</label>
          <div className="relative">
            <div className={iconWrapper}><Droplets size={18} /></div>
            <input type="number" {...register("spo2")} className={inputClasses} placeholder="95-100" />
          </div>
        </div>

        <div className="col-span-1">
          <label className={labelClasses}>Pain Score (0-10)</label>
          <div className="relative">
            <div className={iconWrapper}><AlertCircle size={18} /></div>
            <input type="number" min="0" max="10" {...register("pain")} className={inputClasses} placeholder="0 = None" />
          </div>
        </div>

        {/* Clinical Assessment */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label className={labelClasses}>Mental State</label>
          <div className="relative">
            <div className={iconWrapper}><Brain size={18} /></div>
            <select {...register("mental")} className={`${inputClasses} appearance-none`}>
              <option value="Alert">Alert</option>
              <option value="Verbal">Responds to Verbal</option>
              <option value="Pain">Responds to Pain</option>
              <option value="Unresponsive">Unresponsive</option>
            </select>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label className={labelClasses}>Arrival Mode</label>
          <div className="relative">
            <div className={iconWrapper}><Ambulance size={18} /></div>
            <select {...register("arrival")} className={`${inputClasses} appearance-none`}>
              <option value="Ambulance">Ambulance</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Wheelchair">Wheelchair</option>
              <option value="Police">Police</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label className={labelClasses}>Chief Complaint / Motive</label>
          <textarea 
            {...register("complaint")} 
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-medium resize-none h-24"
            placeholder="Describe the patient's primary symptoms..."
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          type="submit" 
          disabled={isAnalyzing}
          className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 px-12 rounded-2xl shadow-[0_4px_20px_rgb(37,99,235,0.3)] hover:shadow-[0_6px_25px_rgb(37,99,235,0.4)] transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Analyzing Vitals...
            </>
          ) : (
            <>
              Run AI Triage
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
