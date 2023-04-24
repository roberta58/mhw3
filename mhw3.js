
const client_id = '2cdbf52de6bb41cdaa8955a0ffc6668d';
const client_secret ='52bc521a925b4a59ad94a94a4965404c';

let token;

const ricerca = document.querySelector('.spotify');
ricerca.addEventListener('submit', Cerca);

function onResponse(response) {
    return response.json();
  }
  
function onJson(json) {
  const library = document.querySelector('#Box');
  library.innerHTML = '';
  
  const risultati = json.albums.items;
  let num_risultati = risultati.length;
 
  if(num_risultati > 1) num_risultati = 1;
  
  for(let i=0; i<num_risultati; i++) {
    const risultato = risultati[i]
    const title = risultato.name;
    const image = risultato.images[0].url;
    
    const canzoni = document.createElement('div');
    canzoni.classList.add('box');
    const img = document.createElement('img');
    img.src = image;
    const brano= document.createElement('span');
    brano.textContent = title;
   
    canzoni.appendChild(img);
    canzoni.appendChild(brano);
    
    library.appendChild(canzoni);
  }
} 

function Cerca(event){
  event.preventDefault();
  const tracce = document.querySelector('#track');
  const tracce_value = encodeURIComponent(tracce.value);

  fetch("https://api.spotify.com/v1/search?type=album&q=" + tracce_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}
  
function onTokenJson(json){
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}

fetch("https://accounts.spotify.com/api/token",
  {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
  {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}).then(onTokenResponse).then(onTokenJson);