"use strict";
let myMastermind = new Mastermind(8);
myMastermind.init();

// création du dom
let createDom = (mind) => {
    let main = document.querySelector("main"); 
    for (let i = 0; i < mind.getLife(); i++) {
        let section = document.createElement("section");
        section.dataset.life = 1;
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
        console.log(event.target.dataset.color);
}
//________________________________________________

createDom(myMastermind);

//?interactivité
for (const element of document.querySelectorAll("div[data-color]")) {
    element.addEventListener("click", domNextColor )   
}