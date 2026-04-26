import { useState } from 'react';
import { Search, Filter, MessageSquare, Phone, Calendar, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useT } from '../../i18n/useT';

const mockLeads = [
  { id: 1, name: 'Abror Ismoilov', phone: '+998 90 123 45 67', message: 'I want to join the React Bootcamp.', status: 'new', date: '2026-10-25' },
  { id: 2, name: 'Malika Karimova', phone: '+998 94 444 55 66', message: 'Do you have evening classes for Python?', status: 'contacted', date: '2026-10-24' },
  { id: 3, name: 'Shoxrux Bek', phone: '+998 93 111 22 33', message: 'Price for foundation course?', status: 'converted', date: '2026-10-23' },
  { id: 4, name: 'Omina Yusupova', phone: '+998 97 777 88 99', message: 'Interested in graphic design.', status: 'new', date: '2026-10-22' },
];

const statusStyles = {
  new: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  contacted: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  converted: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
};

const statusIcons = {
  new: <AlertCircle size={14} />,
  contacted: <Clock size={14} />,
  converted: <CheckCircle size={14} />,
};

export default function Leads() {
  const t = useT();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('nav.leads')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Incoming requests from your website landing page.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-[#0B0F19]" 
            />
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-[#0B0F19] dark:text-slate-400 dark:hover:bg-slate-800">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
              <th className="p-5">Name</th>
              <th className="p-5">Contact</th>
              <th className="p-5">Message</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5">Date</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {mockLeads.map(lead => (
              <tr key={lead.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      {lead.name[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{lead.name}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Phone size={14} className="text-slate-400" />
                    {lead.phone}
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MessageSquare size={14} className="shrink-0 text-slate-400" />
                    <span className="line-clamp-1 max-w-xs">{lead.message}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[lead.status]}`}>
                      {statusIcons[lead.status]}
                      {lead.status}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={14} className="text-slate-400" />
                    {lead.date}
                  </div>
                </td>
                <td className="p-5 text-right">
                  <button className="h-8 w-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
