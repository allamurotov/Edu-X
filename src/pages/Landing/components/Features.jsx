import { useT } from '../../../i18n/useT';

export default function Features() {
  const t = useT();

  const featuresList = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: t('landing.features.s1title'),
      desc: t('landing.features.s1desc'),
      tag: 'Core',
      color: '#a855f7',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      title: t('landing.features.s2title'),
      desc: t('landing.features.s2desc'),
      tag: 'Core',
      color: '#3b82f6',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      title: t('landing.features.s3title'),
      desc: t('landing.features.s3desc'),
      tag: 'Scheduling',
      color: '#10b981',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: t('landing.features.s4title'),
      desc: t('landing.features.s4desc'),
      tag: 'Finance',
      color: '#f59e0b',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: t('landing.features.s5title'),
      desc: t('landing.features.s5desc'),
      tag: 'Security',
      color: '#ef4444',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: t('landing.features.s6title'),
      desc: t('landing.features.s6desc'),
      tag: 'Engagement',
      color: '#8b5cf6',
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-bg-glow" aria-hidden="true" />
      <div className="landing-container">
        <div className="section-header">
          <div className="section-tag">{t('landing.features.tag')}</div>
          <h2 className="section-title">
            {t('landing.features.title1')}
            <br />
            <span className="gradient-text">{t('landing.features.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('landing.features.subtitle')}
          </p>
        </div>

        <div className="features-grid">
          {featuresList.map((f, i) => (
            <article
              key={i}
              className="feature-card"
              style={{ '--accent': f.color, '--delay': `${i * 0.08}s` }}
            >
              <div className="feature-card__glow" aria-hidden="true" />
              <div className="feature-card__header">
                <div className="feature-card__icon">{f.icon}</div>
                <span className="feature-card__tag">{f.tag}</span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <div className="feature-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        <div className="features-cta">
          <a href="#contact" className="landing-btn landing-btn--primary landing-btn--lg">
            {t('landing.features.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
