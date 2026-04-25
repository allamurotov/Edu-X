export function formatUZS(amount) {
  const n = Number(amount);
  if (Number.isNaN(n)) return '—';
  return `${new Intl.NumberFormat('en-US').format(n)} UZS`;
}

export function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
