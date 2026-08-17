(() => {
  /* ---------- Hamburger / Menu – runs on every page ---------- */
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.querySelector('.menu-close');

  const toggleMenu = (open) => {
    if(!menuOverlay) return;
    const isOpen = typeof open === 'boolean' ? open : !menuOverlay.hidden;
    menuOverlay.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  hamburger?.addEventListener('click', () => toggleMenu(true));
  menuClose?.addEventListener('click', () => toggleMenu(false));
  menuOverlay?.querySelector('.menu-backdrop')?.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('.menu-nav a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Gallery / Modal – only on index.html ---------- */
  const grid = document.getElementById('grid');
  if(!grid) return;

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalExif = document.getElementById('modal-exif');
  const closeBtn = modal?.querySelector('.close');
  const arrowLeft = modal?.querySelector('.arrow.left');
  const arrowRight = modal?.querySelector('.arrow.right');

  const images = [
    { src:'GFX/PORTFOLIO/1.jpg',  exif:'ISO 400 | 35mm | f/8 | 1/200s' },
    { src:'GFX/PORTFOLIO/2.jpg',  exif:'ISO 100 | 35mm | f/5.6 | 1/640s' },
    { src:'GFX/PORTFOLIO/3.jpg',  exif:'ISO 100 | 35mm | f/8 | 1/200s' },
    { src:'GFX/PORTFOLIO/4.jpg',  exif:'ISO 100 | 35mm | f/8 | 1/250s' },
    { src:'GFX/PORTFOLIO/5.jpg',  exif:'ISO 100 | 35mm | f/2.8 | 1/200s' },
    { src:'GFX/PORTFOLIO/6.jpg',  exif:'ISO 100 | 50mm | f/5.6 | 1/250s' },
    { src:'GFX/PORTFOLIO/7.jpg',  exif:'ISO 100 | 50mm | f/4 | 1/200s' },
    { src:'GFX/PORTFOLIO/8.jpg',  exif:'ISO 100 | 32mm | f/2.8 | 1/2000s' },
    { src:'GFX/PORTFOLIO/9.jpg',  exif:'ISO 100 | 45mm | f/5 | 1/200s' },
    { src:'GFX/PORTFOLIO/10.jpg', exif:'ISO 100 | 189mm | f/5.6 | 1/125s' },
    { src:'GFX/PORTFOLIO/11.jpg', exif:'ISO 100 | 30mm | f/2.8 | 1/640s' },
    { src:'GFX/PORTFOLIO/12.jpg', exif:'ISO 100 | 200mm | f/5.6 | 1/80s' },
    { src:'GFX/PORTFOLIO/13.jpg', exif:'ISO 100 | 200mm | f/5.6 | 1/125s' },
    { src:'GFX/PORTFOLIO/14.jpg', exif:'ISO 100 | 32mm | f/5.6 | 1/320s' },
    { src:'GFX/PORTFOLIO/15.jpg', exif:'ISO 400 | 28mm | f/8 | 1/250s' },
    { src:'GFX/PORTFOLIO/16.jpg', exif:'ISO 100 | 28mm | f/5.6 | 1/800s' },
    { src:'GFX/PORTFOLIO/17.jpg', exif:'ISO 100 | 32mm | f/4 | 1/320s' },
    { src:'GFX/PORTFOLIO/18.jpg', exif:'ISO 1000 | 32mm | f/4 | 1/320s' },
    { src:'GFX/PORTFOLIO/19.jpg', exif:'ISO 400 | 32mm | f/1.4 | 1/500s' },
    { src:'GFX/PORTFOLIO/20.jpg', exif:'ISO 100 | 32mm | f/5 | 1/125s' },
    { src:'GFX/PORTFOLIO/21.jpg', exif:'ISO 100 | 32mm | f/1.4 | 1/250s' },
    { src:'GFX/PORTFOLIO/22.jpg', exif:'ISO 100 | 60mm | f/1.4 | 1/6400s' },
    { src:'GFX/PORTFOLIO/23.jpg', exif:'ISO 100 | 32mm | f/6.3 | 1/15s' },
    { src:'GFX/PORTFOLIO/24.jpg', exif:'ISO 100 | 32mm | f/1.4 | 1/50s' },
    { src:'GFX/PORTFOLIO/25.jpg', exif:'ISO 100 | 32mm | f/5 | 1/125s' },
    { src:'GFX/PORTFOLIO/26.jpg', exif:'ISO 100 | 32mm | f/4 | 1/320s' },
    { src:'GFX/PORTFOLIO/27.jpg', exif:'ISO 2500 | 32mm | f/1.4 | 1/40s' }
  ];

  const shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } };
  shuffle(images);

  let currentIndex = -1;

  const setModalItem = (idx) => {
    currentIndex = idx;
    const item = images[currentIndex];
    modalImg.src = item.src;
    if(modalExif) modalExif.textContent = item.exif || '';
  };

  const openModal = (idx) => {
    setModalItem(idx);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  };

  images.forEach((item,i)=>{
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('click', ()=> openModal(i));
    grid.appendChild(img);
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  arrowLeft?.addEventListener('click', ()=> setModalItem((currentIndex-1+images.length)%images.length));
  arrowRight?.addEventListener('click', ()=> setModalItem((currentIndex+1)%images.length));

  let touchStartX = 0;
  modalImg.addEventListener('touchstart', e=>{ touchStartX = e.touches[0].clientX; }, {passive:true});
  modalImg.addEventListener('touchend', e=>{
    const delta = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(delta) > 50){
      setModalItem((currentIndex + (delta<0?1:-1) + images.length)%images.length);
    }
  }, {passive:true});

  document.addEventListener('keydown', e=>{
    if(modal?.hidden) return;
    if(e.key==='Escape') closeModal();
    if(e.key==='ArrowLeft') arrowLeft?.click();
    if(e.key==='ArrowRight') arrowRight?.click();
  });
})();
