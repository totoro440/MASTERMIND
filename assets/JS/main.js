"use strict";
let myMastermind = new Mastermind(); // création le mastermind
let currentSection = 1; // le numéro de la section en cours
myMastermind.init(); // initialisation du mastermin

// création du dom
let createDom = (mind) => {
    let main = document.querySelector("main"); 
    for (let i = 0; i < mind.getLife(); i++) {
        let section = document.createElement("section");
        section.dataset.life = i+1;
        let wp = document.createElement("div");
        wp.classList=['wellplaced'];
        section.appendChild(wp);
        for (let j = 0; j < mind.getSize(); j++) {
            let data = document.createElement('div');
            data.dataset.color = "0";
            section.appendChild(data);
        }
        let mp = document.createElement("div");
        mp.classList=['misplaced'];
        section.appendChild(mp);
        main.appendChild(section);
        section.classList=['hidden'];
    }
    document.querySelector("section").classList=[];
}

// récupérer le tableau à tester depuis le dom actif
let getTabToTry = (mind,actif) => {
    let tab = [];
    let domSection = document.querySelector(`section[data-life='${actif}']`);
    
    for (const element of domSection.querySelectorAll(`div[data-color]`)) {
        tab.push(Number(element.dataset.color));
    }
    return tab;
}

//afficher les indices dans le dom 
function printDomClues(mind,actif){
    let sectionActif = document.querySelector(`section[data-life='${actif}']`);
    console.log(sectionActif);
    let [w,m] = mind.getClues();
    console.log(w,m);
    for (let j = 0; j < w; j++) {
        sectionActif.querySelector('.wellplaced').appendChild(document.createElement('div'));
    }
    for (let j = 0; j < m; j++) {
        sectionActif.querySelector('.misplaced').appendChild(document.createElement('div'));
    }
}

// fonction pour changer la couleur de l'affichage
let nextColor = (mind, color) => {
    if(color >= mind.getColors()){
        return 1;
    } else {
        return ++color;
    }
}

let domNextColor = (event) => {
        let target = event.target;
        let color = target.dataset.color
        target.dataset.color = nextColor(myMastermind,color);
}
//________________________________________________

createDom(myMastermind);

//?interactivité
// clique des couleurs
for (const element of document.querySelectorAll("div[data-color]")) {
    element.addEventListener("click", domNextColor )   
}

//vérifications des couleurs
//programme principal
document.querySelector('button').addEventListener("click", ()=>{
    if(myMastermind.gameStatut()!==0){
        console.log(myMastermind.finalMsg());
    } else {
        // on rentre le tableau à tester
        myMastermind.setTabToTry(getTabToTry(myMastermind,currentSection));
        // on effectue un tour de jeu
        myMastermind.play();
        // on affiche les indices dans le dom
        printDomClues(myMastermind,currentSection);
        // on désactif la section précédente
        for (const element of document.querySelector(`section[data-life='${currentSection}']`).querySelectorAll(`div[data-color]`)) {
            element.removeEventListener("click", domNextColor);   
        }
        // on déplace notre cursor de section
        currentSection++;
        // on affiche la section suivante
        document.querySelector(`section[data-life='${currentSection}']`).classList=[];
    }
})
