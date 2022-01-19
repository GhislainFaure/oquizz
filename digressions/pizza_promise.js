
// une pizza prend au minimum 5 secondes
const min = 5;

// au maximum 10 secondes
const max = 10;

// stock de tomate

let tomatoStock = 3;

function obtenirTempsDeCuissonAleatoire(min, max) {
    return 1000 * Math.floor(Math.random() * (max - min + 1) + min);
}

function createPizza(type) {
    // je renvoie une "promesse de faire une pizza"
    // une promesse prend un callback qui recoit 2 fonctions
    // resolve pour "honorer" la promesse
    // et reject pour "rompre" la promesse
    return new Promise((resolve, reject) => {
        // le temps de cuisson sera
        const tempsDeCuisson = obtenirTempsDeCuissonAleatoire(5, 10);

        // pour simuler le temps de cuisson, je fais un setTimeout
        // la fonction donnée a setTImeout
        // sera éxécutée dans 1000 ms
        setTimeout(() => {
            // est-ce que on a assez de tomates pour faire la pizza ?
            if (tomatoStock >= 2) {
                // je crée une pizza
                const newPizza = {
                    base: 'tomate',
                    type: type
                };

                // créer une pizza consomme 2 tomates
                tomatoStock = tomatoStock - 2;

                // je résous ma promesse
                // c'est a dire je l'honore
                // je vais appeler resolve avec les parametres que je veux :
                // dans mon cas, la pizza
                resolve(newPizza);
            }
            else {
                // si je suis ici, je n'ai pas assez de tomate
                // pour faire la pizza...
                // je vais donc rejeter ma promesse...
                reject('Plus de tomate déso');
            }
        }, tempsDeCuisson);
    });
}

// createPizza('anchois').then(
//     (pizza) => { console.log('chic !!!! ma pizza !!! omnomnomnom', pizza)},
//     (error) => { console.log('snif snif je nai pas eu ma pizza car ', error); }
// );

// createPizza('vegetarien').then(
//     (pizza) => { console.log('chic !!!! ma pizza !!! omnomnomnom', pizza)},
//     (error) => { console.log('snif snif je nai pas eu ma pizza car ', error); }
// );

// createPizza('quartre fromage').then(
//     (pizza) => { console.log('chic !!!! ma pizza !!! omnomnomnom', pizza)},
//     (error) => { console.log('snif snif je nai pas eu ma pizza car ', error); }
// );

// Promise.all([
//     createPizza('anchois'),
//     createPizza('vegetarienne'),
//     createPizza('4 fromages'),
//     createPizza('reine'),
//     createPizza('margarita'),
//     createPizza('calzone'),
//     createPizza('4 saisons'),
//     createPizza('poulet'),
//     createPizza('armenienne'),
//     createPizza('ananas'),
// ]).then(
//     (pizzas) => {
//         console.log('Vos pizzas sont prêtes messieurs dames !');

//         for (pizza of pizzas) {
//             console.log('Voici votre pizza de type', pizza.type);
//         }
// })
// .catch((error) => console.log(error));

async function commanderDesPizza() {
    try {
        const anchois = await createPizza('anchois');
        const vegetarienne = await createPizza('vegetarienne');
        const quatreFromages = await createPizza('4 fromages');
    
        console.log('votre pizza anchois : ', anchois);
        console.log('votre pizza vegetarienne : ', vegetarienne);
        console.log('votre pizza quatreFromages : ', quatreFromages);
    } catch (error) {
        console.log('zut ! ca a pas marché a cause de : ', error)
    }

}

commanderDesPizza();