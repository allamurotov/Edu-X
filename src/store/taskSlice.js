import { createSlice } from '@reduxjs/toolkit';

// statuses: 'red' (bajarilmagan), 'blue' (kutilmoqda), 'yellow' (qaytarilgan), 'green' (bajarilgan)
const initialState = {
  homeworks: [
    { id: 1, title: 'React Hooks bo\'yicha amaliyot', deadline: '2023-11-20', status: 'green', score: 100 },
    { id: 2, title: 'Redux Toolkit bilan ishlash', deadline: '2023-11-25', status: 'blue', score: null },
    { id: 3, title: 'Tailwind CSS yordamida maket yasash', deadline: '2023-11-18', status: 'yellow', score: null, comment: 'Dizaynga mos tushmagan qismlar bor' },
    { id: 4, title: 'API bilan ishlash', deadline: '2023-11-30', status: 'red', score: null },
  ]
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addHomework: (state, action) => {
      state.homeworks.push({
        id: Date.now(),
        ...action.payload,
        status: 'red',
        score: null
      });
    },
    updateHomeworkStatus: (state, action) => {
      const { id, status, score, comment } = action.payload;
      const hw = state.homeworks.find(h => h.id === id);
      if (hw) {
        if (status) hw.status = status;
        if (score !== undefined) hw.score = score;
        if (comment) hw.comment = comment;
      }
    }
  },
});

export const { addHomework, updateHomeworkStatus } = taskSlice.actions;
export default taskSlice.reducer;
