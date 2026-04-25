import { createSlice } from '@reduxjs/toolkit';

const SETTINGS_KEY = 'edu-x-settings-v1';

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

const saved = loadSettings();

const initialState = {
  theme: saved.theme === 'dark' ? 'dark' : 'light',
  locale: ['uz', 'ru', 'en'].includes(saved.locale) ? saved.locale : 'uz',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setLocale: (state, action) => {
      const loc = action.payload;
      if (loc === 'uz' || loc === 'ru' || loc === 'en') state.locale = loc;
    },
  },
});

export const { setTheme, toggleTheme, setLocale } = settingsSlice.actions;

export function persistSettingsState(state) {
  try {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ theme: state.theme, locale: state.locale })
    );
  } catch {
    /* ignore */
  }
}

export default settingsSlice.reducer;
