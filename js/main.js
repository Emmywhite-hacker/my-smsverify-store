/* =========================
   GLOBAL FUNCTIONS
========================= */

// Menu toggle
function toggleMenu(){
  const menu=document.getElementById("navMenu");
  menu.style.display=menu.style.display==="flex"?"none":"flex";
}

// Scroll reveal sections
const sections=document.querySelectorAll("section");
window.addEventListener("scroll",()=>{
  sections.forEach(sec=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<window.innerHeight-100){ sec.classList.add("visible"); }
  });
});

/* =========================
   PARTICLE BACKGROUND
========================= */
const canvas=document.getElementById("bg-canvas");
if(canvas){
  const ctx=canvas.getContext("2d");
  let w,h;
  function resize(){w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;}
  window.addEventListener("resize",resize);
  resize();
  const particles=[];
  for(let i=0;i<120;i++){
    particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*1.2,size:2+Math.random()*2});
  }
  function draw(){
    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle="rgba(0,255,204,0.2)";
    for(let i=0;i<particles.length;i++){
      const p=particles[i];
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;
      if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle="#0ff"; ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const p2=particles[j];
        const dx=p.x-p2.x, dy=p.y-p2.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<100){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* =========================
   LOCAL STORAGE / USERS
========================= */
const usersKey = 'emmyUsers';
let loggedUser = JSON.parse(localStorage.getItem('emmyLogged'));

// Save user helper
function saveUser(user){
  let users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const index = users.findIndex(u=>u.username===user.username);
  if(index!==-1){ users[index] = user; localStorage.setItem(usersKey, JSON.stringify(users)); }
  localStorage.setItem('emmyLogged', JSON.stringify(user));
}

/* =========================
   LOGIN / REGISTER
========================= */
if(document.getElementById('regBtn')){
  document.getElementById('regBtn').addEventListener('click', ()=>{
    const username = document.getElementById('regUser').value.trim();
    const password = document.getElementById('regPass').value.trim();
    if(!username || !password){ alert('Fill all fields'); return; }
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    if(users.find(u=>u.username===username)){ alert('User exists!'); return; }
    users.push({username,password,balance:20,orders:[]});
    localStorage.setItem(usersKey, JSON.stringify(users));
    alert('Registered! You can now login.');
  });

  document.getElementById('loginBtn').addEventListener('click', ()=>{
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    const user = users.find(u=>u.username===username && u.password===password);
    if(user){
      localStorage.setItem('emmyLogged', JSON.stringify(user));
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    }else{
      alert('Invalid credentials!');
    }
  });
}

/* =========================
   DASHBOARD
========================= */
if(document.getElementById('username')){
  if(!loggedUser){ alert('Please login first'); window.location.href='login.html'; }
  document.getElementById('username').textContent = loggedUser.username;
  document.getElementById('balance').textContent = loggedUser.balance;
  const orderList = document.getElementById('orderList');
  if(loggedUser.orders.length===0){
    orderList.innerHTML = '<li>No orders yet</li>';
  } else {
    orderList.innerHTML = loggedUser.orders.map(o=>`<li>${o}</li>`).join('');
  }

  document.getElementById('addFundsBtn').addEventListener('click', ()=>{
    loggedUser.balance += 10;
    document.getElementById('balance').textContent = loggedUser.balance;
    saveUser(loggedUser);
    alert('Added $10 (Demo)');
  });

  if(document.getElementById('logoutLink')){
    document.getElementById('logoutLink').addEventListener('click', ()=>{
      localStorage.removeItem('emmyLogged');
    });
  }
}

/* =========================
   ADMIN PANEL
========================= */
if(document.getElementById('totalUsers')){
  let users = JSON.parse(localStorage.getItem(usersKey)) || [];
  document.getElementById('totalUsers').textContent = users.length;
  let totalBalance = users.reduce((sum,u)=>sum + u.balance,0);
  document.getElementById('totalBalance').textContent = totalBalance;
  const userList = document.getElementById('userList');
  if(users.length===0) userList.innerHTML = '<li>No users registered yet</li>';
  else {
    users.forEach((u,index)=>{
      const li = document.createElement('li');
      li.innerHTML = `${u.username} - Balance: $${u.balance} - Orders: ${u.orders.length} 
        <button onclick="deleteUser(${index})" style="margin-left:10px;">Delete</button>`;
      userList.appendChild(li);
    });
  }
}

// Delete user helper for admin
function deleteUser(index){
  if(confirm('Are you sure you want to delete this user?')){
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    users.splice(index,1);
    localStorage.setItem(usersKey, JSON.stringify(users));
    location.reload();
  }
}

/* =========================
   MARKETPLACE
========================= */
const accounts = [
  {platform:'whatsapp', country:'US', name:'WA_US_001', followers:'N/A', price:5, img:'assets/whatsapp-icon.png'},
  {platform:'tiktok', country:'US', name:'TikTok_US_01', followers:'12.3k', price:10, img:'assets/tiktok.png'},
  {platform:'facebook', country:'DE', name:'FB_DE_01', followers:'8.2k', price:8, img:'assets/facebook.png'},
  {platform:'instagram', country:'FR', name:'IG_FR_01', followers:'15k', price:12, img:'assets/instagram.png'}
];

function renderAccounts(list){
  const container = document.getElementById('accountContainer');
  if(!container) return;
  container.innerHTML = '';
  list.forEach(acc=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${acc.img}" class="icon" />
      <h3>${acc.name}</h3>
      <p>Platform: ${acc.platform}</p>
      <p>Country: ${acc.country}</p>
      <p>Followers: ${acc.followers}</p>
      <p>Price: $${acc.price}</p>
      <button class="buttons" onclick="orderAccount('${acc.name}',${acc.price})">Order</button>
    `;
    container.appendChild(div);
  });
}

function orderAccount(name, price){
  if(!loggedUser){ alert('Login first'); window.location.href='login.html'; return; }
  if(loggedUser.balance < price){ alert('Insufficient balance'); return; }
  loggedUser.balance -= price;
  loggedUser.orders.push(name);
  saveUser(loggedUser);
  alert(`Ordered ${name}! Balance now $${loggedUser.balance}`);
  if(document.getElementById('balance')) document.getElementById('balance').textContent = loggedUser.balance;
}

// Initial render
renderAccounts(accounts);
