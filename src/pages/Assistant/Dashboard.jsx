import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomeworkStatus } from '../../store/taskSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function AssistantDashboard() {
  const dispatch = useDispatch();
  const { homeworks } = useSelector(state => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const handleApprove = (id) => {
    dispatch(updateHomeworkStatus({ id, status: 'green', score: Number(score) }));
    setSelectedTask(null);
    setScore('');
    setComment('');
  };

  const handleReject = (id) => {
    dispatch(updateHomeworkStatus({ id, status: 'yellow', comment }));
    setSelectedTask(null);
    setScore('');
    setComment('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textMain">Yordamchi Ustoz Paneli</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Tekshirish Kutilayotgan Vazifalar</h2>
          <Badge variant="blue">{homeworks.filter(h => h.status === 'blue').length} ta vazifa</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mavzu</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead className="text-right">Amal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homeworks.filter(h => ['blue', 'yellow'].includes(h.status)).map(hw => (
              <React.Fragment key={hw.id}>
                <TableRow>
                  <TableCell className="font-medium">{hw.title}</TableCell>
                  <TableCell>
                    <Badge variant={hw.status}>{hw.status === 'blue' ? 'Kutilmoqda' : 'Qaytarilgan'}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => setSelectedTask(selectedTask === hw.id ? null : hw.id)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {selectedTask === hw.id ? 'Yopish' : 'Tekshirish'}
                    </button>
                  </TableCell>
                </TableRow>
                {selectedTask === hw.id && (
                  <TableRow className="bg-gray-50/50">
                    <TableCell colSpan={3}>
                      <div className="p-4 flex gap-4 items-end justify-end">
                        <div className="w-64">
                          <label className="block text-xs font-medium text-textMain mb-1">Izoh (ixtiyoriy)</label>
                          <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Xatoliklarni yozing"
                          />
                        </div>
                        <div className="w-24">
                          <label className="block text-xs font-medium text-textMain mb-1">Ball</label>
                          <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="0-100"
                            max="100"
                            min="0"
                          />
                        </div>
                        <button
                          onClick={() => handleReject(hw.id)}
                          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 flex items-center gap-1.5"
                        >
                          <XCircle size={16} /> Qaytarish
                        </button>
                        <button
                          onClick={() => handleApprove(hw.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 flex items-center gap-1.5"
                          disabled={!score}
                        >
                          <CheckCircle2 size={16} /> Qabul qilish
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            {homeworks.filter(h => ['blue', 'yellow'].includes(h.status)).length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                  Tekshirish uchun yangi vazifalar yo'q.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
