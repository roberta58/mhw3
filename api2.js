const apikey_news ='WW-xoxtqkKNyI_BUIybM62HJmLnd2K46L-GLeojFTkS7cpiz'; 

const endpoint_news = 'https://api.currentsapi.services/v1/search?' 
const req = endpoint_news + 'category=culture&'+ 'keywords=museo&' + 'language=it&' +'apiKey=' + apikey_news;

fetch(req).then(onResponse).then(onJsonNotizie)

function onResponse(resp){
    console.log(resp);
    return resp.json();
}

function onJsonNotizie(json) {
    console.log(json);
    const risultati = json.news;
    let num_risultati = risultati.length;
    if(num_risultati > 3) num_risultati = 3;

    for(let i = 0; i < num_risultati; i++){
        const data_articolo = risultati[i];
        const titoloArt = data_articolo.title;     
        const art_des = data_articolo.description;

        const articolo = document.createElement("div");
        articolo.classList.add("articolo");

        const title = document.createElement("h3");
        title.textContent = titoloArt;
        const content = document.createElement("p");
        content.textContent = art_des;
        
        articolo.appendChild(title);
        articolo.appendChild(content);
        
        document.querySelector("#news .articoli").appendChild(articolo);
    }
}
