
import React from 'react';
import { CheckCircle2, XCircle, Pill } from 'lucide-react';
import { isMedicationDay } from '../utils/medicationLogic';

interface StatusCardProps {
  date: Date;
}

const StatusCard: React.FC<StatusCardProps> = ({ date }) => {
  const isMedDay = isMedicationDay(date);

  return (
    <div className="w-full max-w-sm mx-auto p-8 glass rounded-[2.5rem] neumorph-shadow flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-stone-50 p-4 rounded-full neumorph-inset">
        <Pill className={`w-10 h-10 ${isMedDay ? 'text-emerald-500' : 'text-stone-400'}`} />
      </div>
      
      <div className="text-center">
        <h2 className="text-lg font-semibold text-stone-700 mb-1">Ska Jackie få kortison idag?</h2>
        <p className="text-xs text-stone-500 font-bold uppercase tracking-[0.2em]">
          {date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
        </p>
      </div>

      <div className={`text-8xl font-black transition-all duration-300 transform hover:scale-105 flex items-center gap-4 ${isMedDay ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isMedDay ? "JA" : "NEJ"}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full border border-stone-100">
        {isMedDay ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600">Ge tablett nu</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-rose-600">Ingen tablett idag</span>
          </>
        )}
      </div>

      <p className="text-stone-600 text-xs text-center italic leading-relaxed max-w-[200px]">
        {isMedDay 
          ? "Glöm inte att ge Jackie lite kärlek i samband med tabletten." 
          : "Idag är en vilodag. Låt Jackie njuta av dagen!"}
      </p>
    </div>
  );
};

export default StatusCard;
