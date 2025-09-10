window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("mealForm");
  const btnInvia = document.getElementById("btnInviaDatiSheet");
  const status = document.getElementById("status");

  // Imposta data odierna automaticamente
  const dataInput = form.querySelector('input[name="dataIngresso"]');
  if (dataInput) dataInput.value = new Date().toISOString().split('T')[0];

  async function inviaDatiAlFoglio() {
    const dati = new FormData();
    dati.append("dataIngresso", form.querySelector('input[name="dataIngresso"]').value);
    dati.append("oraEntrata", form.querySelector('input[name="oraEntrata"]').value);
    dati.append("oraUscita", form.querySelector('input[name="oraUscita"]').value);
    dati.append("pranzo", form.querySelector('input[name="pranzo"]').checked);
    dati.append("cena", form.querySelector('input[name="cena"]').checked);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyGk1dYRdk4NdxGQz619MFg5N_pHRJkUP1yK0hgSXu-DLIbQUbji86Jpj6-5R19F3Zq/exec", {
        method: "POST",
        body: dati
      });

      const result = await response.json();

      if (result.status === "ok") {
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

  if (btnInvia) btnInvia.addEventListener("click", inviaDatiAlFoglio);

});
