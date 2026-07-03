import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import AnimatedCounter from './ui/AnimatedCounter';
import ScrollRevealText from './ui/ScrollRevealText';

export default function About() {
  const sectionRef = useRef(null);
  
  const values = [
    {
      icon: '🐝',
      label: 'Solidarité',
      desc: 'Nous nous entraidons comme une ruche, chacun apportant sa contribution.',
    },
    {
      icon: '🌱',
      label: 'Bienveillance',
      desc: 'Chaque jeune est accueilli avec douceur, sans jugement ni condition.',
    },
    {
      icon: '✊',
      label: 'Engagement',
      desc: 'Nos membres donnent de leur temps et de leurs ressources personnelles.',
    },
    {
      icon: '🌍',
      label: 'Inclusion',
      desc: 'Aucun enfant laissé de côté : handicap, précarité, vulnérabilité.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets?.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── LEFT — Image épurée avec ombre douce ── */}
          <div className={`${styles.imageWrapper} reveal-left`}>
            <img 
              src="/images/about_groupe_selfie.jpg" 
              alt="Jeunes Growing Together" 
              className={styles.mainImage}
            />
            
            {/* Minimalist Floating Stat */}
            <div className={styles.floatingStat}>
              <span className={styles.statNum}><AnimatedCounter end="100" suffix="+" /></span>
              <span className={styles.statLabel}>Jeunes suivis<br/>chaque année</span>
            </div>
          </div>

          {/* ── RIGHT — Texte et Grille de Valeurs ── */}
          <div className={styles.textContent}>
            
            <span className={`${styles.eyebrow} reveal delay-1`}>
              Qui sommes-nous
            </span>

            <h2 className={`${styles.title} reveal delay-2`}>
              Une ruche vivante <br />
              pour <span className="highlight">chaque jeune</span>
            </h2>

            <p className={`${styles.desc} reveal delay-3`}>
              <ScrollRevealText>
                Growing Together est née d'une conviction simple : aucun jeune ne devrait grandir seul dans la tempête. Nous sommes là où les filets de sécurité familiale et sociale sont trop fragiles, pour éduquer, soutenir et faire grandir.
              </ScrollRevealText>
            </p>

            {/* Values Grid - Clean & Minimalist */}
            <div className={`${styles.valuesGrid} reveal delay-4`}>
              {values.map((v) => (
                <div key={v.label} className={styles.valueItem}>
                  <div className={styles.iconWrapper}>{v.icon}</div>
                  <div>
                    <h4 className={styles.valueLabel}>{v.label}</h4>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
