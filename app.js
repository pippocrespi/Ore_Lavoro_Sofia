const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcdBrQpeYWla0_wIHJ_oxLeyA2_s9XdN0MYk6bdLwoocgKmn-h7rtmQ5rqazInhBfC/exec"; 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mealForm");
  const status = document.getElementById("status");
  const btnInvia = document.getElementById("btnInvia");

  btnInvia.addEventListener("click", async () => {
    // Prende i dati dal form
    const data = {
      dataIngresso: form.dataIngresso.value,
      oraEntrata: form.oraEntrata.value,
      oraUscita: form.oraUscita.value,
      pranzo: form.pranzo.checked,
      cena: form.cena.checked
    };

    try {
      // Invia i dati allo script Google
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();

      if (result.success) {
        status.textContent = "✅ " + result.message;
        status.style.color = "green";
        form.reset();

        // Reimposta la data a oggi
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (mm < 10) mm = "0" + mm;
        if (dd < 10) dd = "0" + dd;
        form.dataIngresso.value = `${yyyy}-${mm}-${dd}`;
      } else {
        status.textContent = "❌ Errore: " + result.error;
        status.style.color = "red";
      }
    } catch (err) {
      status.textContent = "❌ Connessione fallita: " + err.message;
      status.style.color = "red";
    }
  });
});
