class Mastermind{
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
        //initialisation du nombre d'éléments bien placés
        this.wellPlaced = 0;
        //initialisation du nombre d'éléments mal placés
        this.misplaced= 0;
    }

    //véritable initialisation du jeu
    init(){
        for (let i = 0; i < this.tabToFind.length; i++) {
            this.tabToFind[i]= Math.floor(Math.random()*this.nbColor+1);
        };
    }

    //maj tabtotry
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

    //avoir les indices
    getClues(){
        console.log("il y a : ",this.wellPlaced," éléments bien placés \n et il y a : ",this.misplaced," éléments mal placés");
    }

    //execution d'un tour de jeu
    play(){
        this.life--;
        if(this.life>=0){
            let bonneplace = 0;
            let present = 0;
            //tableaux copiees pour la partie 2
            let copyTabToFind = this.tabToFind.slice();
            let copyTabToTry = this.tabToTry.slice();
            for (let i = 0; i < copyTabToFind.length; i++){
                if(this.tabToFind[i]===this.tabToTry[i]){
                    bonneplace++;
                    //les élements déjà trouver n'interviennent plus dans la suite
                    //si on doit trouver [1,1,1,1] on rentrant [5,4,1,1] on aura 2 juste et 0 mal placé et pas 2 juste et 2 mal placé.
                    copyTabToFind[i]=0;
                    copyTabToTry[i]=-1;
                }
            }
            for (let i = 0; i < copyTabToFind.length; i++) {
                //on récupère l'indice de l'élément
                let index = copyTabToFind.indexOf(copyTabToTry[i]) ;
                //s'il est trouvé on l'enlève pour la suite
                if(index !== -1){
                    present++;
                    copyTabToFind[index]=0;
                }
            }
            this.wellPlaced = bonneplace;
            this.misplaced = present;
        } else {
            throw new Error(" Vous avez épuisé votre dernière vie. ");    
        }
    }
    
    //état du jeu
    gameStatut(){
        // si on a gagné 
        if(this.wellPlaced===this.tabToFind.length){
            return 1;
        // si on a perdu
        } else if (this.life < 0){
            return -1;
        // dans les autres cas
        } else {
            return 0;
        }
    }

    // msg à afficher à la fin du jeu
    finalMsg(){
        if(this.gameStatut()===1){
            return "BRAVO ! Vous avez Gagné !!";
        }
        if(this.gameStatut()===-1){
            return "DOMMAGE ! Vous avez Perdu !!";
        }
    }
}