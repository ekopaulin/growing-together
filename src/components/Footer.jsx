import styles from './Footer.module.css';

export default function Footer() {
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          {/* Logo + tagline */}
          <div className={styles.brand}>
            <img src="/images/logo_growing_together.jpg" alt="Growing Together" className={styles.logo} />
            <div>
              <p className={styles.name}>Growing Together</p>
              <p className={styles.tagline}>Butiner, Grandir, S'épanouir.</p>
            </div>
          </div>

          {/* Nav links */}
          <div className={styles.nav}>
            {['À propos', 'Programmes', 'Album', 'Impact', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace('à ', '').replace('é', 'e').replace(' ', '')}`} className={styles.link}>
                {l}
              </a>
            ))}
          </div>

          {/* Gold CTA */}
          <a href="#soutenir" className="btn btn-gold">Nous soutenir 🐝</a>
        </div>

        <div className={styles.bottom}>
          <div>
            <p>© 2025 Growing Together - Association d'encadrement et d'épanouissement des jeunes, Yaoundé, Cameroun.</p>
            <p style={{ marginTop: '8px', fontSize: '0.9em' }}>
              <a href="https://tlc1.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                By training lingua center ( TLC )
              </a>
            </p>
          </div>
          <div className={styles.bottomLinks}>
            <a href="#">Confidentialité</a>
            <span>·</span>
            <a href="#">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
