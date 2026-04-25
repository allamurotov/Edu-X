/** 5-digit numeric login (10000–99999), unique within `existingNumericIds`. */
export function allocateFiveDigitLogin(existingNumericIds) {
  const used = new Set(
    (existingNumericIds ?? []).map((n) => Math.floor(Number(n))).filter((n) => n >= 10000 && n <= 99999)
  );
  for (let attempt = 0; attempt < 800; attempt += 1) {
    const n = Math.floor(10000 + Math.random() * 90000);
    if (!used.has(n)) {
      used.add(n);
      return { numericId: n, loginId: String(n).padStart(5, '0') };
    }
  }
  for (let n = 10000; n <= 99999; n += 1) {
    if (!used.has(n)) return { numericId: n, loginId: String(n).padStart(5, '0') };
  }
  return { numericId: 10000, loginId: '10000' };
}
