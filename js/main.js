// Menu toggle
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Scroll reveal
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) sec.classList.add('visible');
  });
});

// Particles background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
window.addEventListener('resize', resize);
resize();

const particles = Array.from({length:100}, () => ({
  x: Math.random()*w,
  y: Math.random()*h,
  vx: (Math.random()-0.5)*0.6,
  vy: (Math.random()-0.5)*0.6
}));

function animate(){
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = 'gold';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>w) p.vx*=-1;
    if(p.y<0||p.y>h) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// SMS Demo
function startSMS(){
  const box = document.getElementById('smsBox');
  const inbox = document.getElementById('inbox');
  box.classList.remove('hidden');
  inbox.innerHTML = '';
  setTimeout(()=>{
    inbox.innerHTML = `<p>📩 Code: <b>584920</b></p>`;
  }, 2000);
}
