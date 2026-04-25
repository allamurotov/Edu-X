import { createSlice } from '@reduxjs/toolkit';

/** Admin-only panel login accounts (numeric ID + password). */
const initialState = {
  users: [
    {
      id: 1,
      loginNumericId: 1,
      loginId: '00001',
      name: 'Admin',
      role: 'admin',
      email: 'admin@edu-x.com',
      phone: '+998901234567',
      password: 'admin123',
    },
  ],
  groups: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const nextId = state.users.length ? Math.max(...state.users.map((u) => u.id)) + 1 : 1;
      state.users.push({
        ...action.payload,
        id: nextId,
      });
    },
    addGroup: (state, action) => {
      state.groups.push({
        id: Date.now(),
        students: 0,
        ...action.payload,
      });
    },
  },
});

export const { addUser, addGroup } = adminSlice.actions;
export default adminSlice.reducer;
