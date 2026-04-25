import { useSelector } from 'react-redux';
import { translations } from './translations';

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

export function useT() {
  const locale = useSelector((s) => s.settings.locale);
  const dict = translations[locale] || translations.uz;
  return (key, vars) => {
    let v = getNested(dict, key);
    if (typeof v !== 'string') return key;
    if (vars && typeof vars === 'object') {
      v = v.replace(/\{(\w+)\}/g, (_, k) =>
        vars[k] != null ? String(vars[k]) : `{${k}}`
      );
    }
    return v;
  };
}
