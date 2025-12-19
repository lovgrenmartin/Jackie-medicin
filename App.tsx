
import React, { useState, useEffect } from 'react';
import { Calendar, Info, Dog, X } from 'lucide-react';
import StatusCard from './components/StatusCard';
import CalendarView from './components/CalendarView';
import { formatDate } from './utils/medicationLogic';

const App: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 md:py-12 items-center justify-between">
      {/* Header */}
      <header className="w-full max-w-md flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm border border-stone-100 neumorph-shadow">
          <Dog className="w-10 h-10 text-stone-400" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight">Jackies Schema</h1>
          <p className="text-stone-800 font-bold text-lg">{formatDate(currentTime)}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full">
        <StatusCard date={currentTime} />
      </main>

      {/* Navigation / Actions */}
      <footer className="w-full max-w-md flex justify-center gap-16 items-center pt-8">
        <button 
          onClick={() => setShowCalendar(true)}
          className="flex flex-col items-center gap-2 group transition-all"
        >
          <div className="w-14 h-14 rounded-2xl glass neumorph-shadow flex items-center justify-center group-active:scale-95 transition-transform">
            <Calendar className="w-7 h-7 text-stone-600" />
          </div>
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest text-center">Kalender</span>
        </button>

        <button 
          onClick={() => setShowInfo(true)}
          className="flex flex-col items-center gap-2 group transition-all"
        >
          <div className="w-14 h-14 rounded-2xl glass neumorph-shadow flex items-center justify-center group-active:scale-95 transition-transform">
            <Info className="w-7 h-7 text-stone-600" />
          </div>
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest text-center">Info</span>
        </button>
      </footer>

      {/* Modals */}
      {showCalendar && (
        <CalendarView onClose={() => setShowCalendar(false)} />
      )}

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-sm glass rounded-3xl neumorph-shadow overflow-hidden flex flex-col p-8 gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-stone-800 tracking-tight">Om Jackies schema</h3>
              <button onClick={() => setShowInfo(false)} className="p-2 hover:bg-stone-200/50 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                Jackie får sitt kortison <strong>varannan dag</strong> för att må som bäst.
              </p>
              <div className="p-4 bg-white/50 rounded-2xl border border-white/40 text-sm">
                <p className="font-semibold mb-1 text-stone-500 uppercase text-[10px] tracking-widest">Referensdatum</p>
                <p className="font-bold text-stone-800">19 December 2025</p>
                <p className="text-stone-500">Detta var en dag då Jackie fick sin medicin.</p>
              </div>
              <p className="text-sm">
                Appen räknar automatiskt ut om det är en medicindag baserat på hur många dagar som gått sedan referensdatumet.
              </p>
            </div>
            <button 
              onClick={() => setShowInfo(false)}
              className="w-full py-4 bg-stone-800 text-white font-bold rounded-2xl hover:bg-stone-700 active:scale-[0.98] transition-all"
            >
              Stäng
            </button>
          </div>
        </div>
      )}

      {/* PWA Prompt Spacer */}
      <div className="h-6"></div>
    </div>
  );
};

export default App;
