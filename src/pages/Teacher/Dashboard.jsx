import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHomework } from '../../store/taskSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

export default function TeacherDashboard() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();
  const { homeworks } = useSelector(state => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && deadline) {
      dispatch(addHomework({ title, deadline }));
      setTitle('');
      setDeadline('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textMain">Ustoz Paneli</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold mb-4">Yangi Uy Vazifasi Yaratish</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-textMain mb-1">Vazifa mavzusi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
              placeholder="Masalan: React Context API"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">Muddati (Deadline)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-[#a67c4f] transition-colors"
          >
            Yaratish
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Barcha Vazifalar</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mavzu</TableHead>
              <TableHead>Muddati</TableHead>
              <TableHead>Bajarildi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homeworks.map(hw => (
              <TableRow key={hw.id}>
                <TableCell className="font-medium">{hw.title}</TableCell>
                <TableCell>{hw.deadline}</TableCell>
                <TableCell>
                  {/* Mock logic: if green, someone did it */}
                  {hw.status === 'green' ? '1 / 1' : '0 / 1'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
