import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';

const contactInfo = [
  {
    icon: '📍',
    label: 'contact.info.location.label',
    defaultLabel: 'Localisation',
    value: 'contact.info.location.value',
    defaultValue: 'Yaoundé, Cameroun',
    sub: 'contact.info.location.sub',
    defaultSub: 'Centre administratif',
  },
  {
    icon: '✉️',
    label: 'contact.info.email.label',
    defaultLabel: 'Email',
    value: 'growingtogetherassociation@gmail.com',
    link: 'mailto:growingtogetherassociation@gmail.com',
    sub: 'contact.info.email.sub',
    defaultSub: 'Réponse sous 48h',
  },
  {
    icon: '📞',
    label: 'contact.info.phone.label',
    defaultLabel: 'Téléphone',
    value: (
      <>
        +237 6 94 44 26 04<br />
        +237 6 72 30 69 16<br />
        +1 (437) 463-7240
      </>
    ),
    sub: 'contact.info.phone.sub',
    defaultSub: 'Lun – Sam · 8h–18h',
  },
];

const socials = [
  { label: 'Facebook', icon: 'f', color: '#1877F2', url: 'https://www.facebook.com/share/17rvQzVEAF/' },
  { label: 'Instagram', icon: '▲', color: '#E1306C', url: '#' },
  { label: 'YouTube', icon: '▶', color: '#FF0000', url: '#' },
  { label: 'WhatsApp', icon: '●', color: '#25D366', url: '#' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal,.reveal-left,.reveal-right')
            .forEach(t => t.classList.add('visible'));
        }
      }),
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    fetch('https://formsubmit.co/ajax/growingtogetherassociation@gmail.com', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      setSent(true);
    })
    .catch(error => {
      setLoading(false);
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    });
  };

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className="container">
        
        {/* Minimalist Separator */}
        <div className={styles.separatorContainer}>
          <div className={styles.line}></div>
          <div className={styles.separatorIcon}>🐝</div>
          <div className={styles.line}></div>
        </div>

        {/* Section header */}
        <div className={`${styles.sectionHeader} reveal`}>
          <h2 className={styles.sectionTitle}>
            Une question ? <span className={styles.gold}>Parlons-en.</span>
          </h2>
          <p className={`${styles.body} reveal delay-2`}>
            Rejoignez l'aventure, posez vos questions ou proposez un partenariat. Nous lisons chaque message.
          </p>
        </div>

        {/* Two-column layout */}
        <div className={styles.grid}>

          {/* LEFT — Navy info card */}
          <div className={`${styles.infoCard} reveal-left delay-2`}>
            {/* Top: Illustration / photo */}
            <div className={styles.infoPhoto}>
              <img src="/images/orientation_jeunes.jpg" alt="Orientation Growing Together" />
              <div className={styles.photoOverlay} />
              <div className={styles.photoBadge}>
                <span>🐝</span>
                <span>Growing Together</span>
                <small>Yaoundé, Cameroun</small>
              </div>
            </div>

            {/* Bottom: Contact info */}
            <div className={styles.infoBody}>
              {contactInfo.map((item) => (
                <div key={item.label} className={styles.infoRow}>
                  <div className={styles.infoIconWrap}>{item.icon}</div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{item.defaultLabel}</span>
                    {item.link ? (
                      <a href={item.link} className={styles.infoValue} style={{ textDecoration: 'none', color: 'var(--gold)', cursor: 'pointer', wordBreak: 'break-all' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gold)'}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{typeof item.value === 'string' ? item.defaultValue : item.value}</span>
                    )}
                    <span className={styles.infoSub}>{item.defaultSub}</span>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div className={styles.socialsRow}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialDot}
                    aria-label={s.label}
                    style={{ '--s-color': s.color }}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — White form card */}
          <div className={`${styles.formCard} reveal-right delay-2`}>
            {sent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>🐝</div>
                <h3>Message envoyé !</h3>
                <p>Merci, nous vous répondrons très bientôt.</p>
                <button className="btn btn-gold" onClick={() => setSent(false)} style={{ marginTop: '20px' }}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Envoyer un message</h3>
                <p className={styles.formSub}>Tous les champs sont obligatoires.</p>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="prenom">Prénom</label>
                    <input id="prenom" name="prenom" type="text" placeholder="Ex : Marie" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" type="text" placeholder="Ex : Dupont" required />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Adresse email</label>
                  <input id="email" name="email" type="email" placeholder="marie@exemple.com" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sujet">Sujet</label>
                  <select id="sujet" name="sujet" defaultValue="">
                    <option value="" disabled>Choisir un sujet…</option>
                    <option>Renseignement général</option>
                    <option>Don / Soutien</option>
                    <option>Bénévolat</option>
                    <option>Partenariat</option>
                    <option>Presse / Médias</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Décrivez votre demande…" required />
                </div>

                {/* Important for FormSubmit logic */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_captcha" value="false" />

                <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
                </button>
                <p className={styles.formNote}>🔒 Vos données sont traitées de manière confidentielle.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
