import { useT } from '../../../i18n/useT';

export default function About() {
  const t = useT();

  const pillars = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: t('landing.about.p1title'),
      desc: t('landing.about.p1desc'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: t('landing.about.p2title'),
      desc: t('landing.about.p2desc'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: t('landing.about.p3title'),
      desc: t('landing.about.p3desc'),
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-bg-glow" aria-hidden="true" />
      <div className="landing-container">
        <div className="section-header">
          <div className="section-tag">{t('landing.about.tag')}</div>
          <h2 className="section-title">
            {t('landing.about.title1')}
            <br />
            <span className="gradient-text">{t('landing.about.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('landing.about.subtitle')}
          </p>
        </div>

        <div className="about-pillars">
          {pillars.map((p, i) => (
            <div key={i} className="about-pillar" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="about-pillar__icon">{p.icon}</div>
              <h3 className="about-pillar__title">{p.title}</h3>
              <p className="about-pillar__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <a href="#contact" className="landing-btn landing-btn--primary landing-btn--lg">
            {t('landing.about.cta1')}
          </a>
          <a href="#features" className="landing-btn landing-btn--ghost landing-btn--lg">
            {t('landing.about.cta2')}
          </a>
        </div>
      </div>
    </section>
  );
}
