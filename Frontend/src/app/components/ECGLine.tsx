import { motion } from "motion/react";

export function ECGLine({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-16 overflow-hidden opacity-20 pointer-events-none ${className}`}>
      <motion.svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-[200%] h-full stroke-blue-600 stroke-[2px] fill-none"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        <path d="M0,50 L200,50 L210,30 L220,70 L235,10 L250,90 L265,40 L275,50 L450,50 L460,30 L470,70 L485,10 L500,90 L515,40 L525,50 L700,50 L710,30 L720,70 L735,10 L750,90 L765,40 L775,50 L950,50 L960,30 L970,70 L985,10 L1000,90 L1015,40 L1025,50 L1200,50 L1210,30 L1220,70 L1235,10 L1250,90 L1265,40 L1275,50 L1450,50 L1460,30 L1470,70 L1485,10 L1500,90 L1515,40 L1525,50 L1700,50 L1710,30 L1720,70 L1735,10 L1750,90 L1765,40 L1775,50 L1950,50 L1960,30 L1970,70 L1985,10 L2000,90" />
      </motion.svg>
    </div>
  );
}
