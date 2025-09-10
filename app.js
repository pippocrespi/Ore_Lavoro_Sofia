document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("btnInviaDati");
  const form = document.getElementById("mealForm");
  const status = document.getElementById("status");

  btn.addEventListener("click", async function() {
    const dati = {
      dataIngresso: form.dataIngresso.value,
      oraEntrata: form.oraEntrata.value,
      oraUscita: form.oraUscita.value,
      pranzo: form.pranzo.checked,
      cena: form.cena.checked
    };

    status.textContent = "⏳ Invio dati...";

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycby3ceh7EpDY7x3xETuqc6kqTiPjjmdhwMILXXXQB7YPo5yUXaT4fxHISGAfv3YXV1w-/exec", {
        method: "POST",
        body: JSON.stringify(dati),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();

      if(result.status === "ok") {
        status.textContent = `✅ Dati salvati in ${result.nomeFoglio}`;
        form.reset();
      } else {
        status.textContent = `❌ Errore: ${result.message}`;
      }

    } catch(err) {
      status.textContent = "❌ Errore durante l'invio: " + err;
      console.error(err);
    }
  });
});
