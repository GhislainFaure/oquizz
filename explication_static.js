
class Vampire {
    static nbVampires = 0;

    // si c'est vrai, TOUS nos vampires vont se transformer en chauve souris
    static modeChauveSouris = false;

    prenom;
    nom;
    age;

    constructor(prenom, nom, age) {
        Vampire.nbVampires = Vampire.nbVampires + 1;
        this.prenom = prenom;
        this.nom = nom;
        this.age = age;
    }

    cri() {
        if (Vampire.modeChauveSouris) {
            console.log('Kew kew');
        } else {
            console.log('Rawwwrrrrrr je te mors');
        }
    }

    static transformation() {
        // dans une méthode statique, je peux manipuler des propriétés statiques...
        Vampire.modeChauveSouris = true;
    }
}

const lestat = new Vampire('Lestat', 'De Liancourt', 300);

const blade = new Vampire('Frank', 'Blade', 200);

// tous les vampires deviennent des chauves souris
Vampire.transformation();

lestat.cri();
blade.cri();
console.log('nom de blade : ', blade.nom);





class CharlotteAuxFraises {
    static nbCharlottesFaites = 0;
    static mouleCasse = false;

    vegetarien;
    nbFraises;

    constructor(vegetarien, nbFraises) {
        if (CharlotteAuxFraises.mouleCasse) {
            throw Error('Eh je peux pas faire de gateau avec un moule cassé ein');
        }
        CharlotteAuxFraises.nbCharlottesFaites++;
        this.vegetarien = vegetarien;
        this.nbFraises = nbFraises;
    }

    static casserLeMoule() {
        CharlotteAuxFraises.mouleCasse = true;
    }

    static trouverLesCharlottesVegetariennes() {

    }
}

const charlottePourYoan = new CharlotteAuxFraises(false, 2);

CharlotteAuxFraises.casserLeMoule();

const charlottePourMark = new CharlotteAuxFraises(true, 10);

const charlottesVege = CharlotteAuxFraises.trouverLesCharlottesVegetariennes();
