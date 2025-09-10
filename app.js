window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("mealForm");
  const btnInvia = document.getElementById("btnInviaDatiSheet");
  const status = document.getElementById("status");

  // Imposta data odierna
  const dataInput = form.querySelector('input[name="dataIngresso"]');
  if(dataInput) dataInput.value = new Date().toISOString().split('T')[0];

  async function inviaDatiAlFoglio() {
    const dati = {
      dataIngresso: form.querySelector('input[name="dataIngresso"]').value,
      oraEntrata: form.querySelector('input[name="oraEntrata"]').value,
      oraUscita: form.querySelector('input[name="oraUscita"]').value,
      pranzo: form.querySelector('input[name="pranzo"]').checked,
      cena: form.querySelector('input[name="cena"]').checked
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycby4DRfky_78FLMzTddxzyRqIgmt-VoywIbu9NRiJeom0IJqJXPnkKqlLhYssasnwhb8/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dati)
      });

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

  if(btnInvia) btnInvia.addEventListener("click", inviaDatiAlFoglio);

});
