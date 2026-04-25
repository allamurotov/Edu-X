import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

export default function Ratings() {
  const { ratings } = useSelector(state => state.student);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textMain">Umumiy Reyting</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-textMain">Top O'quvchilar (Filial bo'yicha)</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">O'rin</TableHead>
              <TableHead>O'quvchi</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.map((rating) => (
              <TableRow key={rating.id} className={rating.name.includes('Siz') ? 'bg-[#fcf6f2] hover:bg-[#fcf6f2]' : ''}>
                <TableCell className="font-bold text-gray-500">#{rating.rank}</TableCell>
                <TableCell className="font-medium text-textMain">{rating.name}</TableCell>
                <TableCell className="text-right font-bold text-primary">{rating.xp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
