import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, Layers } from 'lucide-react';
import { useT } from '../../i18n/useT';

const mockSchedule = [
  { id: 1, group: 'React G1', teacher: 'Anvar Usmonov', time: '09:00 - 11:00', day: 'Mon', color: 'bg-violet-500' },
  { id: 2, group: 'Python B2', teacher: 'Madina Yusupova', time: '11:00 - 13:00', day: 'Mon', color: 'bg-blue-500' },
  { id: 3, group: 'Design A1', teacher: 'Kamol Nazarov', time: '14:00 - 16:00', day: 'Mon', color: 'bg-rose-500' },
  { id: 4, group: 'React G1', teacher: 'Anvar Usmonov', time: '09:00 - 11:00', day: 'Wed', color: 'bg-violet-500' },
  { id: 5, group: 'English C3', teacher: 'Dilnoza Karimova', time: '16:00 - 18:00', day: 'Tue', color: 'bg-amber-500' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export default function Schedule() {
  const t = useT();
  const [currentWeek, setCurrentWeek] = useState('Oct 24 - Oct 30, 2026');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('nav.schedule')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Weekly timetable for all groups and teachers.
          </p>
        </div>
        
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            {currentWeek}
          </span>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="w-20 p-4"></th>
                {days.map(day => (
                  <th key={day} className="min-w-[150px] p-4 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="border-b border-slate-100 dark:border-slate-900/50">
                  <td className="p-4 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {time}
                  </td>
                  {days.map(day => {
                    const lessons = mockSchedule.filter(s => s.day === day && s.time.startsWith(time));
                    return (
                      <td key={`${day}-${time}`} className="h-24 p-1.5 align-top">
                        {lessons.map(lesson => (
                          <div 
                            key={lesson.id} 
                            className={`rounded-xl p-3 text-white shadow-md ${lesson.color} mb-1 transition hover:scale-[1.02] hover:shadow-lg`}
                          >
                            <p className="text-xs font-bold leading-tight">{lesson.group}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-1.5 opacity-90">
                                <User size={10} />
                                <span className="text-[10px] font-medium">{lesson.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1.5 opacity-90">
                                <Clock size={10} />
                                <span className="text-[10px] font-medium">{lesson.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
