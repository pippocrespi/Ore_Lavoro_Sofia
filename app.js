const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwuvwANtRTrnc8eHZgiREtJeKIjtK1pPP57RmSpA_8E4YzYK3MjFai4ixmmfoUjed73/exec";

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.querySelector('input[name="dataIngresso"]').value = today.toISOString().split('T')[0];
});

// Invio dati
document.getElementById("mealForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    dataIngresso: form.dataIngresso.value,
    oraEntrata: form.oraEntrata.value,
    oraUscita: form.oraUscita.value,
    pranzo: form.pranzo.checked,
    cena: form.cena.checked
  };

  const url = WEB_APP_URL + "?data=" + encodeURIComponent(JSON.stringify(data));

  fetch(url)
    .then(res => res.json())
    .then(res => {
      document.getElementById("status").textContent = "✅ Dati salvati nel foglio " + res.nomeFoglio;
      form.reset();
    })
    .catch(err => {
      document.getElementById("status").textContent = "❌ Errore: " + err.message;
    });
});

// Stampa PDF
document.getElementById("pdfBtn").addEventListener("click", () => {
  const mese = document.getElementById("mese").value;
  const anno = document.getElementById("anno").value;
  const nomeFoglio = mese + "_" + anno;
  const url = WEB_APP_URL + "?pdf=true&foglio=" + encodeURIComponent(nomeFoglio);

  fetch(url)
    .then(res => res.json())
    .then(result => {
      const a = document.createElement("a");
      a.href = "data:application/pdf;base64," + result.base64;
      a.download = result.nome;
      a.click();
    })
    .catch(err => alert("Errore PDF: " + err.message));
});
