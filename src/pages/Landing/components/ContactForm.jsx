import { useState } from 'react';
import { useT } from '../../../i18n/useT';

export default function ContactForm() {
  const t = useT();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePhone = (phone) => {
    // Basic Uzbekistan phone validation: +998 followed by 9 digits
    const regex = /^\+998\d{9}$/;
    // Remove spaces/dashes if any
    const cleanPhone = phone.replace(/[\s-]/g, '');
    return regex.test(cleanPhone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!validatePhone(form.phone)) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg-glow" aria-hidden="true" />
      <div className="landing-container">
        <div className="contact-grid">
          {/* Left: info */}
          <div className="contact-info">
            <div className="section-tag">{t('landing.contact.tag')}</div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              {t('landing.contact.title1')} <span className="gradient-text">{t('landing.contact.title2')}</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              {t('landing.contact.subtitle')}
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.8 16z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail__label">{t('landing.contact.phone')}</div>
                  <a href="tel:+998901234567" className="contact-detail__value">+998 90 123 45 67</a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail__icon" style={{ '--dcolor': '#229ED9' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail__label">{t('landing.contact.telegram')}</div>
                  <a href="https://t.me/edux_erp" target="_blank" rel="noopener noreferrer" className="contact-detail__value">@edux_erp</a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail__icon" style={{ '--dcolor': '#10b981' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail__label">{t('landing.contact.hours')}</div>
                  <div className="contact-detail__value">{t('landing.contact.hoursVal')}</div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="contact-badges">
              <div className="contact-badge">🔒 {t('landing.contact.badge1')}</div>
              <div className="contact-badge">⚡ {t('landing.contact.badge2')}</div>
              <div className="contact-badge">🎯 {t('landing.contact.badge3')}</div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>{t('landing.contact.successTitle')}</h3>
                <p>{t('landing.contact.successText')}</p>
                <button
                  className="landing-btn landing-btn--primary"
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }); }}
                >
                  {t('landing.contact.successBtn')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__header">
                  <h3>{t('landing.contact.formTitle')}</h3>
                  <p>{t('landing.contact.formSubtitle')}</p>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-name">{t('landing.contact.nameLabel')}</label>
                  <div className={`contact-form__input-wrap ${errors.name ? 'border-red-500' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder={t('landing.contact.namePh')}
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="contact-form__input"
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-phone">{t('landing.contact.phoneLabel')}</label>
                  <div className={`contact-form__input-wrap ${errors.phone ? 'border-red-500' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.8 16z" />
                    </svg>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder={t('landing.contact.phonePh')}
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="contact-form__input"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">Format: +998901234567</p>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-message">{t('landing.contact.msgLabel')}</label>
                  <div className="contact-form__input-wrap contact-form__input-wrap--textarea">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ alignSelf: 'flex-start', marginTop: '3px' }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder={t('landing.contact.msgPh')}
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="contact-form__input contact-form__textarea"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className="landing-btn landing-btn--primary landing-btn--full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact-form__spinner" />
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      {t('landing.contact.submit')}
                    </>
                  )}
                </button>

                <p className="contact-form__privacy">
                  {t('landing.contact.privacy')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
