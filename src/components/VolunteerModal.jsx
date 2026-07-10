import { useEffect, useRef, useState } from 'react';
import styles from './VolunteerModal.module.css';

export default function VolunteerModal({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setTimeout(() => setSent(false), 300);
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...Object.fromEntries(new FormData(e.target)),
      _subject: '🐝 Nouvelle candidature bénévole – Growing Together',
      _captcha: 'false',
    };
    fetch('https://formsubmit.co/ajax/growingtogetherassociation@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(() => { setLoading(false); setSent(true); })
      .catch(() => {
        setLoading(false);
        alert("Une erreur est survenue. Veuillez réessayer ou nous écrire directement.");
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Candidature bénévole"
    >
      <div className={styles.modal}>

        {/* ── CLOSE ── */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>
          <div>
            <span className={styles.bee}>🐝</span>
            <h2 className={styles.leftTitle}>Rejoignez la ruche</h2>
            <p className={styles.leftSub}>
              Bénévoles passionnés, professionnels engagés, chaque talent a sa place chez Growing Together.
            </p>
          </div>

          <ul className={styles.leftPerks}>
            <li className={styles.perk}>
              <span className={styles.perkDot} />
              Réponse sous 48h
            </li>
            <li className={styles.perk}>
              <span className={styles.perkDot} />
              100% bénévole, 100% humain
            </li>
            <li className={styles.perk}>
              <span className={styles.perkDot} />
              Impact direct à Yaoundé
            </li>
          </ul>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.rightPanel}>
          {sent ? (
            <div className={styles.success}>
              <span className={styles.successBee}>🐝</span>
              <h3>Candidature envoyée !</h3>
              <p>Merci. L'équipe de Growing Together vous contactera très bientôt.</p>
              <button className="btn btn-gold" onClick={onClose} style={{ marginTop: '8px' }}>
                Fermer
              </button>
            </div>
          ) : (
            <>
              <p className={styles.formTitle}>Votre candidature</p>

              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="vol-prenom">Prénom</label>
                    <input ref={firstInputRef} id="vol-prenom" name="prenom" type="text" placeholder="Marie" required />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="vol-nom">Nom</label>
                    <input id="vol-nom" name="nom" type="text" placeholder="Nguema" required />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="vol-email">Email</label>
                    <input id="vol-email" name="email" type="email" placeholder="marie@exemple.com" required />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="vol-phone">Téléphone</label>
                    <input id="vol-phone" name="telephone" type="tel" placeholder="+237 6XX XX XX XX" required />
                  </div>
                </div>

                <div className={styles.group}>
                  <label htmlFor="vol-motivation">Motivation</label>
                  <textarea id="vol-motivation" name="motivation" rows={3} placeholder="Pourquoi souhaitez-vous rejoindre Growing Together ?" required />
                </div>

                <div className={styles.group}>
                  <label htmlFor="vol-competences">Compétences</label>
                  <textarea id="vol-competences" name="competences" rows={3} placeholder="Enseignement, informatique, médecine, communication…" required />
                </div>

                <button type="submit" className={`btn btn-gold ${styles.submitBtn}`} disabled={loading}>
                  {loading ? <><span className={styles.spinner} /> Envoi…</> : 'Envoyer ma candidature'}
                </button>

                <p className={styles.note}>Données confidentielles · Réponse sous 48h</p>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
