async function inviaDatiAlFoglio() {
    // Raccogli i dati dai campi
    const dati = {
        dataIngresso: document.getElementById('dataIngresso')?.value || '',
        oraEntrata: document.getElementById('oraEntrata')?.value || '',
        oraUscita: document.getElementById('oraUscita')?.value || '',
        pranzo: document.getElementById('pranzo')?.checked ? true : false,
        cena: document.getElementById('cena')?.checked ? true : false
    };

    try {
        const url = "https://script.google.com/macros/s/AKfycbzQWDDvKsu3xa5AGCNW-Z3P_GhCKc1XD2EEKEGaAAvakFxzLpgiB15DZq6_5wEvHeN3/exec" + encodeURIComponent(JSON.stringify(dati));
        const response = await fetch(url);
        const result = await response.json();
        document.getElementById("status").textContent = "✅ Dati salvati nel foglio " + result.nomeFoglio;
    } catch(err) {
        console.error("❌ Errore durante l'invio:", err);
        document.getElementById("status").textContent = "❌ Errore durante l'invio";
    }
}

// Collega il bottone all'invio
document.getElementById("btnInviaDatiSheet").addEventListener("click", inviaDatiAlFoglio);

// Imposta data di default al giorno corrente
window.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    document.getElementById('dataIngresso').value = today.toISOString().split('T')[0];
});
