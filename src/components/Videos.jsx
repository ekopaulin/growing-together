import { useEffect, useRef } from 'react';
import styles from './Videos.module.css';

export default function Videos() {
  const sectionRef = useRef(null);
  
  const videos = [
    {
      id: 'aeroport',
      title: 'Sortie découverte : Aéroport',
      src: '/videos/WhatsApp Video 2026-06-27 at 13.29.39.mp4',
      poster: '/images/hero_groupe_aeroport.jpg',
      desc: 'Cette sortie éducative avait pour objectif de permettre aux jeunes de comprendre le fonctionnement d\'un aéroport, notamment ses différents services et le déroulement du trafic aérien.',
      icon: '✈️'
    },
    {
      id: 'zoo',
      title: 'Sortie éducative au Zoo',
      src: '/videos/WhatsApp Video 2026-06-27 at 13.29.39 (1).mp4',
      poster: '/images/sortie educative.jpg',
      desc: 'Cette sortie éducative au zoo avait pour objectif de permettre aux élèves de découvrir différentes espèces animales, d\'observer leurs comportements et de comprendre les caractéristiques de leur habitat naturel.',
      icon: '🦒'
    }
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
    const targets = sectionRef.current?.querySelectorAll('.reveal');
    targets?.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.videosSection} ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Vivre l'expérience <span className="highlight">en vidéo</span>
          </h2>
        </div>
        
        <div className={styles.videoList}>
          {videos.map((vid, idx) => (
            <div key={vid.id} className={`${styles.videoItem} reveal delay-${idx + 2}`}>
              <div className={styles.videoWrapper}>
                <video 
                  className={styles.videoElement} 
                  controls 
                  preload="metadata"
                  poster={vid.poster} 
                >
                  <source src={vid.src} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              <div className={styles.textContent}>
                <h3 className={styles.videoTitle}>{vid.icon} {vid.title}</h3>
                <p className={styles.videoDesc}>{vid.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
