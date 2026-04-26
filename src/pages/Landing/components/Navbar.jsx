import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setLocale } from '../../../store/settingsSlice';
import { useT } from '../../../i18n/useT';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.settings.theme);
  const locale = useSelector((s) => s.settings.locale);
  const t = useT();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('landing.nav.about'),    href: '#about' },
    { label: t('landing.nav.features'), href: '#features' },
    { label: t('landing.nav.howItWorks'), href: '#how-it-works' },
    { label: t('landing.nav.preview'), href: '#preview' },
    { label: t('landing.nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`landing-nav ${scrolled ? 'landing-nav--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="landing-container landing-nav__inner">
        {/* Logo */}
        <a href="#" className="landing-nav__logo">
          <span className="landing-nav__logo-icon">X</span>
          <span className="landing-nav__logo-text">Edu<span>-X</span></span>
        </a>

        {/* Desktop links */}
        <ul className="landing-nav__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="landing-nav__link">{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="landing-nav__controls">
          {/* Theme toggle */}
          <button
            className="landing-nav__icon-btn"
            onClick={() => dispatch(toggleTheme())}
            title={isDark ? t('topbar.themeToLight') : t('topbar.themeToDark')}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Language switcher */}
          <div className="landing-nav__lang" role="group" aria-label="Language">
            {['uz', 'ru', 'en'].map((code) => (
              <button
                key={code}
                className={`landing-nav__lang-btn ${locale === code ? 'active' : ''}`}
                onClick={() => dispatch(setLocale(code))}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="landing-nav__cta">
            <Link to="/login" className="landing-btn landing-btn--ghost landing-btn--sm">
              {t('landing.nav.login')}
            </Link>
            <a href="#contact" className="landing-btn landing-btn--primary landing-btn--sm">
              {t('landing.nav.demo')}
            </a>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="landing-nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`ham-line ${menuOpen ? 'ham-open-1' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'ham-open-2' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'ham-open-3' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`landing-nav__mobile ${menuOpen ? 'landing-nav__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="landing-nav__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <div className="landing-nav__mobile-bottom">
          {/* Mobile lang + theme */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="landing-nav__icon-btn" onClick={() => dispatch(toggleTheme())}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <div className="landing-nav__lang" role="group">
              {['uz', 'ru', 'en'].map((code) => (
                <button
                  key={code}
                  className={`landing-nav__lang-btn ${locale === code ? 'active' : ''}`}
                  onClick={() => dispatch(setLocale(code))}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="landing-nav__mobile-cta">
            <Link to="/login" className="landing-btn landing-btn--ghost landing-btn--sm" onClick={() => setMenuOpen(false)}>
              {t('landing.nav.login')}
            </Link>
            <a href="#contact" className="landing-btn landing-btn--primary landing-btn--sm" onClick={() => setMenuOpen(false)}>
              {t('landing.nav.demo')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
