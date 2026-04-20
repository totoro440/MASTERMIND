export class Mastermind{
    constructor(nbColor=5,life=9,nbItem=4){
        //tableau à trouver
        this.tabToFind = [];
        //tableau à essayer
        this.tabToTry = [];
        //initialisation des tableaux par des 0 pour fixer leur taille
        for (let i = 0; i < nbItem; i++) {
            this.tabToFind.push(0);
            this.tabToTry.push(0);    
        }
        //initialisation du nombre d'essaie pour trouver la solution
        this.life = life;
        //initialisation du nombre de couleur possible pour un item 
        this.nbColor = nbColor;
    }

    //véritable initialisation du jeu
    init(){
        for (let i = 0; i < this.tabToFind.length; i++) {
            this.tabToFind[i]= Math.floor(Math.random()*this.nbColor+1);
        };
    }

    setTabToTry(tab){
        // si les tailles correspondent
        if(this.tabToTry.length === tab.length){
            // on met à jour le tableau d'essai
            this.tabToTry = tab;
        // sinon on renvoie une erreur
        } else {
            throw new Error(`La taille du tableau entrée : ${tab.length} ne correspond pas à la taille attendu du tableau d'essai : ${this.tabToTry.length}`);        
        }
    }
}

let test = new Mastermind();
test.init();
test.setTabToTry([4,2,5,3]);
console.log(test);