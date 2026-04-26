import { useState } from 'react';
import { useT } from '../../../i18n/useT';

export default function DashboardPreview() {
  const t = useT();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: '📊',
      content: (
        <div className="preview-dashboard">
          <div className="preview-stats">
            {[
              { label: t('overview.stats.totalTitle'), val: '1,245', delta: '+12%', color: '#a855f7' },
              { label: t('groups.title'), val: '32', delta: '+3', color: '#3b82f6' },
              { label: t('overview.stats.incomeTitle'), val: '$24,800', delta: '+8%', color: '#10b981' },
              { label: t('teacher.attendanceRate'), val: '94.2%', delta: '+1.2%', color: '#f59e0b' },
            ].map((s) => (
              <div key={s.label} className="preview-stat" style={{ '--accent': s.color }}>
                <div className="preview-stat__val">{s.val}</div>
                <div className="preview-stat__label">{s.label}</div>
                <div className="preview-stat__delta">↑ {s.delta}</div>
              </div>
            ))}
          </div>
          <div className="preview-chart">
            <div className="preview-chart__label">Revenue — Last 7 months</div>
            <div className="preview-chart__bars">
              {[60, 80, 50, 90, 70, 95, 85].map((h, i) => (
                <div key={i} className="preview-chart__bar-wrap">
                  <div className="preview-chart__bar" style={{ height: `${h}%`, '--delay': `${i * 0.08}s` }} />
                  <span>{['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'students',
      label: t('nav.students'),
      icon: '👨‍🎓',
      content: (
        <div className="preview-table">
          <div className="preview-table__toolbar">
            <div className="preview-table__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              {t('topbar.searchPlaceholder')}
            </div>
            <button className="preview-table__btn">+ {t('students.newTitle')}</button>
          </div>
          <div className="preview-table__head">
            <span>#</span><span>{t('students.colName')}</span><span>{t('students.colGroup')}</span><span>{t('students.colXp')} / {t('students.colLevel')}</span><span>{t('finance.income')}</span><span>{t('students.colStatus')}</span>
          </div>
          {[
            { id: '001', name: 'Alisher Karimov', group: 'React G1', xp: 780, level: 8, paid: true },
            { id: '002', name: 'Zulfiya Mamadova', group: 'Python B2', xp: 920, level: 10, paid: true },
            { id: '003', name: 'Bobur Tursunov', group: 'React G1', xp: 450, level: 5, paid: false },
            { id: '004', name: 'Nilufar Saidova', group: 'Design A1', xp: 650, level: 7, paid: true },
            { id: '005', name: 'Jasur Holmatov', group: 'Python B2', xp: 210, level: 3, paid: false },
          ].map((s) => (
            <div key={s.id} className="preview-table__row">
              <span className="preview-table__id">{s.id}</span>
              <span className="preview-table__name-cell">
                <div className="preview-table__av">{s.name[0]}</div>
                {s.name}
              </span>
              <span className="preview-table__group-pill">{s.group}</span>
              <div className="preview-table__xp">
                <div className="preview-table__xp-track">
                  <div className="preview-table__xp-fill" style={{ width: `${(s.xp / 1000) * 100}%` }} />
                </div>
                <span>Lv.{s.level}</span>
              </div>
              <span className={`preview-table__pay ${s.paid ? 'paid' : 'unpaid'}`}>
                {s.paid ? '✓' : '✗'}
              </span>
              <span className="preview-table__status-dot" style={{ background: s.paid ? '#10b981' : '#ef4444' }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'payments',
      label: t('nav.finance'),
      icon: '💰',
      content: (
        <div className="preview-finance">
          <div className="preview-finance__summary">
            {[
              { label: t('finance.income'), val: '$24,800', icon: '💳', color: '#10b981' },
              { label: t('teacher.pendingHomework'), val: '$3,200', icon: '⏳', color: '#f59e0b' },
              { label: 'Overdue', val: '$800', icon: '⚠️', color: '#ef4444' },
            ].map((f) => (
              <div key={f.label} className="preview-finance__card" style={{ '--accent': f.color }}>
                <span className="preview-finance__icon">{f.icon}</span>
                <div>
                  <div className="preview-finance__val">{f.val}</div>
                  <div className="preview-finance__label">{f.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="preview-table__head" style={{ marginTop: '1rem' }}>
            <span>{t('finance.colStudent')}</span><span>{t('finance.colAmount')}</span><span>{t('finance.colDate')}</span><span>{t('students.colStatus')}</span>
          </div>
          {[
            { name: 'Alisher K.', amount: '$120', date: '25 Apr', status: 'paid' },
            { name: 'Zulfiya M.', amount: '$120', date: '24 Apr', status: 'paid' },
            { name: 'Bobur T.', amount: '$120', date: '—', status: 'pending' },
            { name: 'Nilufar S.', amount: '$120', date: '23 Apr', status: 'paid' },
            { name: 'Jasur H.', amount: '$120', date: '—', status: 'overdue' },
          ].map((p) => (
            <div key={p.name} className="preview-table__row">
              <span className="preview-table__name-cell">
                <div className="preview-table__av">{p.name[0]}</div>
                {p.name}
              </span>
              <span style={{ color: '#a855f7', fontWeight: 600 }}>{p.amount}</span>
              <span style={{ color: '#9ca3af' }}>{p.date}</span>
              <span className={`preview-table__pay ${p.status}`}>{p.status}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'groups',
      label: t('nav.groups'),
      icon: '📚',
      content: (
        <div className="preview-groups">
          {[
            { name: 'React G1', teacher: 'Anvar Usmonov', students: 18, days: 'Mon / Wed / Fri', time: '10:00 – 12:00', progress: 72 },
            { name: 'Python B2', teacher: 'Madina Yusupova', students: 15, days: 'Tue / Thu', time: '14:00 – 16:00', progress: 55 },
            { name: 'Design A1', teacher: 'Kamol Nazarov', students: 12, days: 'Mon / Wed', time: '09:00 – 11:00', progress: 88 },
            { name: 'English C3', teacher: 'Dilnoza Karimova', students: 20, days: 'Tue / Thu / Sat', time: '16:00 – 18:00', progress: 40 },
          ].map((g) => (
            <div key={g.name} className="preview-group-card">
              <div className="preview-group-card__header">
                <span className="preview-group-card__name">{g.name}</span>
                <span className="preview-group-card__count">{g.students} {t('teacher.students')}</span>
              </div>
              <div className="preview-group-card__teacher">👤 {g.teacher}</div>
              <div className="preview-group-card__schedule">📅 {g.days} · {g.time}</div>
              <div className="preview-group-card__progress-wrap">
                <div className="preview-group-card__progress-bar">
                  <div className="preview-group-card__progress-fill" style={{ width: `${g.progress}%` }} />
                </div>
                <span>{g.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const current = tabs.find((t) => t.id === activeTab);

  return (
    <section className="preview-section" id="preview">
      <div className="preview-bg-glow" aria-hidden="true" />
      <div className="landing-container">
        <div className="section-header">
          <div className="section-tag">{t('landing.preview.tag')}</div>
          <h2 className="section-title">
            {t('landing.preview.title1')}
            <br />
            <span className="gradient-text">{t('landing.preview.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('landing.preview.subtitle')}
          </p>
        </div>

        <div className="preview-window">
          {/* Browser chrome */}
          <div className="preview-chrome">
            <div className="preview-chrome__dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
            </div>
            <div className="preview-chrome__bar">🔒 edu-x.app/admin/dashboard</div>
          </div>

          {/* Tab bar */}
          <div className="preview-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`preview-tab ${activeTab === tab.id ? 'preview-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="preview-content" key={activeTab}>
            {current?.content}
          </div>
        </div>

        <div className="preview-cta">
          <a href="#contact" className="landing-btn landing-btn--primary landing-btn--lg">
            {t('landing.preview.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
