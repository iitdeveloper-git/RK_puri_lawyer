import React, { useEffect, useRef, useState } from 'react';
import parse, { domToReact } from 'html-react-parser';
import pages from './content/pages.json';

const nav = [['Home','/'],['The Firm','/about/'],['Founder','/founder/'],['Practice Areas','/practice-areas/'],['Team','/team/'],['Contact','/contact/']];
const TAGLINE = 'When Expertise meets Ends of Justice';
const FIRM_EMAIL = 'Rkpur6@gmail.com';
const socialLinks = [
  ['LinkedIn', 'https://www.linkedin.com/in/rakesh-kumar-puri-0918181a9/'], ['Instagram', ''], ['Facebook', ''],
];

function SocialIcon({ name }) {
  if (name === 'LinkedIn') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.7 3A1.7 1.7 0 1 0 4.7 6.4 1.7 1.7 0 0 0 4.7 3ZM3.3 8h2.8v12H3.3zm5 0H11v1.6h.1c.4-.7 1.3-1.9 3-1.9 3.2 0 3.8 2 3.8 4.6V20h-2.8v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H8.3z"/></svg>;
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V10H8v3h2.7v8z"/></svg>;
}

function normalise(path) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner">
    <a className="brand" href="/" aria-label="R.K. Puri Law home"><span className="brand-monogram">RP</span><span><strong>R.K. PURI LAW</strong><small>ADVOCATES &amp; LEGAL CONSULTANTS</small></span></a>
    <button className="menu-toggle" type="button" aria-controls="site-nav" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span/><span/><span/></button>
    <nav id="site-nav" className={`site-nav${open ? ' open' : ''}`} aria-label="Main navigation">
      {nav.map(([label, href]) => <a key={href} href={href} className={path === href ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="/contact/">Connect</a>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <div className="footer-about">
      <div className="footer-mark">RKP<span>.</span></div>
      <h2>R.K. Puri Law</h2>
      <p className="footer-descriptor">Advocates &amp; Legal Consultants</p>
      <p className="footer-tagline">{TAGLINE}</p>
    </div>
    <div>
      <h3>Explore</h3>
      {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
    </div>
    <div>
      <h3>Policies &amp; Notice</h3>
      <a href="/non-solicitation-policy/">Non-Solicitation Policy</a>
      <a href="/disclaimer/">Disclaimer</a>
      <a href="/privacy-policy/">Privacy Policy</a>
      <a href="/terms/">Terms of Use</a>
    </div>
    <div className="footer-contact">
      <h3>Office &amp; Contact</h3>
      <p className="footer-address">18-A, Bheru Villas, Golf Course Road, Ratanada, Jodhpur, Rajasthan, India.</p>
      <a href={`mailto:${FIRM_EMAIL}`} className="footer-email">{FIRM_EMAIL}</a>
    </div>
  </div>{socialLinks.some(([, url]) => url.startsWith('https://')) && <div className="shell footer-social"><strong>Professional profiles</strong>{socialLinks.filter(([, url]) => url.startsWith('https://')).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} profile`}><SocialIcon name={name}/><span>{name}</span></a>)}</div>}
  <div className="shell footer-caution">The content of this website is intended for general informational purposes only and does not constitute legal advice. Accessing this website or submitting an enquiry does not, by itself, establish an advocate-client relationship. Any engagement is subject to acceptance by the firm, applicable professional obligations, and agreed terms.</div>
  <div className="shell footer-bottom"><span>© 2026 R.K. Puri Law. All rights reserved.</span><span>Developed by <a href="https://iitdeveloper.com/" target="_blank" rel="noopener noreferrer">IITdeveloper</a></span></div>
  <div className="shell photo-credit">Court photograph: <a href="https://commons.wikimedia.org/wiki/File:New_Rajasthan_High_Court_Building.jpg" target="_blank" rel="noopener noreferrer">TrendSPLEND / Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Format unchanged.</div></footer>;
}

const LEGAL_PATHS = ['/disclaimer/', '/privacy-policy/', '/terms/', '/non-solicitation-policy/'];
const ACK_KEY = 'rkp_ack_v2';

function Acknowledgement({ path }) {
  const [visible, setVisible] = useState(false);
  const dialog = useRef(null);
  const onLegalPage = LEGAL_PATHS.includes(path);
  useEffect(() => {
    if (onLegalPage) { setVisible(false); return; }
    try { setVisible(localStorage.getItem(ACK_KEY) !== 'yes'); }
    catch { setVisible(true); }
  }, [onLegalPage]);
  useEffect(() => {
    if (!visible) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector('button')?.focus();
    return () => { document.body.style.overflow = oldOverflow; };
  }, [visible]);
  function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.current.querySelectorAll('a, button')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function accept() {
    try { localStorage.setItem(ACK_KEY, 'yes'); } catch { /* session only */ }
    setVisible(false);
  }
  function exit() {
    window.location.replace('https://www.google.com/');
  }
  return <div className="ack" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="ack-title" hidden={!visible} onKeyDown={trapFocus}><div className="ack-card">
    <p className="eyebrow">IMPORTANT NOTICE</p><h2 id="ack-title">Disclaimer &amp; Confirmation</h2>
    <p>As per the rules of the Bar Council of India, Rakesh Puri &amp; Associates is not permitted to advertise or solicit work through this website.</p>
    <p>By clicking “I Agree”, you acknowledge that you are visiting this website voluntarily for general information purposes only. The information available on this website does not constitute legal advice, solicitation, advertisement, or an invitation to create an advocate–client relationship.</p>
    <p>Any information provided through this website should not be acted upon without seeking professional legal advice based on the specific facts and circumstances of your matter.</p>
    <p>Submission of any enquiry form or communication through this website does not create an advocate–client relationship unless formally accepted by Rakesh Puri &amp; Associates.</p>
    <div className="ack-actions">
      <button id="ack-accept" className="button button-dark" type="button" onClick={accept}>I Agree</button>
      <button className="button button-outline" type="button" onClick={exit}>Exit</button>
    </div>
    <div className="ack-links"><a href="/disclaimer/">Disclaimer</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms of Use</a></div>
  </div></div>;
}

function FloatingActions() {
  return <div className="floating-actions">
    <a className="float-whatsapp" href="https://wa.me/919414432758" target="_blank" rel="noopener noreferrer" aria-label="Contact chambers on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 .8A15.1 15.1 0 0 0 3 23.5L.9 31l7.7-2A15.2 15.2 0 1 0 16 .8Zm0 27.5c-2.4 0-4.7-.7-6.7-2l-.5-.3-4.5 1.2 1.2-4.4-.3-.5A12.3 12.3 0 1 1 16 28.3Zm6.8-9.2c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2s-1 1.2-1.2 1.4c-.2.2-.5.3-.9.1-2.4-1.2-4-2.2-5.6-4.9-.4-.6.4-.6 1.1-2 .2-.3.1-.6 0-.8l-1.2-2.8c-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.8.1-1.2.5s-1.6 1.5-1.6 3.7 1.7 4.4 1.9 2.3 3.8 4.2 8.1 5.3c2.1.9 2.9 1 4 1 1.3 0 2.3-.8 2.6-1.6.3-.8.3-1.5.2-1.6-.1-.2-.4-.3-.8-.5Z"/></svg><span>WhatsApp</span></a>
    <a className="float-contact" href="/contact/" aria-label="Open contact page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></svg><span>Contact</span></a>
  </div>;
}

function ContactForm({ domNode }) {
  const attributes = domNode.attribs || {};
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const enquiry = String(data.get('enquiry') || '').trim();
    const category = String(data.get('category') || '').trim();
    const message = String(data.get('message') || '').trim();

    const status = form.querySelector('#form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    if (status) status.textContent = 'Saving enquiry and preparing WhatsApp...';

    // 1. Dispatch lead intake to IITDeveloper Central Gateway
    try {
      await fetch('https://api.iitdeveloper.com/api/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: 'rkpurilaw',
          event_type: 'inquiry.received',
          category: category || enquiry || 'consultation',
          contact: {
            name,
            phone,
            email: email || undefined,
          },
          message,
          fields: [
            { label: 'Enquiry Type', value: enquiry || 'General Consultation' },
            { label: 'Matter Category', value: category || 'General Legal' },
          ],
          metadata: {
            source_url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      });
    } catch (err) {
      console.warn('IITDeveloper intake warning:', err);
    }

    const lines = [
      'Enquiry for R.K. Puri Law',
      `Enquiry type: ${enquiry}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Matter category: ${category}`,
      `Message: ${message}`,
    ];
    if (email) lines.splice(3, 0, `Email: ${email}`);
    if (status) status.textContent = 'Enquiry saved. Opening WhatsApp...';

    window.location.assign(`https://wa.me/919414432758?text=${encodeURIComponent(lines.join('\n'))}`);
    if (submitBtn) submitBtn.disabled = false;
  }
  return <form id={attributes.id} className={attributes.class} onSubmit={submit}>{domToReact(domNode.children)}</form>;
}

function HeroVisual() {
  return <div className="hero-visual hero-photo hero-portrait">
    <img src="/rakesh-kumar-puri.jpg" alt="Advocate Rakesh Kumar Puri" width="1024" height="1024" fetchPriority="high" />
  </div>;
}

function EditorialPhoto() {
  return <section className="editorial-photo-section" aria-label="Illustrative legal research photograph"><div className="shell editorial-photo-grid">
    <figure><img src="/placeholder-research.webp" alt="Illustrative legal research desk with an open law book and case files" width="1448" height="1086" loading="lazy" decoding="async" /><figcaption>Illustrative image · Replace with an approved practice photograph</figcaption></figure>
    <div><p className="eyebrow">PREPARATION &amp; PERSPECTIVE</p><h2>Every detail deserves careful attention.</h2><p>From the first review of a record to the final presentation of a matter, careful preparation gives advocacy its foundation.</p><a className="text-link" href="/contact/">Contact chambers</a></div>
  </div></section>;
}

function PageContent({ html }) {
  return parse(html, { replace(node) {
    if (node.name === 'form' && node.attribs?.id === 'contact-form') return <ContactForm domNode={node} />;
    if (node.name === 'div' && node.attribs?.class?.split(' ').includes('hero-visual')) return <HeroVisual />;
  } });
}

export function App({ path = '/' }) {
  const currentPath = normalise(path);
  const page = pages[currentPath] || pages['/404/'];
  return <><a className="skip" href="#main">Skip to content</a><Header path={currentPath}/><main id="main" className={currentPath === '/' ? 'page-home' : ''}><PageContent html={page.content}/>{currentPath === '/about/' && <EditorialPhoto />}</main><Footer/><Acknowledgement path={currentPath}/><FloatingActions/></>;
}

export { pages, normalise };
