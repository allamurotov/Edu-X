import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    stage: 'React.js',
    xp: 1250,
    balance: 450,
    phone: '',
    city: '',
    note: '',
  },
  payments: [
    { id: 1, date: '2023-10-01', amount: '1 500 000 UZS', type: 'Uzcard', status: 'To\'langan' },
    { id: 2, date: '2023-11-01', amount: '1 500 000 UZS', type: 'Humo', status: 'To\'langan' },
    { id: 3, date: '2023-12-01', amount: '1 500 000 UZS', type: 'Naqd', status: 'Kutilmoqda' },
  ],
  ratings: [
    { id: 1, name: 'Ali Valiyev', xp: 2500, rank: 1 },
    { id: 2, name: 'Sardor Ibrohimov', xp: 2300, rank: 2 },
    { id: 3, name: 'O\'quvchi (Siz)', xp: 1250, rank: 12 },
  ],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
  },
});

export const { updateProfile } = studentSlice.actions;
export default studentSlice.reducer;
