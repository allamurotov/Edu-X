/** Base course catalog — group names are `{label} N{level}` (N1, N2, …). */
export const COURSE_CATALOG = [
  { id: 'fullstack', label: 'Bootcamp Full Stack' },
  { id: 'foundation', label: 'Bootcamp Foundation' },
  { id: 'frontend', label: 'Bootcamp Frontend' },
  { id: 'backend-python', label: 'Bootcamp Backend Python' },
  { id: 'cybersecurity', label: 'Bootcamp Cybersecurity' },
];

export function courseLabelById(id) {
  return COURSE_CATALOG.find((c) => c.id === id)?.label ?? id;
}

export function formatGroupName(courseId, level) {
  const base = courseLabelById(courseId);
  return `${base} N${level}`;
}
