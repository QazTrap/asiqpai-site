
const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
if(menu){menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)}}
document.querySelectorAll('.header nav a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const c=document.getElementById('particles');
if(c){const x=c.getContext('2d');let w,h,p=[];
const resize=()=>{w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);c.width=w*d;c.height=h*d;c.style.width=w+'px';c.style.height=h+'px';x.setTransform(d,0,0,d,0,0);p=Array.from({length:Math.min(65,Math.floor(w/22))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.2,s:Math.random()*.18+.04,a:Math.random()*.4+.08}))};
const draw=()=>{x.clearRect(0,0,w,h);p.forEach(q=>{q.y-=q.s;if(q.y<0){q.y=h;q.x=Math.random()*w}x.beginPath();x.arc(q.x,q.y,q.r,0,7);x.fillStyle=`rgba(212,175,55,${q.a})`;x.fill()});requestAnimationFrame(draw)};addEventListener('resize',resize);resize();draw()}
