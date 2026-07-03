import { useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

export default function Gallery() {
    
  const photos = [
    { src: '/images/session_groupe.jpg', caption: 'Session de groupe 🙌' },
    { src: '/images/sortie educative.jpg', caption: 'Sortie éducative' },
    { src: '/images/equipe_stade.jpg', caption: "L'équipe au stade 🏟️" },
    { src: '/images/about_groupe_selfie.jpg', caption: 'Nos jeunes heureux 🎉' },
    { src: '/images/hero_groupe_aeroport.jpg', caption: 'Sortie découverte ✈️' },
    { src: '/images/communaute.jpg', caption: 'Notre grande famille 💛' },
    { src: '/images/orientation_jeunes.jpg', caption: 'Orientation' },
    { src: '/images/Apprentissage culinaire.jpg', caption: 'Apprentissage culinaire 🍽️' },
    { src: '/images/gateau_famille.jpg', caption: 'Jeunes & gâteaux 🎂' },
    { src: '/images/equipe_benevoles.jpeg', caption: "L'équipe des bénévoles ✨" },
    { src: '/images/formation sur l\'elevage avec l\'association ReSo.jpg', caption: "Formation sur l'élevage" },
    { src: '/images/Seminaire sur la depravation des moeus.jpeg', caption: 'Séminaire sur les mœurs' },
    { src: '/images/selfie_jeunes.jpg', caption: 'Sourires au quotidien' },
    { src: '/images/Seminaire sur l\'ethique et la morale.jpeg', caption: "Séminaire sur l'éthique" },
    { src: '/images/Distribution des kits scolaires.jpeg', caption: 'Distribution des kits 🎒' },
    { src: '/images/Remise des kits scolaires.jpeg', caption: 'Remise des kits scolaires ✨' },
  ];

  const half = Math.ceil(photos.length / 2);
  const row1 = photos.slice(0, half);
  const row2 = photos.slice(half);

  const [lightbox, setLightbox] = useState(null);

  const handleImageClick = (src) => {
    setLightbox(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="section-header">
        <h2 className="section-title">L'album <span className="highlight">Growing Together</span></h2>
        <p className="section-sub">
          Plongez dans le quotidien de notre association. Des sourires, des apprentissages et des moments inoubliables.
        </p>
      </div>

      <div className={styles.marqueeWrapper}>
        
        {/* Ligne 1 : Défile vers la gauche */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeContent} ${styles.scrollLeft}`}>
            {row1.map((p, i) => (
              <div key={`r1-a-${i}`} className={styles.photoCard} onClick={() => handleImageClick(p.src)}>
                <img src={p.src} alt={p.caption} className={styles.photoImg} loading="lazy" />
                <div className={styles.captionOverlay}>
                  <p className={styles.captionText}>{p.caption}</p>
                  <span className={styles.captionHint}>Agrandir ⤢</span>
                </div>
              </div>
            ))}
            {/* Clone pour effet infini */}
            {row1.map((p, i) => (
              <div key={`r1-b-${i}`} className={styles.photoCard} onClick={() => handleImageClick(p.src)}>
                <img src={p.src} alt={p.caption} className={styles.photoImg} loading="lazy" />
                <div className={styles.captionOverlay}>
                  <p className={styles.captionText}>{p.caption}</p>
                  <span className={styles.captionHint}>Agrandir ⤢</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ligne 2 : Défile vers la droite */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeContent} ${styles.scrollRight}`}>
            {row2.map((p, i) => (
              <div key={`r2-a-${i}`} className={styles.photoCard} onClick={() => handleImageClick(p.src)}>
                <img src={p.src} alt={p.caption} className={styles.photoImg} loading="lazy" />
                <div className={styles.captionOverlay}>
                  <p className={styles.captionText}>{p.caption}</p>
                  <span className={styles.captionHint}>Agrandir ⤢</span>
                </div>
              </div>
            ))}
            {/* Clone pour effet infini */}
            {row2.map((p, i) => (
              <div key={`r2-b-${i}`} className={styles.photoCard} onClick={() => handleImageClick(p.src)}>
                <img src={p.src} alt={p.caption} className={styles.photoImg} loading="lazy" />
                <div className={styles.captionOverlay}>
                  <p className={styles.captionText}>{p.caption}</p>
                  <span className={styles.captionHint}>Agrandir ⤢</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>×</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
             <img src={lightbox} alt="Vue agrandie" className={styles.lightboxImg} />
          </div>
        </div>
      )}
    </section>
  );
}
