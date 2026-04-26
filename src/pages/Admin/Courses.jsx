import { useState } from 'react';
import { Plus, Search, Book, Clock, CreditCard, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useT } from '../../i18n/useT';

const mockCourses = [
  { id: 1, name: 'Bootcamp Full Stack', price: '1,200,000 UZS', duration: '6 months', students: 124, color: 'bg-violet-600' },
  { id: 2, name: 'Bootcamp Foundation', price: '800,000 UZS', duration: '3 months', students: 86, color: 'bg-blue-600' },
  { id: 3, name: 'Bootcamp Frontend', price: '1,000,000 UZS', duration: '4 months', students: 54, color: 'bg-emerald-600' },
  { id: 4, name: 'Backend Python', price: '1,100,000 UZS', duration: '5 months', students: 42, color: 'bg-amber-600' },
];

export default function Courses() {
  const t = useT();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('nav.courses')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your educational programs and pricing.
          </p>
        </div>
        
        <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
          <Plus size={18} />
          Create Course
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockCourses.map(course => (
          <div key={course.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-[#0B0F19]">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${course.color} text-white shadow-lg`}>
              <Book size={24} />
            </div>
            
            <div className="absolute right-4 top-4">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.name}</h3>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <Clock size={16} strokeWidth={2.5} className="text-violet-500" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <CreditCard size={16} strokeWidth={2.5} className="text-emerald-500" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{course.price}</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/50">
              <div className="flex items-center -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-slate-200 dark:border-[#0B0F19]" />
                ))}
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-[10px] font-bold text-violet-600 dark:border-[#0B0F19] dark:bg-violet-500/10">
                  +{course.students - 3}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400">Active Students</span>
            </div>
            
            <div className="invisible absolute inset-x-0 bottom-0 flex h-12 translate-y-full items-center justify-around bg-slate-900/5 backdrop-blur-sm transition-all group-hover:visible group-hover:translate-y-0 dark:bg-white/5">
               <button className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                 <Edit2 size={14} /> Edit
               </button>
               <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
               <button className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                 <Trash2 size={14} /> Delete
               </button>
            </div>
          </div>
        ))}
        
        <button className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-6 transition hover:border-violet-500/50 hover:bg-violet-50/30 dark:border-slate-800 dark:hover:bg-violet-500/5">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold text-slate-400">Add New Course</span>
        </button>
      </div>
    </div>
  );
}
