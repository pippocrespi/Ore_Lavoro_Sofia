window.addEventListener("DOMContentLoaded", () => {

  // Seleziona gli elementi del form
  const form = document.getElementById("mealForm");
  const btnInvia = document.getElementById("btnInviaDatiSheet");
  const status = document.getElementById("status");

  // Imposta data corrente nel campo data ingresso
  const dataInput = form.querySelector('input[name="dataIngresso"]');
  if(dataInput) dataInput.value = new Date().toISOString().split('T')[0];

  // Funzione per inviare i dati al foglio Google
  async function inviaDatiAlFoglio() {
    // Raccogli i valori
    const dati = {
      dataIngresso: form.querySelector('input[name="dataIngresso"]').value,
      oraEntrata: form.querySelector('input[name="oraEntrata"]').value,
      oraUscita: form.querySelector('input[name="oraUscita"]').value,
      pranzo: form.querySelector('input[name="pranzo"]').checked,
      cena: form.querySelector('input[name="cena"]').checked
    };

    try {
      // Inserisci qui il tuo URL Apps Script
      const url = "https://script.google.com/macros/s/AKfycbwVhY4KPQBkeAELAo-2gh_Hj70rZa21WzMFgvbJyz2TGmKrBxNG-BbQoqXTW4hi6kVI/exec?data="
                  + encodeURIComponent(JSON.stringify(dati));

      const response = await fetch(url);
      const result = await response.json();

      if(result.status === "ok") {
        status.textContent = "✅ Dati salvati nel foglio " + result.nomeFoglio;
        status.style.color = "green";
      } else {
        status.textContent = "❌ Errore: " + result.message;
        status.style.color = "red";
      }

    } catch(err) {
      console.error("❌ Errore durante l'invio:", err);
      status.textContent = "❌ Errore durante l'invio";
      status.style.color = "red";
    }
  }

  // Collega il bottone all'invio dati
  if(btnInvia) btnInvia.addEventListener("click", inviaDatiAlFoglio);

});
