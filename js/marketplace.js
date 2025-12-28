// Sample data for accounts
const accounts = [
  {platform:'whatsapp', country:'US', name:'WA_US_001', followers:'N/A', price:'$5', img:'assets/whatsapp-icon.png'},
  {platform:'whatsapp', country:'UK', name:'WA_UK_002', followers:'N/A', price:'$6', img:'assets/whatsapp-icon.png'},
  {platform:'tiktok', country:'US', name:'TikTok_US_01', followers:'12.3k', price:'$10', img:'assets/tiktok.png'},
  {platform:'facebook', country:'DE', name:'FB_DE_01', followers:'8.2k', price:'$8', img:'assets/facebook.png'},
  {platform:'instagram', country:'FR', name:'IG_FR_01', followers:'15k', price:'$12', img:'assets/instagram.png'},
  {platform:'tiktok', country:'UK', name:'TikTok_UK_01', followers:'9k', price:'$9', img:'assets/tiktok.png'}
];

// Render accounts
const accountList = document.getElementById('accountList');

function renderAccounts(list){
  accountList.innerHTML = '';
  list.forEach(acc=>{
    const card = document.createElement('div');
    card.className = 'account-card';
    card.innerHTML = `
      <img src="${acc.img}" alt="${acc.platform}">
      <h3>${acc.name}</h3>
      <p>Platform: ${acc.platform}</p>
      <p>Country: ${acc.country}</p>
      <p>Followers: ${acc.followers}</p>
      <p>Price: ${acc.price}</p>
      <a class="buttons" href="account.html?name=${acc.name}">View / Order</a>
    `;
    accountList.appendChild(card);
  });
}

renderAccounts(accounts);

// Filters
const platformFilter = document.getElementById('platformFilter');
const countryFilter = document.getElementById('countryFilter');
const searchBox = document.getElementById('searchBox');

function filterAccounts(){
  const platform = platformFilter.value;
  const country = countryFilter.value;
  const search = searchBox.value.toLowerCase();
  const filtered = accounts.filter(acc=>{
    return (platform==='all' || acc.platform===platform) &&
           (country==='all' || acc.country===country) &&
           (acc.name.toLowerCase().includes(search));
  });
  renderAccounts(filtered);
}

platformFilter.addEventListener('change', filterAccounts);
countryFilter.addEventListener('change', filterAccounts);
searchBox.addEventListener('input', filterAccounts);
