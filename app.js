const btnInvia = document.getElementById("btnInvia");

btnInvia.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("dataIngresso", document.querySelector("[name='dataIngresso']").value);
  formData.append("oraEntrata", document.querySelector("[name='oraEntrata']").value);
  formData.append("oraUscita", document.querySelector("[name='oraUscita']").value);
  formData.append("pranzo", document.querySelector("#btnPranzo").checked);
  formData.append("cena", document.querySelector("#btnCena").checked);

  fetch("https://script.google.com/macros/s/AKfycby23bFsyTDsPyBPAurcNsuoYHDjb7NjyVAonkzAk-OtQQW9bA7wqTiYqBCbSxGl7QYV/exec", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        document.getElementById("status").textContent = "✅ Dati salvati nel foglio " + res.sheet;
      } else {
        document.getElementById("status").textContent = "❌ Errore: " + res.error;
      }
    })
    .catch(err => {
      document.getElementById("status").textContent = "❌ Errore di rete: " + err.message;
    });
});
