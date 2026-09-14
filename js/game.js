const righe = 10;
const colonne = 10;

const grigliaGiocatore = [];
const grigliaComputer = [];

for (let i = 0; i < righe; i++) {

    grigliaGiocatore[i] = [];
    grigliaComputer[i] = [];

    for (let j = 0; j < colonne; j++) {

        grigliaGiocatore[i][j] = 0;
        grigliaComputer[i][j] = 0;

    }
}


const game = document.getElementById("game");

const titoloGiocatore = document.createElement("h2");
titoloGiocatore.textContent = "La tua griglia";
game.appendChild(titoloGiocatore);

const griglia1 = document.createElement("div");
griglia1.classList.add("griglia");
game.appendChild(griglia1);

const titoloComputer = document.createElement("h2");
titoloComputer.textContent = "Griglia del computer";
game.appendChild(titoloComputer);

const griglia2 = document.createElement("div");
griglia2.classList.add("griglia");
game.appendChild(griglia2);


const navi = [4, 3, 3, 2];

function posizionaNavi(griglia) {

    for (let nave of navi) {

        let posizionata = false;

        while (!posizionata) {

            let riga = Math.floor(Math.random() * righe);
            let colonna = Math.floor(Math.random() * colonne);
            let orizzontale = Math.random() < 0.5;

            let celleLibere = true;

            for (let i = 0; i < nave; i++) {

                let nuovaRiga = riga;
                let nuovaColonna = colonna;

                if (orizzontale) {
                    nuovaColonna = colonna + i;
                } else {
                    nuovaRiga = riga + i;
                }

                if (nuovaRiga >= righe || nuovaColonna >= colonne ||
                    griglia[nuovaRiga][nuovaColonna] !== 0) {

                    celleLibere = false;
                }
            }

            if (celleLibere) {

                for (let i = 0; i < nave; i++) {

                    let nuovaRiga = riga;
                    let nuovaColonna = colonna;

                    if (orizzontale) {
                        nuovaColonna = colonna + i;
                    } else {
                        nuovaRiga = riga + i;
                    }

                    griglia[nuovaRiga][nuovaColonna] = 1;
                }

                posizionata = true;
            }
        }
    }
}


posizionaNavi(grigliaGiocatore);
posizionaNavi(grigliaComputer);

function controllaVittoria() {

    let naviGiocatore = 0;
    let naviComputer = 0;

    for (let i = 0; i < righe; i++) {
        for (let j = 0; j < colonne; j++) {

            if (grigliaGiocatore[i][j] === 1) {
                naviGiocatore++;
            }

            if (grigliaComputer[i][j] === 1) {
                naviComputer++;
            }
        }
    }

    if (naviComputer === 0) {
        alert("Hai vinto!");
        return true;
    }

    if (naviGiocatore === 0) {
        alert("Ha vinto il computer!");
        return true;
    }

    return false;
}
for (let i = 0; i < righe; i++) {

    for (let j = 0; j < colonne; j++) {

        const casella1 = document.createElement("button");

        if (grigliaGiocatore[i][j] === 1) {
            casella1.textContent = "🚢";
        }

        griglia1.appendChild(casella1);


        const casella2 = document.createElement("button");

        casella2.addEventListener("click", function () {

            if (grigliaComputer[i][j] === 1) {

                casella2.textContent = "💥";
                grigliaComputer[i][j] = 2;

            } else {

                casella2.textContent = "•";
                grigliaComputer[i][j] = 3;

            }

            casella2.disabled = true;

              if (!controllaVittoria()) {
                     attaccoComputer();
                  }

        });

        griglia2.appendChild(casella2);
    }
}


function attaccoComputer() {

    setTimeout(function() {

        let colpito = false;

        while (!colpito) {

            let riga = Math.floor(Math.random() * righe);
            let colonna = Math.floor(Math.random() * colonne);

            if (grigliaGiocatore[riga][colonna] === 0 ||
                grigliaGiocatore[riga][colonna] === 1) {

                if (grigliaGiocatore[riga][colonna] === 1) {

                    grigliaGiocatore[riga][colonna] = 2;
                    griglia1.children[riga * colonne + colonna].textContent = "💥";

                } else {

                    grigliaGiocatore[riga][colonna] = 3;
                    griglia1.children[riga * colonne + colonna].textContent = "•";

                }

                colpito = true;
                if (controllaVittoria()) {
                     return;
                          }
            }
        }

    }, 500);
}


const nuovaPartita = document.getElementById("nuovaPartita");

nuovaPartita.addEventListener("click", function () {
    location.reload();
});
