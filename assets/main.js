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
    test.getClues();
}
console.log(test.finalMsg());