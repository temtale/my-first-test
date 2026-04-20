// Nav: スクロールで背景変化
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hero背景のケンバーンズ効果起動
document.querySelector('.hero__bg').classList.add('loaded');

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// スムーススクロール（href="#..." の全リンク対応）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

// スクロール時のフェードイン（Intersection Observer）
const reveals = document.querySelectorAll(
  '.about__inner, .menu-card, .access__inner, .section-label, .section-title'
);

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // カードは少しずつ遅延させる
      const delay = entry.target.classList.contains('menu-card')
        ? [...document.querySelectorAll('.menu-card')].indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
