import { useEffect, useRef, useState } from 'react';
import styles from './VolunteerModal.module.css';

export default function VolunteerModal({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSent(false), 300);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // Custom subject so the email is easy to identify
    data._subject = '🐝 Nouvelle candidature bénévole – Growing Together';

    fetch('https://formsubmit.co/ajax/growingtogetherassociation@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        setSent(true);
      })
      .catch(() => {
        setLoading(false);
        alert("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Formulaire bénévole"
    >
      <div className={styles.modal}>

        {/* ── CLOSE BUTTON ── */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {sent ? (
          /* ── SUCCESS STATE ── */
          <div className={styles.success}>
            <div className={styles.successAnim}>🐝</div>
            <h3>Candidature envoyée !</h3>
            <p>
              Merci pour votre engagement. L'équipe de <strong>Growing Together</strong> vous
              contactera très bientôt.
            </p>
            <button className="btn btn-gold" onClick={onClose} style={{ marginTop: '24px' }}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* ── HEADER ── */}
            <div className={styles.header}>
              <span className={styles.emoji}>🐝</span>
              <div>
                <h2 className={styles.title}>Devenir bénévole</h2>
                <p className={styles.sub}>
                  Rejoignez la ruche Growing Together et changez des vies.
                </p>
              </div>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {/* Hidden FormSubmit fields */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />

              {/* Row 1: Prénom + Nom */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="vol-prenom">Prénom *</label>
                  <input
                    ref={firstInputRef}
                    id="vol-prenom"
                    name="prenom"
                    type="text"
                    placeholder="Ex : Marie"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="vol-nom">Nom *</label>
                  <input
                    id="vol-nom"
                    name="nom"
                    type="text"
                    placeholder="Ex : Nguema"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email + Téléphone */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="vol-email">Adresse email *</label>
                  <input
                    id="vol-email"
                    name="email"
                    type="email"
                    placeholder="marie@exemple.com"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="vol-phone">Téléphone *</label>
                  <input
                    id="vol-phone"
                    name="telephone"
                    type="tel"
                    placeholder="+237 6XX XX XX XX"
                    required
                  />
                </div>
              </div>

              {/* Motivation */}
              <div className={styles.group}>
                <label htmlFor="vol-motivation">Votre motivation *</label>
                <textarea
                  id="vol-motivation"
                  name="motivation"
                  rows={3}
                  placeholder="Pourquoi souhaitez-vous rejoindre Growing Together ?"
                  required
                />
              </div>

              {/* Compétences */}
              <div className={styles.group}>
                <label htmlFor="vol-competences">Vos compétences *</label>
                <textarea
                  id="vol-competences"
                  name="competences"
                  rows={3}
                  placeholder="Ex : enseignement, informatique, communication, médecine…"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-gold ${styles.submitBtn}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Envoi en cours…
                  </>
                ) : (
                  'Envoyer ma candidature 🐝'
                )}
              </button>

              <p className={styles.note}>
                🔒 Vos données sont confidentielles et utilisées uniquement par l'équipe Growing Together.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
