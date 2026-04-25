import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice';
import taskReducer from './taskSlice';
import adminReducer from './adminSlice';
import eduCenterReducer from './eduCenterSlice';
import uiReducer from './uiSlice';
import settingsReducer from './settingsSlice';
import { persistEduCenterState } from './eduCenterSlice';
import { persistSettingsState } from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    tasks: taskReducer,
    admin: adminReducer,
    eduCenter: eduCenterReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
});

store.subscribe(() => {
  const s = store.getState();
  persistEduCenterState(s.eduCenter);
  persistSettingsState(s.settings);
});
