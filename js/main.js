const progress = document.querySelector('#progress');
const header = document.querySelector('.site-header');
const mobileNav = document.querySelector('#mobileNav');
const menuToggle = document.querySelector('.menu-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${ratio * 100}%`;
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const worksStage = document.querySelector('.works-stage');
if (worksStage) { 
  let isDragging = false; 
  let startX = 0; 
  let startScrollLeft = 0; 
  /* ------------------------- マウスドラッグ ------------------------- */ 
  worksStage.addEventListener('pointerdown', (e) => { 
    if (e.target.closest('a, button, input, textarea, select')) return;
if (e.pointerType === 'mouse' && e.button !== 0) return;
    /* 左クリック・タッチ以外は無視 */ 
    if (e.pointerType === 'mouse' && e.button !== 0) return; 
    isDragging = true; 
    startX = e.clientX; 
    startScrollLeft = worksStage.scrollLeft; 
    worksStage.classList.add('is-dragging'); 
    /* ドラッグ中に選択されないようにする */ 
    worksStage.setPointerCapture(e.pointerId); 
  }); 
  
  worksStage.addEventListener('pointermove', (e) => { 
    if (!isDragging) return; 
    const distance = e.clientX - startX; 
    worksStage.scrollLeft = startScrollLeft - distance; 
  }); 
    const stopDragging = () => { 
      if (!isDragging) return; 
      
      isDragging = false; 
      worksStage.classList.remove('is-dragging'); 
    }; 
    worksStage.addEventListener('pointerup', stopDragging); 
    worksStage.addEventListener('pointercancel', stopDragging); 
    worksStage.addEventListener('lostpointercapture', stopDragging); 
    
    /* ------------------------- マウスホイール 縦ホイール → 横スクロール ------------------------- */ 
    worksStage.addEventListener('wheel', (e) => { 
      /* * Shiftを押している場合は * ブラウザ標準の横スクロールを優先 */ 
      if (e.shiftKey) return; 
      const maxScroll = 
      worksStage.scrollWidth - worksStage.clientWidth; 
      /* 横スクロールする余地がない場合 */ 
      if (maxScroll <= 0) return; 
      /* * 横スクロールできる場合、 * 縦ホイールを横方向に変換 */ 
      if (
        (e.deltaY > 0 && worksStage.scrollLeft < maxScroll) || 
        (e.deltaY < 0 && worksStage.scrollLeft > 0)
      ) { 
        e.preventDefault(); 
        worksStage.scrollLeft += e.deltaY; 
      }
     }, { passive: false }); 
    }

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal-up,.reveal-card,.process-step').forEach(el => observer.observe(el));

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${ratio * 100}%`;
  header.classList.toggle('scrolled', window.scrollY > 40);
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // href="#" は移動先がないため何もしない
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }

    let target;

    try {
      target = document.querySelector(href);
    } catch (error) {
      // 不正なセレクタなら通常の動作に任せる
      return;
    }

    // 移動先がない場合は通常のリンク動作を妨げない
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });
});

document.querySelectorAll('.magnetic').forEach(el => {
  if (reduceMotion || window.matchMedia('(pointer:coarse)').matches) return;
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .08;
    const y = (e.clientY - r.top - r.height / 2) * .08;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(() => { updateScrollUI(); ticking = false }); ticking = true; }
}, { passive: true });
