import { useEffect, useRef, useState } from 'react';
import styles from './Support.module.css';

const GOAL_KITS = 150;
const KIT_PRICE = 20000;
const GOAL_TOTAL = GOAL_KITS * KIT_PRICE; // 3 000 000 FCFA
const KITS_RAISED_SO_FAR = 23; // à mettre à jour manuellement
const AMOUNT_RAISED = KITS_RAISED_SO_FAR * KIT_PRICE;

// Minimalist SVG Icons (Apple/Stripe Style)
const IconBook = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const IconBackpack = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>;
const IconGraduation = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const IconHeart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IconCreditCard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IconBank = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/></svg>;


export default function Support() {
  const sectionRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(1);
  
  const amounts = [
    {
      fcfa: '10 000',
      label: '½ kit scolaire',
      desc: 'Contribution partielle vers un kit complet pour un enfant',
      icon: <IconBook />,
    },
    {
      fcfa: '20 000',
      label: '1 kit scolaire complet',
      desc: 'Cahiers, stylos, règle, compas et sac : tout ce qu\'il faut pour la rentrée',
      icon: <IconBackpack />,
      popular: true,
    },
    {
      fcfa: '50 000',
      label: '2 kits + frais scolaires',
      desc: '2 kits complets et une contribution aux frais d\'inscription',
      icon: <IconGraduation />,
    },
    {
      fcfa: '100 000',
      label: '5 kits scolaires',
      desc: 'Permettez à 5 enfants de démarrer la rentrée avec le sourire',
      icon: <IconHeart />,
    },
  ];

  const impactItems = [
    { icon: '🧒', text: '100+ jeunes accompagnés chaque année' },
    { icon: '📦', text: 'Kits scolaires distribués à la rentrée' },
    { icon: '🤝', text: '100% des fonds vont directement aux jeunes' },
    { icon: '🌍', text: 'Association reconnue à Yaoundé' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal,.reveal-left,.reveal-right')
            .forEach(t => t.classList.add('visible'));
        }
      }),
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="soutenir" className={styles.support} ref={sectionRef}>

      {/* ── TOP BAND: Impact reassurance ── */}
      <div className={styles.impactBand}>
        <div className="container">
          <div className={`${styles.impactGrid} reveal`}>
            {impactItems.map((item, i) => (
              <div key={i} className={styles.impactItem}>
                <span className={styles.impactIcon}>{item.icon}</span>
                <span className={styles.impactText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container">
        <div className={styles.grid}>

          {/* LEFT — Header + description */}
          <div className={styles.textCol}>
            <h2 className={`${styles.title} reveal delay-1`}>
              Chaque don<br />
              <span className={styles.gold}>change une vie</span>
            </h2>
            <p className={`${styles.body} reveal delay-2`}>
              Growing Together fonctionne grâce à la générosité de personnes comme vous. Votre contribution, quelle que soit sa taille, permet à un jeune de Yaoundé d'avoir accès à l'éducation, à l'épanouissement et à l'avenir qu'il mérite.
            </p>

            {/* Active amount description */}
            <div className={`${styles.selectedInfo} reveal delay-3`}>
              <div className={styles.selectedIcon}>{amounts[selectedIdx >= 0 ? selectedIdx : 0].icon}</div>
              <div>
                <strong>{selectedIdx >= 0 ? amounts[selectedIdx].fcfa : '...'} FCFA</strong>
                <p>{selectedIdx >= 0 ? amounts[selectedIdx].desc : 'Un don libre pour soutenir nos actions.'}</p>
              </div>
            </div>

            {/* Payment modes */}
            <div className={`${styles.paymentModes} reveal delay-4`}>
              <p className={styles.paymentLabel}>Modes de paiement acceptés</p>
              <div className={styles.paymentBadges}>
                <span className={styles.payBadge}><IconPhone /> Mobile Money</span>
                <span className={styles.payBadge}><IconCreditCard /> PayPal</span>
                <span className={styles.payBadge}><IconBank /> Virement</span>
              </div>
              <p className={styles.secureNote}>🔒 Paiement 100% sécurisé</p>
            </div>
          </div>

          {/* RIGHT — Campaign goal + Amount picker card */}
          <div className={`${styles.pickerCard} reveal-right delay-2`}>
            {/* Campaign goal banner */}
            <div className={styles.campaignBanner}>
              <div className={styles.campaignTop}>
                <div>
                  <span className={styles.campaignLabel}>🎯 Campagne Rentrée Septembre 2025</span>
                  <p className={styles.campaignGoal}>
                    <strong>{KITS_RAISED_SO_FAR} kits</strong> collectés sur <strong>{GOAL_KITS} kits</strong> nécessaires
                  </p>
                </div>
                <div className={styles.campaignPct}>
                  {Math.round((KITS_RAISED_SO_FAR / GOAL_KITS) * 100)}%
                </div>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${Math.min((KITS_RAISED_SO_FAR / GOAL_KITS) * 100, 100)}%` }}
                />
              </div>
              <p className={styles.campaignSub}>
                1 kit = <strong>20 000 FCFA</strong> · Objectif total : {(GOAL_TOTAL / 1000000).toFixed(1)} M FCFA
              </p>
            </div>
            <div className={styles.pickerHeader}>
              <h3>Choisir un montant</h3>
              <p>Sélectionnez le don qui vous convient</p>
            </div>

            <div className={styles.amountGrid}>
              {amounts.map((a, i) => (
                <button
                  key={i}
                  className={`${styles.amountCard} ${selectedIdx === i ? styles.active : ''}`}
                  onClick={() => setSelectedIdx(i)}
                >
                  {a.popular && <span className={styles.popularTag}>⭐ Populaire</span>}
                  <span className={styles.amountIcon}>{a.icon}</span>
                  <span className={styles.amountFcfa}>
                    {a.fcfa} <small>FCFA</small>
                  </span>
                  <span className={styles.amountLabel}>{a.label}</span>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className={styles.customAmount}>
              <label htmlFor="custom-amount">Ou saisissez un montant libre (FCFA)</label>
              <input
                id="custom-amount"
                type="number"
                min="500"
                placeholder="Ex : 15 000"
                onFocus={() => setSelectedIdx(-1)}
              />
            </div>

            <button className={`btn btn-gold ${styles.ctaBtn}`}>
              Faire un don de {selectedIdx >= 0 ? `${amounts[selectedIdx].fcfa} FCFA` : '...'} →
            </button>

            <p className={styles.secureSmall}>
              🔒 Don sécurisé · Association déclarée · Reçu disponible sur demande
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
