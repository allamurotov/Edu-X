import { createSlice } from '@reduxjs/toolkit';
import { formatGroupName } from '../constants/courses';
import { allocateFiveDigitLogin } from '../utils/credentials';

const STORAGE_KEY = 'edu-x-center-state-v1';

export function loadEduCenterFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function persistEduCenterState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

const defaultInitial = {
  students: [],
  teachers: [],
  groups: [],
  transactions: [],
  shopItems: [],
};

function padFiveFromNum(n) {
  const v = Math.max(0, Math.min(99999, Math.floor(Number(n))));
  return String(v).padStart(5, '0');
}

function migrateStudents(rawStudents) {
  if (!Array.isArray(rawStudents)) return [];
  const used = new Set();
  return rawStudents.map((s) => {
    let num = s.loginNumericId;
    if (num == null || Number.isNaN(Number(num))) {
      const digits = String(s.loginId ?? '').replace(/\D/g, '');
      num = digits ? parseInt(digits.slice(-8), 10) % 100000 : 0;
    }
    num = Math.floor(Number(num));
    let loginId;
    if (num < 10000 || num > 99999 || used.has(num)) {
      const a = allocateFiveDigitLogin([...used]);
      num = a.numericId;
      loginId = a.loginId;
    } else {
      loginId = padFiveFromNum(num);
    }
    used.add(num);
    return {
      ...s,
      loginNumericId: num,
      loginId,
      level: typeof s.level === 'number' ? s.level : 1,
      xp: typeof s.xp === 'number' ? s.xp : 0,
      xpGoal: typeof s.xpGoal === 'number' && s.xpGoal > 0 ? s.xpGoal : 750,
      kumush: typeof s.kumush === 'number' ? s.kumush : 0,
      rank: typeof s.rank === 'number' ? s.rank : 0,
    };
  });
}

function buildInitialState() {
  const saved = loadEduCenterFromStorage();
  if (saved && typeof saved === 'object') {
    return {
      students: migrateStudents(saved.students),
      teachers: Array.isArray(saved.teachers) ? saved.teachers : [],
      groups: Array.isArray(saved.groups) ? saved.groups : [],
      transactions: Array.isArray(saved.transactions) ? saved.transactions : [],
      shopItems: Array.isArray(saved.shopItems) ? saved.shopItems : [],
    };
  }
  return { ...defaultInitial };
}

const eduCenterSlice = createSlice({
  name: 'eduCenter',
  initialState: buildInitialState(),
  reducers: {
    addStudent: (state, action) => {
      const payload = action.payload;
      const {
        firstName,
        lastName,
        fatherName,
        phone,
        parentPhone,
        previousEducation,
        selectedCourse,
        password: rawPassword,
        _issuedLogin,
      } = payload;

      const password = (rawPassword ?? '').trim();
      if (!password) return;

      const existingNums = state.students.map((x) => x.loginNumericId);
      let numericId;
      let loginId;
      const okIssued =
        _issuedLogin &&
        typeof _issuedLogin.numericId === 'number' &&
        _issuedLogin.numericId >= 10000 &&
        _issuedLogin.numericId <= 99999 &&
        !existingNums.includes(_issuedLogin.numericId) &&
        _issuedLogin.loginId === String(_issuedLogin.numericId).padStart(5, '0');
      if (okIssued) {
        numericId = _issuedLogin.numericId;
        loginId = _issuedLogin.loginId;
      } else {
        const a = allocateFiveDigitLogin(existingNums);
        numericId = a.numericId;
        loginId = a.loginId;
      }

      state.students.push({
        id: `student-${numericId}-${Date.now()}`,
        loginId,
        loginNumericId: numericId,
        password,
        firstName: (firstName ?? '').trim(),
        lastName: (lastName ?? '').trim(),
        fatherName: (fatherName ?? '').trim(),
        phone: (phone ?? '').trim(),
        parentPhone: (parentPhone ?? '').trim(),
        source: '',
        previousEducation: (previousEducation ?? '').trim(),
        selectedCourse,
        groupId: null,
        status: 'active',
        createdAt: new Date().toISOString(),
        level: 1,
        xp: 0,
        xpGoal: 750,
        kumush: 0,
        rank: 0,
      });
    },
    updateStudent: (state, action) => {
      const { id, ...patch } = action.payload;
      const s = state.students.find((x) => x.id === id);
      if (!s) return;
      Object.assign(s, patch);
    },
    assignStudentToGroup: (state, action) => {
      const { studentId, groupId } = action.payload;
      const student = state.students.find((x) => x.id === studentId);
      const group = state.groups.find((g) => g.id === groupId);
      if (!student || !group) return;

      state.groups.forEach((g) => {
        g.studentIds = g.studentIds.filter((sid) => sid !== studentId);
      });

      student.groupId = groupId;
      if (!group.studentIds.includes(studentId)) {
        group.studentIds.push(studentId);
      }
    },
    markStudentFinished: (state, action) => {
      const student = state.students.find((x) => x.id === action.payload);
      if (!student) return;
      state.groups.forEach((g) => {
        g.studentIds = g.studentIds.filter((sid) => sid !== student.id);
      });
      student.groupId = null;
      student.status = 'finished';
    },
    reactivateStudent: (state, action) => {
      const student = state.students.find((x) => x.id === action.payload);
      if (!student) return;
      student.status = 'active';
    },
    addGroup: (state, action) => {
      const { courseId, level } = action.payload;
      const name = formatGroupName(courseId, level);
      const exists = state.groups.some(
        (g) => g.courseId === courseId && g.level === level
      );
      if (exists) return;

      state.groups.push({
        id: `grp-${courseId}-N${level}-${Date.now()}`,
        courseId,
        level,
        name,
        studentIds: [],
      });
    },
    deleteGroup: (state, action) => {
      const gid = action.payload;
      state.groups = state.groups.filter((g) => g.id !== gid);
      state.students.forEach((s) => {
        if (s.groupId === gid) s.groupId = null;
      });
    },
    addTransaction: (state, action) => {
      const { type, amount, note, studentId, method } = action.payload;
      state.transactions.push({
        id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        amount: Number(amount),
        note: note?.trim() || '',
        studentId: studentId || null,
        method: method || '',
        createdAt: new Date().toISOString(),
      });
    },
    addShopItem: (state, action) => {
      const { name, priceKumush, description, imageUrl } = action.payload;
      const price = Math.max(0, Math.floor(Number(priceKumush)));
      if (!(name ?? '').trim() || !price) return;
      state.shopItems.push({
        id: `shop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        priceKumush: price,
        description: (description ?? '').trim(),
        imageUrl: (imageUrl ?? '').trim(),
        createdAt: new Date().toISOString(),
      });
    },
    updateShopItem: (state, action) => {
      const { id, ...patch } = action.payload;
      const item = state.shopItems.find((x) => x.id === id);
      if (!item) return;
      if (patch.name != null) item.name = String(patch.name).trim();
      if (patch.priceKumush != null) item.priceKumush = Math.max(0, Math.floor(Number(patch.priceKumush)));
      if (patch.description != null) item.description = String(patch.description).trim();
      if (patch.imageUrl != null) item.imageUrl = String(patch.imageUrl).trim();
    },
    deleteShopItem: (state, action) => {
      state.shopItems = state.shopItems.filter((x) => x.id !== action.payload);
    },
    addTeacher: (state, action) => {
      const payload = action.payload;
      const {
        firstName,
        lastName,
        fatherName,
        phone,
        password: rawPassword,
        _issuedLogin,
      } = payload;

      const password = (rawPassword ?? '').trim();
      if (!password) return;

      const existingNums = [...state.students, ...state.teachers].map((x) => x.loginNumericId);
      let numericId;
      let loginId;
      const okIssued =
        _issuedLogin &&
        typeof _issuedLogin.numericId === 'number' &&
        _issuedLogin.numericId >= 10000 &&
        _issuedLogin.numericId <= 99999 &&
        !existingNums.includes(_issuedLogin.numericId) &&
        _issuedLogin.loginId === String(_issuedLogin.numericId).padStart(5, '0');
      if (okIssued) {
        numericId = _issuedLogin.numericId;
        loginId = _issuedLogin.loginId;
      } else {
        const a = allocateFiveDigitLogin(existingNums);
        numericId = a.numericId;
        loginId = a.loginId;
      }

      state.teachers.push({
        id: `teacher-${numericId}-${Date.now()}`,
        loginId,
        loginNumericId: numericId,
        password,
        firstName: (firstName ?? '').trim(),
        lastName: (lastName ?? '').trim(),
        fatherName: (fatherName ?? '').trim(),
        phone: (phone ?? '').trim(),
        role: 'teacher',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    },
    updateTeacher: (state, action) => {
      const { id, ...patch } = action.payload;
      const teacher = state.teachers.find((x) => x.id === id);
      if (!teacher) return;
      Object.assign(teacher, patch);
    },
    deleteTeacher: (state, action) => {
      const teacherId = action.payload;
      state.teachers = state.teachers.filter((t) => t.id !== teacherId);
      state.groups.forEach((g) => {
        if (g.teacherId === teacherId) g.teacherId = null;
      });
    },
    assignTeacherToGroup: (state, action) => {
      const { groupId, teacherId } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (!group) return;
      group.teacherId = teacherId;
    },
    resetEduDemo: () => ({ ...defaultInitial }),
  },
});

export const {
  addStudent,
  updateStudent,
  assignStudentToGroup,
  markStudentFinished,
  reactivateStudent,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  assignTeacherToGroup,
  addGroup,
  deleteGroup,
  addTransaction,
  addShopItem,
  updateShopItem,
  deleteShopItem,
  resetEduDemo,
} = eduCenterSlice.actions;

export default eduCenterSlice.reducer;
