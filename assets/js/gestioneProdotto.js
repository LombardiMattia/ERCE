// GESTIONE SCRIPT PRODOTTO
var conteggio;
//localStorage.clear();

//Gestione conteggio
conteggio =
  localStorage.getItem("acquisti") == null
    ? 0
    : localStorage.getItem("acquisti");

//gestione prodotti. caricamento e fetch file json
start();
const prodottoId = localStorage.getItem("id"); // prodotto corrente

window.addEventListener("DOMContentLoaded", () => {
  console.log("Current product selected: " + prodottoId);

  fetch("../assets/js/prodotti.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella lettura del file. Check fetch.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("File JSON letto correttamente. Operazione in corso...");

      const prodotto = data.find((p) => p.id == prodottoId);

      if (prodotto) {
        console.log("Prodotto trovato:", prodotto);
        const box = document.getElementById("contenitore-prodotto"); //box dove andrò ad inserire il contenuto
        box.innerHTML = `
            <img src="${prodotto.immagine}" alt="${prodotto.nome}" id="immagine" />
        `;
        //box descrizione
        let descrizione = document.createElement("div");
        descrizione.classList.add("descrizione");
        descrizione.innerHTML = `
            <span id="nome">${prodotto.nome}</span>
            <span id="marca">${prodotto.marca}</span>
            <span id="stairs">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            5,0
            </span>
            <hr>
            <span id="offerta"><i class="fa-solid fa-fire"></i>&nbsp;Offerta a tempo</span>
            <span id="costo">${prodotto.costo} &euro;</span>
            <span id="info">${prodotto.descrizione}</span>
            <span id="altre">
            <ul>
                <li><b>Consegna</b>: Gratuita</li>
                <li><b>Spedizione</b>: 3-4 gg. lavorativi</li>
                <li><b>Rivenditore</b>: Erce</li>
                <li><b>Reso</b>: entro 2 settimane dall'acquisto</li>
                <li><b>Valutazioni</b>: ottime</li>
            </ul>
            </span>
            <button type="button" id="btn" onclick="carrello(${prodotto.id})">Aggiungi al carrello</button>
        `;
        box.appendChild(descrizione);
      } else {
        console.warn("Nessun prodotto trovato con ID:", prodottoId);
      }
    })
    .catch((error) => {
      console.error("Errore fetch:", error);
    });
});

//Gestione scroll
const header = document.querySelector("header");

// Imposta colore iniziale all'avvio
header.style.backgroundColor = "rgba(245, 245, 245, 0.9)";
header.style.transition =
  "background-color 0.9s ease, backdrop-filter 0.9s ease";

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 170) {
    // Dopo scroll > 50px: diventa più grigia e trasparente
    header.style.backgroundColor = "rgba(211, 211, 211, 0.691)"; // grigio scuro con trasparenza
    header.style.backdropFilter = "blur(8px)";
  } else {
    // Torna chiara e opaca
    header.style.backgroundColor = "rgba(245, 245, 245, 0.9)";
    header.style.backdropFilter = "blur(10px)";
  }
});

//start
function start() {
  if (conteggio > 0) {
    document.getElementById("advise").style.display = "block";
    document.getElementById("advise").innerHTML = conteggio;
  }
}

//Gestione bottone carrello
document.getElementById("carrello").addEventListener("click", () => {
  window.open("carrello.html", "_self");
});

//Gestione salvataggio elementi in carrello
function carrello(id) {
  conteggio++;
  console.log(conteggio);
  if (conteggio > 0) {
    document.getElementById("advise").style.display = "block";
    document.getElementById("advise").innerHTML = conteggio;
    //salvo il conteggio in localstorage
    localStorage.setItem("acquisti", conteggio);
    salva(id); //richiamo funzione salva
  }
}
//Funzione salva nel carrello
function salva(id) {
  console.log("ciao bellissimo");
  fetch("../assets/js/prodotti.json")
    .then((res) => res.json())
    .then((prodotti) => {
      const prodotto = prodotti.find((p) => p.id === id);

      if (prodotto) {
        // Recupera il carrello
        let carrello = JSON.parse(localStorage.getItem("prodotti")) || [];

        // Aggiungi il nuovo prodotto
        carrello.push(prodotto);

        localStorage.setItem("prodotti", JSON.stringify(carrello));

        console.log("PRODOTTO AGGIUNTO AL CARRELLO: " + prodotto);
      }
    });
}
