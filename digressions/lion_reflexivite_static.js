class Felin {
    static cri = 'Rrrrrr';

    crier() {
        // Qu'esdt-ce j'ai instancié ??
        // c'est un félin ?
        // ou c'est un lion ???

        // comment savoir ????
        // => avec this.constructor, on obtiendra une référence vers notre CLASSE
        const ceQueJeSuis = this.constructor;

        // a ce stade, dans ceQueJeSuis, j'aurai soit Lion soit Felin (les classes, pas les instances)
        // je peux donc faire ceQueJeSuis.cri
        // tout comme je peux faire Felin.cri ou Lion.cri
        console.log(ceQueJeSuis.cri);
    }
};

class Lion extends Felin {
    static cri = "RooaaarrRRrrRrrRrrrrrr !!!!!!!!!!!!!!!!!!!!!!!";
}

const felin = new Felin();

felin.crier(); // je vais voir "Rrrrr"

const simba = new Lion();

simba.crier(); // je vais voir "RooaaarrRRrrRrrRrrrrrr !!!!!!!!!!!!!!!!!!!!!!!"


