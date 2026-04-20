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

// お問い合わせフォーム バリデーション
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const message = document.getElementById('contactMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  let valid = true;

  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  name.classList.remove('has-error');
  email.classList.remove('has-error');
  message.classList.remove('has-error');

  if (!name.value.trim()) {
    nameError.textContent = 'お名前を入力してください。';
    name.classList.add('has-error');
    valid = false;
  }

  if (!email.value.trim()) {
    emailError.textContent = 'メールアドレスを入力してください。';
    email.classList.add('has-error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailError.textContent = 'メールアドレスの形式が正しくありません。';
    email.classList.add('has-error');
    valid = false;
  }

  if (!message.value.trim()) {
    messageError.textContent = 'お問い合わせ内容を入力してください。';
    message.classList.add('has-error');
    valid = false;
  }

  if (valid) {
    alert('送信しました');
    contactForm.reset();
  }
});

// スクロール時のフェードイン（Intersection Observer）
const reveals = document.querySelectorAll(
  '.about__inner, .menu-card, .access__inner, .contact__form, .section-label, .section-title'
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
