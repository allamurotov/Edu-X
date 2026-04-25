export function studentMatchesQuery(student, raw) {
  const q = (raw ?? '').trim().toLowerCase();
  if (!q) return true;
  const idStr = (student.loginId ?? '').toLowerCase();
  const num = String(student.loginNumericId ?? '');
  if (idStr.includes(q) || num.includes(q)) return true;
  const blob = [
    student.firstName,
    student.lastName,
    student.fatherName,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return blob.includes(q);
}

export function filterStudentsByQuery(students, raw) {
  const q = (raw ?? '').trim();
  if (!q) return students;
  return students.filter((s) => studentMatchesQuery(s, q));
}
