import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const navLinks = [
    { label: 'À propos', href: '#about' },
    { label: 'Programmes', href: '#programmes' },
    { label: 'Album', href: '#gallery' },
    { label: 'Impact', href: '#impact' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.solid : ''}`}>
      <div className={`container ${styles.inner}`}>
        
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <img src="/images/logo_growing_together.jpg" alt="Logo" className={styles.logoImg} />
          Growing Together
        </a>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className={styles.ctaGroup}>
          
          <a href="#soutenir" className={`btn btn-gold ${styles.cta}`}>
            Nous soutenir
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`${styles.burger} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.menuOpen : ''}`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            {link.label}
          </a>
        ))}

        <a href="#soutenir" className={`btn btn-gold ${styles.mobileLink}`} style={{ textAlign: 'center', marginTop: '10px' }} onClick={() => setMobileMenuOpen(false)}>
          Nous soutenir
        </a>
      </div>
    </nav>
  );
}
