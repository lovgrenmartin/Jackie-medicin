
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { isMedicationDay } from '../utils/medicationLogic.ts';

interface CalendarViewProps {
  onClose: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onClose }) => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
  const days = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12 w-12"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const isMedDay = isMedicationDay(date);
    const isToday = new Date().toDateString() === date.toDateString();

    calendarDays.push(
      <div key={d} className="h-12 w-12 flex items-center justify-center relative">
        <div className={`
          w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all
          ${isToday ? 'ring-2 ring-stone-800 ring-offset-2' : ''}
          ${isMedDay ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}
        `}>
          {d}
        </div>
        <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isMedDay ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm glass rounded-3xl neumorph-shadow overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 flex items-center justify-between border-b border-white/20">
          <h3 className="text-xl font-bold text-stone-700">{monthNames[month]} {year}</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-200/50 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-500" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {days.map(d => (
              <div key={d} className="text-xs font-bold text-stone-400 uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays}
          </div>
        </div>

        <div className="p-4 bg-white/20 border-t border-white/20 flex justify-between gap-4">
          <button onClick={prevMonth} className="flex-1 flex items-center justify-center py-2 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors neumorph-inset">
            <ChevronLeft className="w-5 h-5 mr-1" /> Föregående
          </button>
          <button onClick={nextMonth} className="flex-1 flex items-center justify-center py-2 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors neumorph-inset">
            Nästa <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
        
        <div className="p-4 bg-stone-50/50 text-xs flex justify-around border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Kortisonsdag</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span>Vilodag</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
