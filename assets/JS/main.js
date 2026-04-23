"use strict";
let myMastermind = new Mastermind(8);
let currentSection = 1;
myMastermind.init();

// création du dom
let createDom = (mind) => {
    let main = document.querySelector("main"); 
    for (let i = 0; i < mind.getLife(); i++) {
        let section = document.createElement("section");
        section.dataset.life = i+1;
        let wp = document.createElement("div");
        wp.classList=['wellplaced'];
        for (let j = 0; j < mind.getSize(); j++) {
            wp.appendChild(document.createElement('div'));
        }
        section.appendChild(wp);
        for (let j = 0; j < mind.getSize(); j++) {
            let data = document.createElement('div');
            data.dataset.color = "0";
            section.appendChild(data);
        }
        let mp = document.createElement("div");
        mp.classList=['misplaced'];
        for (let j = 0; j < mind.getSize(); j++) {
            mp.appendChild(document.createElement('div'));
        }
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
for (const element of document.querySelectorAll("div[data-color]")) {
    element.addEventListener("click", domNextColor )   
}

document.querySelector('button').addEventListener("click", ()=>{
    myMastermind.setTabToTry(getTabToTry(myMastermind,currentSection));
    console.log(getTabToTry(myMastermind,currentSection));
    myMastermind.play();
    console.log(myMastermind.getClues());
    currentSection++;
    document.querySelector(`section[data-life='${currentSection}']`).classList=[];
})
