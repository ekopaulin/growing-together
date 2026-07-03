import { useEffect, useRef, useState } from 'react';
import styles from './Impact.module.css';
import AnimatedCounter from './ui/AnimatedCounter';

// Sleek SVGs for Tech Aesthetic
const IconUsers = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCalendar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconTarget = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const IconHeart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;

function StatCard({ stat, idx }) {
  return (
    <div className={`${styles.statCard} reveal delay-${idx + 2}`}>
      <div className={styles.statIcon}>
        {stat.icon}
      </div>
      <div className={styles.statNum}>
        <AnimatedCounter end={stat.num.toString()} suffix={stat.suffix} />
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function Impact() {
  const sectionRef = useRef(null);
  
  const stats = [
    { num: 100, suffix: '+', label: 'Jeunes accompagnés', icon: <IconUsers /> },
    { num: 4, suffix: ' ans', label: 'D\'existence', icon: <IconCalendar /> },
    { num: 5, suffix: '', label: 'Programmes actifs', icon: <IconTarget /> },
    { num: 100, suffix: '%', label: 'Bénévoles engagés', icon: <IconHeart /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(t => t.classList.add('visible'));
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className={styles.impact} ref={sectionRef}>
      {/* Light Blobs for Glassmorphism Depth */}
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobOrange} aria-hidden="true" />
      
      {/* Background pattern */}
      <div className={styles.bg} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.hex}>⬡</span>
        ))}
      </div>

      <div className="container">
        <div className={styles.inner}>
          {/* Left: Text */}
          <div className={styles.textCol}>
            <h2 className={`${styles.title} reveal delay-1`}>
              Des chiffres qui<br />
              <span className={styles.gold}>parlent d'eux-mêmes</span>
            </h2>
            <p className={`${styles.sub} reveal delay-2`}>
              Depuis 4 ans, Growing Together construit quelque chose de grand : une ruche vivante, où chaque jeune trouve un refuge, des opportunités, et une seconde famille.
            </p>
            <a href="#soutenir" className={`btn btn-gold reveal delay-3`} style={{ marginTop: '20px' }}>
              Contribuer à l'impact →
            </a>
          </div>

          {/* Right: Stats grid */}
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
