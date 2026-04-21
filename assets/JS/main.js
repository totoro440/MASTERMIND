let test = new Mastermind();
test.init();
let tabEntries;

while(test.gameStatut()===0){
    tabEntries = prompt("entrer la chaine à tester").split(" ");
    for (let i = 0; i < tabEntries.length; i++) {
        tabEntries[i] = Number(tabEntries[i]);        
    }
    test.setTabToTry(tabEntries);
    test.play();
    let [a,b] = test.getClues();
    console.log(
        `il y a : ${a} éléments bien placés
         et il y a : ${b} éléments mal placés`
    );
}
console.log(test.finalMsg());

//interactivité
//document.querySelectorAll("")