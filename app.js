const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxDdsgjOseC2Txb0iJTZ3-MWe0N8yATWf0xfUSIU9-Xn3ZpE9ZfkPo7MeQ61RuXxiWr/exec"; // URL della Web App di Apps Script

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (mm < 10) mm = "0" + mm;
  if (dd < 10) dd = "0" + dd;
  document.querySelector('input[name="dataIngresso"]').value = `${yyyy}-${mm}-${dd}`;
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

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
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

  fetch(`${WEB_APP_URL}?pdf=true&foglio=${nomeFoglio}`)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = nomeFoglio + "_Sofia.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(err => alert("Errore PDF: " + err.message));
});
