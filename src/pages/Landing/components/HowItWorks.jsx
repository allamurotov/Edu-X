import { useT } from '../../../i18n/useT';

export default function HowItWorks() {
  const t = useT();

  const stepsList = [
    {
      num: '01',
      title: t('landing.how.s1title'),
      desc: t('landing.how.s1desc'),
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      color: '#a855f7',
    },
    {
      num: '02',
      title: t('landing.how.s2title'),
      desc: t('landing.how.s2desc'),
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      ),
      color: '#3b82f6',
    },
    {
      num: '03',
      title: t('landing.how.s3title'),
      desc: t('landing.how.s3desc'),
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      color: '#10b981',
    },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="landing-container">
        <div className="section-header">
          <div className="section-tag">{t('landing.how.tag')}</div>
          <h2 className="section-title">
            {t('landing.how.title1')}
            <br />
            <span className="gradient-text">{t('landing.how.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('landing.how.subtitle')}
          </p>
        </div>

        <div className="how-steps">
          {stepsList.map((step, i) => (
            <div key={step.num} className="how-step" style={{ '--accent': step.color, '--delay': `${i * 0.15}s` }}>
              {/* Connector line */}
              {i < stepsList.length - 1 && (
                <div className="how-step__connector" aria-hidden="true">
                  <div className="how-step__connector-line" />
                </div>
              )}

              <div className="how-step__card">
                <div className="how-step__num">{step.num}</div>
                <div className="how-step__icon">{step.icon}</div>
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how-cta">
          <a href="#contact" className="landing-btn landing-btn--primary landing-btn--lg">
            {t('landing.how.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
