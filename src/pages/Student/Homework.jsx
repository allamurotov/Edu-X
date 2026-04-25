import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Upload, CheckCircle2, XCircle, Clock } from 'lucide-react';

const statusConfig = {
  red: { label: 'Bajarilmagan', icon: XCircle, color: 'text-red-500' },
  blue: { label: 'Kutilmoqda', icon: Clock, color: 'text-blue-500' },
  yellow: { label: 'Qaytarilgan', icon: Clock, color: 'text-yellow-500' },
  green: { label: 'Bajarilgan', icon: CheckCircle2, color: 'text-green-500' },
};

export default function Homework() {
  const { homeworks } = useSelector(state => state.tasks);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textMain">Uy Vazifalari Tracker</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <config.icon className={config.color} size={24} />
            <div>
              <p className="text-sm font-medium text-textMain">{config.label}</p>
              <p className="text-xl font-bold text-gray-700">
                {homeworks.filter(h => h.status === key).length}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mavzu</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>Ball</TableHead>
              <TableHead className="text-right">Amal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homeworks.map((hw) => (
              <TableRow key={hw.id}>
                <TableCell className="font-medium">
                  {hw.title}
                  {hw.comment && (
                    <p className="text-xs text-red-500 mt-1">Izoh: {hw.comment}</p>
                  )}
                </TableCell>
                <TableCell>{hw.deadline}</TableCell>
                <TableCell>
                  <Badge variant={hw.status}>
                    {statusConfig[hw.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {hw.score !== null ? `${hw.score} / 100` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {['red', 'yellow'].includes(hw.status) ? (
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-[#a67c4f] transition-colors">
                      <Upload size={14} />
                      Yuklash
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Yopilgan</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
