import { useEffect, useRef } from 'react';
import styles from './Programs.module.css';

export default function Programs() {
  const sectionRef = useRef(null);
  
  const programs = [
    {
      id: 'scolaire',
      num: '01',
      icon: '📚',
      title: 'Soutien Scolaire',
      desc: 'Financement de scolarité, kits scolaires, cours de remise à niveau et cadeaux de fin d\'année pour encourager chaque enfant à avancer vers l\'excellence.',
      bgImage: '/images/sortie educative.jpg',
    },
    {
      id: 'bien-etre',
      num: '02',
      icon: '💚',
      title: 'Bien-être Émotionnel',
      desc: 'Prise en charge émotionnelle personnalisée et sorties de découverte.',
    },
    {
      id: 'formation',
      num: '03',
      icon: '🎓',
      title: 'Formation & Insertion',
      desc: 'Accompagnement vers stages et emplois avec nos partenaires.',
    },
    {
      id: 'inclusion',
      num: '04',
      icon: '♿',
      title: 'Inclusion Handicap',
      desc: 'Accompagnement spécialisé pour les jeunes porteurs de handicap. Aucun enfant laissé de côté.',
    },
    {
      id: 'leadership',
      num: '05',
      icon: '🌍',
      title: 'Leadership & Citoyenneté',
      desc: 'Actions communautaires pour former les leaders de demain.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = sectionRef.current?.querySelectorAll('.reveal, .reveal-up');
    targets?.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="programmes" className={`${styles.programs} section`} ref={sectionRef}>
      <div className="container">
        
        {/* Minimalist Separator */}
        <div className={styles.separatorContainer}>
          <div className={styles.line}></div>
          <div className={styles.separatorIcon}>🐝</div>
          <div className={styles.line}></div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>
              Nos <span className={styles.gold}>5 programmes</span> d'action
            </h2>
          </div>
          <div className={styles.headerDesc}>
            <p>
              Parce que chaque jeune est unique, nous avons développé une approche à 360° pour répondre à tous les besoins : éducation, santé mentale, et avenir professionnel.
            </p>
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Bento Item 1: Soutien Scolaire (Large, 2x2) */}
          <div className={`${styles.bentoItem} ${styles.bentoLarge} reveal-up delay-1`}>
            <div className={styles.bentoImgWrapper}>
              <img src={programs[0].bgImage} alt={programs[0].title} />
            </div>
            <div className={styles.bentoContentLarge}>
              <div className={styles.bentoTop}>
                <span className={styles.bentoNumGold}>{programs[0].num}</span>
                <span className={styles.bentoIcon}>{programs[0].icon}</span>
              </div>
              <div className={styles.bentoBottom}>
                <h3>{programs[0].title}</h3>
                <p>{programs[0].desc}</p>
                <a href="#soutenir" className={styles.bentoLinkGold}>Soutenir le programme →</a>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Bien-être (Small, Gold) */}
          <div className={`${styles.bentoItem} ${styles.bentoSmall} ${styles.bgGold} reveal-up delay-2`}>
            <div className={styles.bentoTop}>
              <span className={styles.bentoNum}>{programs[1].num}</span>
              <span className={styles.bentoIcon}>{programs[1].icon}</span>
            </div>
            <div className={styles.bentoBottom}>
              <h3>{programs[1].title}</h3>
              <p>{programs[1].desc}</p>
            </div>
          </div>

          {/* Bento Item 3: Formation (Small, White) */}
          <div className={`${styles.bentoItem} ${styles.bentoSmall} ${styles.bgWhite} reveal-up delay-3`}>
            <div className={styles.bentoTop}>
              <span className={styles.bentoNum}>{programs[2].num}</span>
              <span className={styles.bentoIcon}>{programs[2].icon}</span>
            </div>
            <div className={styles.bentoBottom}>
              <h3>{programs[2].title}</h3>
              <p>{programs[2].desc}</p>
            </div>
          </div>

          {/* Bento Item 4: Inclusion (Wide horizontal, Navy) */}
          <div className={`${styles.bentoItem} ${styles.bentoWide} ${styles.bgNavy} reveal-up delay-4`}>
            <div className={styles.wideContent}>
              <div className={styles.wideLeft}>
                <span className={styles.bentoNumGold}>{programs[3].num}</span>
                <span className={styles.bentoIcon}>{programs[3].icon}</span>
              </div>
              <div className={styles.wideRight}>
                <h3>{programs[3].title}</h3>
                <p>{programs[3].desc}</p>
              </div>
            </div>
          </div>

          {/* Bento Item 5: Leadership (Small, Green) */}
          <div className={`${styles.bentoItem} ${styles.bentoSmall} ${styles.bgGreen} reveal-up delay-5`}>
            <div className={styles.bentoTop}>
              <span className={styles.bentoNum}>{programs[4].num}</span>
              <span className={styles.bentoIcon}>{programs[4].icon}</span>
            </div>
            <div className={styles.bentoBottom}>
              <h3>{programs[4].title}</h3>
              <p>{programs[4].desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
