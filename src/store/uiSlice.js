import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    adminSearch: '',
  },
  reducers: {
    setAdminSearch: (state, action) => {
      state.adminSearch = action.payload ?? '';
    },
  },
});

export const { setAdminSearch } = uiSlice.actions;
export default uiSlice.reducer;
