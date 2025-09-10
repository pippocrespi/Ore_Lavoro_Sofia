window.addEventListener("DOMContentLoaded", () => {

  // Imposta data corrente
  const today = new Date();
  const dataInput = document.getElementById('dataIngresso');
  if(dataInput) dataInput.value = today.toISOString().split('T')[0];

  // Funzione di invio dati
  async function btnInviaDatiSheet() {
    const dati = {
      dataIngresso: document.getElementById('dataIngresso')?.value || '',
      oraEntrata: document.getElementById('oraEntrata')?.value || '',
      oraUscita: document.getElementById('oraUscita')?.value || '',
      pranzo: document.getElementById('pranzo')?.checked || false,
      cena: document.getElementById('cena')?.checked || false
    };

    try {
      const url = "https://script.google.com/macros/s/AKfycbwVhY4KPQBkeAELAo-2gh_Hj70rZa21WzMFgvbJyz2TGmKrBxNG-BbQoqXTW4hi6kVI/exec?data=" 
                  + encodeURIComponent(JSON.stringify(dati));
      const response = await fetch(url);
      const result = await response.json();
      document.getElementById("status").textContent = result.status === "ok"
        ? "✅ Dati salvati nel foglio " + result.nomeFoglio
        : "❌ Errore: " + result.message;
    } catch(err) {
      console.error("❌ Errore durante l'invio:", err);
      document.getElementById("status").textContent = "❌ Errore durante l'invio";
    }
  }

  // Collega il bottone all'invio
  const btn = document.getElementById("btnInviaDatiSheet");
  if(btn) btn.addEventListener("click", inviaDatiAlFoglio);

});
