
// quand on écrit ca
console.log(await instance.delete());

// en vrai javascript fait ca ein
instance.delete().then(resultat => {
    console.log(resultat);
});


const bidule = await Bidule.findById(1);
const machin = await Machin.findById(1);
const chose = await Chose.findById(1);
console.log(chose);



let bidule;
let machin;
let chose;

Bidule.findById(1).then((resultat) => {
    bidule = resultat;

    Machin.findById(1).then((resultat) => {
        machin = resultat;

        hose.findById(1).then((resultat) => {
            chose = resultat;
    
            console.log('hihi jai tout récup');
        });
    });
});