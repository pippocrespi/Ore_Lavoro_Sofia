const form = document.querySelector("form");
form.addEventListener("submit", function(e){
  e.preventDefault();
});

async function inviaDatiAlFoglio() {
  const dati = {
    dataIngresso: document.getElementById('dataIngresso')?.value || '',
    oraEntrata: document.getElementById('oraEntrata')?.value || '',
    oraUscita: document.getElementById('oraUscita')?.value || '',
    pranzo: document.getElementById('pranzo')?.checked || false,
    cena: document.getElementById('cena')?.checked || false
  };

  try {
    const url = "https://script.google.com/macros/s/AKfycbwVhY4KPQBkeAELAo-2gh_Hj70rZa21WzMFgvbJyz2TGmKrBxNG-BbQoqXTW4hi6kVI/exechttps://script.google.com/macros/s/AKfycbwVhY4KPQBkeAELAo-2gh_Hj70rZa21WzMFgvbJyz2TGmKrBxNG-BbQoqXTW4hi6kVI/exec?data=" + encodeURIComponent(JSON.stringify(dati));
    const response = await fetch(url);
    const result = await response.json();

    if(result.status === "ok") {
      document.getElementById("status").textContent = "✅ Dati salvati nel foglio " + result.nomeFoglio;
    } else {
      document.getElementById("status").textContent = "❌ Errore: " + result.message;
    }
  } catch(err) {
    console.error("❌ Errore durante l'invio:", err);
    document.getElementById("status").textContent = "❌ Errore durante l'invio";
  }
}

// Collega il bottone all'invio
document.getElementById("btnInviaDatiSheet").addEventListener("click", inviaDatiAlFoglio);

// Imposta data di default al giorno corrente
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.getElementById('dataIngresso').value = today.toISOString().split('T')[0];
});
