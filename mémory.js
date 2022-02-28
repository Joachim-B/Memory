const pairTypes = ['1rouge','1noir','2rouge','2noir','3rouge','3noir','4rouge','4noir','5rouge','5noir','6rouge','6noir','7rouge','7noir','8rouge','8noir','9rouge','9noir','10rouge','10noir','Jrouge','Jnoir','Qrouge','Qnoir','Krouge','Knoir'];
const imageCoeurPique = ['cartes/1hearts.svg','cartes/1spades.svg','cartes/2hearts.svg','cartes/2spades.svg','cartes/3hearts.svg','cartes/3spades.svg','cartes/4hearts.svg','cartes/4spades.svg','cartes/5hearts.svg','cartes/5spades.svg','cartes/6hearts.svg','cartes/6spades.svg','cartes/7hearts.svg','cartes/7spades.svg','cartes/8hearts.svg','cartes/8spades.svg','cartes/9hearts.svg','cartes/9spades.svg','cartes/10hearts.svg','cartes/10spades.svg','cartes/Jackhearts.svg','cartes/Jackspades.svg','cartes/Queenhearts.svg','cartes/Queenspades.svg','cartes/Kinghearts.svg','cartes/Kingspades.svg'];
const imageCarreauTrefle = ['cartes/1diamonds.svg','cartes/1clubs.svg','cartes/2diamonds.svg','cartes/2clubs.svg','cartes/3diamonds.svg','cartes/3clubs.svg','cartes/4diamonds.svg','cartes/4clubs.svg','cartes/5diamonds.svg','cartes/5clubs.svg','cartes/6diamonds.svg','cartes/6clubs.svg','cartes/7diamonds.svg','cartes/7clubs.svg','cartes/8diamonds.svg','cartes/8clubs.svg','cartes/9diamonds.svg','cartes/9clubs.svg','cartes/10diamonds.svg','cartes/10clubs.svg','cartes/Jackdiamonds.svg','cartes/Jackclubs.svg','cartes/Queendiamonds.svg','cartes/Queenclubs.svg','cartes/Kingdiamonds.svg','cartes/Kingclubs.svg'];
//constantes pour les valeurs et les background des cartes

let pairTypesCopy = pairTypes.concat(pairTypes);
let imageAllColors = imageCoeurPique.concat(imageCarreauTrefle);
//tableaux qui répertorient toutes les valeurs et backgrounds de carte possibles.

let images = new Array()
function preload(img,i) {
    images[i] = new Image()
    images[i].src = img
}
for(i=0;i<imageAllColors.length;i++) {
    preload(imageAllColors[i],i)
}
preload('cartes/cardback.svg')
console.log('Chargement des cartes terminé')
//fonction pour preload toutes les images en version web (sinon c'est très moche)


let boardPairs = [];
let boardColors = [];
//tableaux qui vont mélanger toutes les valeurs possibles.

let nbCards = pairTypesCopy.length;
for (let i=1; i <= nbCards; i++) {
    let randomPairColor = Math.floor((pairTypesCopy.length)*Math.random());
    boardPairs.push(pairTypesCopy[randomPairColor]);
    boardColors.push(imageAllColors[randomPairColor]);
    pairTypesCopy.splice(randomPairColor, 1);
    imageAllColors.splice(randomPairColor, 1);
}
console.log(boardPairs);
console.log(boardColors);
//partie pour créer un tableau avec les paires dans un ordre aléatoire.


let choiceNumber = 0; //savoir si on a retourné la première ou la deuxième carte
let resultCard1 = 1; //connaitre la valeur de la carte 1
let resultCard2 = 2; //connaitre la valeur de la carte 2
let rememberID = []; //se rappeler des positions des 2 dernières cartes jouées
let cardsFound = []; //tableau qui stocke les positions de toutes les paires trouvées
let pointsJ1 = 0; //points du joueur 1
let pointsJ2 = 0; //points du joueur 2
let tourJoueur = 1; //connaître à quel qui c'est le tour de jouer (1 = tour du joueur 1, 2 = tour du joueur 2)
let gameOver = 0; //connaître si la partie vient de se finir ou non (0 = non, 1 = oui)ffi

function doClick(id) {

    if (gameOver == 0) {

        let alreadyFound = 0;
        for (i=0;i<cardsFound.length;i++) {

            if (id == cardsFound[i]) {
                alreadyFound = 1;
                break;
            }
        }
        // boucle pour savoir si la carte cliquée a déjà été retournée. Si alreadyFound = 1, ne rien faire.

        if (alreadyFound == 0) {

            if (choiceNumber == 0) { //si la carte retournée est la première carte retournée
                
                let dontResetCard = 0;
                for (j=0;j<cardsFound.length;j++) {
                     if (rememberID[0] == cardsFound[j]) {
                        dontResetCard = 1;
                        break;
                    }
                }
                if (dontResetCard == 0) {
                    if (rememberID.length > 0 ) {
                        document.getElementById('card'+rememberID[0]).style.backgroundImage = 'url(cartes/cardback.svg)'
                        document.getElementById('card'+rememberID[1]).style.backgroundImage = 'url(cartes/cardback.svg)'
                    }
                }
                //bout de code pour retourner les dernières cartes cliquées

                rememberID = [];
        
                document.getElementById('card'+id).style.backgroundImage = 'url('+boardColors[id-1]+')';
                choiceNumber = 1;
                resultCard1 = boardPairs[id-1];
                rememberID.push(id);
                //code qui affiche la carte retournée au tour 1
        
            } else if (id !== rememberID[0]) {
                document.getElementById('card'+id).style.backgroundImage = 'url('+boardColors[id-1]+')';
                choiceNumber = 0;
                resultCard2 = boardPairs[id-1];
                rememberID.push(id);
                //code qui affiche la carte retournée au tour 2


                if (resultCard1 == resultCard2) {
                    let cardsFoundCopy = cardsFound.concat(rememberID);
                    cardsFound = cardsFoundCopy;
                    //sauvegarder les cartes comme étant officiellement retournées

                    if (tourJoueur == 1) {
                        pointsJ1++;
                        document.getElementById('pointsJ1').innerHTML = "Points Joueur 1 : "+pointsJ1;
                        document.getElementById('tourDeQui').innerHTML = "Encore au joueur 1 !"
                    } else {
                        pointsJ2++;
                        document.getElementById('pointsJ2').innerHTML = "Points Joueur 2 : "+pointsJ2;
                        document.getElementById('tourDeQui').innerHTML = "Encore au joueur 2 !"
                    }
                    //ajouter des points au joueur

                    if (cardsFound.length == nbCards) {
                        gameOver = 1;
                        if (pointsJ1 > pointsJ2) {
                            document.getElementById('tourDeQui').innerHTML = "Le joueur 1 a gagné !"
                            document.getElementById('tourDeQui').style.color = 'red';
                        } else if (pointsJ1 < pointsJ2) {
                            document.getElementById('tourDeQui').innerHTML = "Le joueur 2 a gagné !"
                            document.getElementById('tourDeQui').style.color = 'blue';
                        } else {
                            document.getElementById('tourDeQui').innerHTML = "Égalité !"
                            document.getElementById('tourDeQui').style.color = 'black';
                        }
                        document.getElementById('replay').style.display = 'inline';

                    }
                    // savoir si toutes les paires ont été trouvées

                } else {
                    if (tourJoueur == 1) {
                        tourJoueur = 2;
                        document.getElementById('tourDeQui').innerHTML = "Au tour du Joueur 2 !";
                        document.getElementById('tourDeQui').style.color = 'blue';
                    } else {
                        tourJoueur = 1;
                        document.getElementById('tourDeQui').innerHTML = "Au tour du Joueur 1 !";
                        document.getElementById('tourDeQui').style.color = 'red';
                    }
                    //changer le tour de joueur

                }

            }

        }
    } else {

        //reset de la partie
        pairTypesCopy = pairTypes.concat(pairTypes);
        imageAllColors = imageCoeurPique.concat(imageCarreauTrefle);

        boardPairs = [];
        boardColors = [];

        for (let i=1; i <= nbCards; i++) {
            let randomPairColor = Math.floor((pairTypesCopy.length)*Math.random());
            boardPairs.push(pairTypesCopy[randomPairColor]);
            boardColors.push(imageAllColors[randomPairColor]);
            pairTypesCopy.splice(randomPairColor, 1);
            imageAllColors.splice(randomPairColor, 1);
        }
        console.log(boardPairs);
        console.log(imageAllColors);
        //partie pour créer un tableau avec les paires dans un ordre aléatoire.

        choiceNumber = 0;
        resultCard1 = 1;
        resultCard2 = 2;
        rememberID = [];
        cardsFound = [];
        pointsJ1 = 0;
        pointsJ2 = 0;
        tourJoueur = 1;
        gameOver = 0;
        document.getElementById('replay').style.display = 'none';
        document.getElementById('tourDeQui').innerHTML = "Au tour du Joueur 1 !";
        document.getElementById('tourDeQui').style.color = 'red';
        document.getElementById('pointsJ1').innerHTML = "Points Joueur 1 : "+pointsJ1;
        document.getElementById('pointsJ2').innerHTML = "Points Joueur 2 : "+pointsJ2;

        for (i = 1; i<=nbCards;i++) {

            document.getElementById('card'+i).style.backgroundImage = "url(cartes/cardback.svg)";
        }
        //boucle pour reset les couleurs
    }

}