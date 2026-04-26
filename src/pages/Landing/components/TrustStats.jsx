import { useEffect, useRef, useState } from 'react';
import { useT } from '../../../i18n/useT';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, icon, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 1800, visible);

  return (
    <div
      ref={ref}
      className="trust-card"
      style={{ '--delay': delay }}
    >
      <div className="trust-card__icon">{icon}</div>
      <div className="trust-card__number">
        {count.toLocaleString()}
        <span className="trust-card__suffix">{suffix}</span>
      </div>
      <div className="trust-card__label">{label}</div>
    </div>
  );
}

export default function TrustStats() {
  const t = useT();
  
  const stats = [
    { value: 100, suffix: '+', label: t('landing.trust.centers'), icon: '🏫', delay: '0s' },
    { value: 10000, suffix: '+', label: t('landing.trust.students'), icon: '👨‍🎓', delay: '0.1s' },
    { value: 500, suffix: '+', label: t('landing.trust.teachers'), icon: '👩‍🏫', delay: '0.2s' },
    { value: 98, suffix: '%', label: t('landing.trust.satisfaction'), icon: '⭐', delay: '0.3s' },
  ];

  return (
    <section className="trust-section">
      <div className="trust-bg" aria-hidden="true" />
      <div className="landing-container">
        <p className="trust-eyebrow">{t('landing.trust.eyebrow')}</p>
        <div className="trust-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
