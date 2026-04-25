import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null, // 'admin', 'teacher', 'assistant', 'student'
  notifications: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      if (user) {
        state.user = user;
        state.role = user.role;
        state.isAuthenticated = true;
        state.notifications = user.role === 'student' ? [
          {
            id: 1,
            title: 'Toʻlov eslatmasi',
            message: "Kurs toʻlovi 1 oy ichida SMS orqali yuboriladi. Toʻlovni vaqtida amalga oshiring.",
            type: 'payment',
          },
          {
            id: 2,
            title: 'Guruh eslatmasi',
            message: "Guruhga qo'shildingiz. 1 oy ichida avtomatik eslatma SMS orqali keladi.",
            type: 'group',
          },
          {
            id: 3,
            title: 'Bonus XP',
            message: "Darsda qatnashganingiz uchun +25 XP sovgʻa berildi!", 
            type: 'xp',
          },
        ] : [];
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.notifications = [];
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
