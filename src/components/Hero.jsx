import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import AnimatedCounter from './ui/AnimatedCounter';

export default function Hero() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const targets = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets?.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      {/* Animated Background blobs for Glassmorphism */}
      <div className={styles.blobOrange} aria-hidden="true" />
      <div className={styles.blobGreen} aria-hidden="true" />
      <div className={styles.blobGold} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* LEFT — Headline + CTAs inside Glass Card */}
        <div className={`${styles.glassCard} reveal-left`}>
          <h1 className={styles.headline} dangerouslySetInnerHTML={{ __html: 'Butiner, Grandir,<br/>S\'épanouir.' }} />

          <p className={styles.sub}>
            Growing Together est une association engagée au Cameroun. Nous accompagnons les jeunes vers l'excellence scolaire, le bien-être émotionnel et l'insertion sociale.
          </p>

          <div className={styles.actions}>
            <a href="#soutenir" className="btn btn-gold">Faire un don 🐝</a>
            <a href="#contact" className="btn btn-outline">Devenir bénévole</a>
          </div>

          </div>
        </div>

        {/* Stats bar moved outside for layout flexibility */}
        <div className={styles.statsBarWrapper}>
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statNum}><AnimatedCounter end="100" suffix="+" /></span>
              <span className={styles.statLabel}>Jeunes accompagnés</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}><AnimatedCounter end="4" suffix=" ans" /></span>
              <span className={styles.statLabel}>D'existence</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}><AnimatedCounter end="5" /></span>
              <span className={styles.statLabel}>Programmes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}><AnimatedCounter end="100" suffix="%" /></span>
              <span className={styles.statLabel}>Bénévoles</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Photo composition */}
        <div className={`${styles.photoCol} reveal-right delay-2`}>

          {/* Main big photo */}
          <div className={styles.mainCard}>
            <img src="/images/hero_groupe_aeroport.jpg" alt="Groupe Growing Together à l'aéroport" />
          </div>

          {/* Accent small photo */}
          <div className={styles.accentCard}>
            <img src="/images/gouter_camp.jpg" alt="Moment Growing Together" />
            <div className={styles.cardLabel}>Moment de partage 🍓</div>
          </div>

          {/* Floating badge */}
          <div className={styles.floatBadge}>
            <span className={styles.num}>4</span>
            <span className={styles.lbl}>ans d'action</span>
          </div>

          {/* Dots decoration */}
          <div className={styles.dotsDecor} aria-hidden="true" />
        </div>
      </div>

      {/* Marquee */}
      <div className={`marquee-wrapper ${styles.marquee}`}>
        <div className="marquee-track">
          {[1, 2].map(i => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span>Soutien Scolaire</span>
              <span className="dot"> · </span>
              <span>Bien-être Émotionnel</span>
              <span className="dot"> · </span>
              <span>Formation Professionnelle</span>
              <span className="dot"> · </span>
              <span>Inclusion Handicap</span>
              <span className="dot"> · </span>
              <span>Leadership & Citoyenneté</span>
              <span className="dot"> · </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
