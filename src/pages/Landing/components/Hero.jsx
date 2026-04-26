import { Link } from 'react-router-dom';
import { useT } from '../../../i18n/useT';

export default function Hero() {
  const t = useT();

  return (
    <section className="hero-section" id="home">
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />
      <div className="hero-orb hero-orb--3" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="landing-container hero-inner">
        {/* Left: text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge__dot" />
            {t('landing.hero.badge')}
          </div>

          <h1 className="hero-title">
            {t('landing.hero.title1')}{' '}
            <span className="hero-title--gradient">{t('landing.hero.title2')}</span>
            <br />
            {t('landing.hero.title3')}
          </h1>

          <p className="hero-subtitle">{t('landing.hero.subtitle')}</p>

          <div className="hero-actions">
            <a href="#contact" className="landing-btn landing-btn--primary landing-btn--lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {t('landing.hero.cta1')}
            </a>
            <Link to="/login" className="landing-btn landing-btn--outline landing-btn--lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {t('landing.hero.cta2')}
            </Link>
          </div>

          <div className="hero-trust">
            <div className="hero-trust__avatars">
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div key={i} className="hero-trust__avatar" style={{ '--i': i }}>{l}</div>
              ))}
            </div>
            <p className="hero-trust__text">
              <strong>100+</strong> {t('landing.hero.trust')}
            </p>
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div className="hero-visual" aria-label="Dashboard preview">
          <div className="dashboard-mockup">
            <div className="mockup-chrome">
              <div className="mockup-chrome__dots">
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#febc2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <div className="mockup-chrome__bar">edu-x.app/dashboard</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                <div className="mockup-sidebar__logo"><span>X</span></div>
                {['Dashboard', 'Students', 'Teachers', 'Groups', 'Finance', 'Shop'].map((item, i) => (
                  <div key={item} className={`mockup-sidebar__item ${i === 0 ? 'active' : ''}`}>
                    <div className="mockup-sidebar__dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mockup-main">
                <div className="mockup-stats">
                  {[
                    { label: 'Students', value: '1,245', icon: '👨‍🎓' },
                    { label: 'Teachers', value: '48',    icon: '👩‍🏫' },
                    { label: 'Groups',   value: '32',    icon: '📚' },
                    { label: 'Revenue',  value: '$24k',  icon: '💰' },
                  ].map((s) => (
                    <div key={s.label} className="mockup-stat-card">
                      <div className="mockup-stat-card__icon">{s.icon}</div>
                      <div className="mockup-stat-card__val">{s.value}</div>
                      <div className="mockup-stat-card__label">{s.label}</div>
                      <div className="mockup-stat-card__bar" />
                    </div>
                  ))}
                </div>
                <div className="mockup-table">
                  <div className="mockup-table__header">
                    <span>Recent Students</span>
                    <span className="mockup-table__badge">Live</span>
                  </div>
                  <div className="mockup-table__head">
                    <span>Name</span><span>Group</span><span>XP</span><span>Status</span>
                  </div>
                  {[
                    { name: 'Alisher K.', group: 'React-G1', xp: 78, status: 'active' },
                    { name: 'Zulfiya M.', group: 'Python-B2', xp: 92, status: 'active' },
                    { name: 'Bobur T.', group: 'React-G1', xp: 45, status: 'pending' },
                    { name: 'Nilufar S.', group: 'Design-A1', xp: 65, status: 'active' },
                  ].map((row) => (
                    <div key={row.name} className="mockup-table__row">
                      <div className="mockup-table__name">
                        <div className="mockup-table__avatar">{row.name[0]}</div>
                        {row.name}
                      </div>
                      <span className="mockup-table__group">{row.group}</span>
                      <div className="mockup-table__xp-wrap">
                        <div className="mockup-table__xp-bar">
                          <div className="mockup-table__xp-fill" style={{ width: `${row.xp}%` }} />
                        </div>
                        <span>{row.xp}</span>
                      </div>
                      <span className={`mockup-table__status mockup-table__status--${row.status}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-float hero-float--1"><span>🟢</span> System Online</div>
          <div className="hero-float hero-float--2"><span>⚡</span> Real-time sync</div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-hint__mouse">
          <div className="hero-scroll-hint__wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
