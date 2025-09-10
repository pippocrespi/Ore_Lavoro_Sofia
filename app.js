document.getElementById("mealForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const form = e.target;
  const dati = {
    dataIngresso: form.dataIngresso.value,
    oraEntrata: form.oraEntrata.value,
    oraUscita: form.oraUscita.value,
    pranzo: form.pranzo.checked,
    cena: form.cena.checked
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycby3ceh7EpDY7x3xETuqc6kqTiPjjmdhwMILXXXQB7YPo5yUXaT4fxHISGAfv3YXV1w-/exec", {
      method: "POST",
      body: JSON.stringify(dati),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    document.getElementById("status").textContent =
      result.status === "ok" ? `✅ Dati salvati in ${result.nomeFoglio}` : `❌ Errore: ${result.message}`;
  } catch(err) {
    document.getElementById("status").textContent = "❌ Errore durante l'invio: " + err;
  }
});
