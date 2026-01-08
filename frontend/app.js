document.addEventListener("DOMContentLoaded", function () {

  const loadBtn = document.getElementById("loadClients");
  const container = document.getElementById("clientList");

  // =========================
  // FUNZIONE CARICA CLIENTI
  // =========================
  function loadClients() {
    console.log("Click Bottone Carica clienti");

    fetch("/mini-crm/backend/api.php")
      .then(res => res.json())
      .then(data => {
        console.log("Dati ricevuti:", data);

        container.innerHTML = ""; // svuota container

        data.forEach(client => {
          console.log("Cliente:", client.nome, client.email);

          // CREA CARD
          const card = document.createElement("div");
          card.className = "client-card";

          card.innerHTML = `
            <h3><i class="fa fa-user"></i> ${client.nome}</h3>
            <p><i class="fa fa-envelope"></i> ${client.email}</p>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => console.error("Errore fetch:", err));
  }

  // Listener bottone "Carica clienti"
  loadBtn.addEventListener("click", loadClients);

  // =========================
  // FUNZIONE AGGIUNGI CLIENTE
  // =========================
  const form = document.getElementById("addClientForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita reload pagina

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    console.log("Submit Form:", nome, email);

    fetch("/mini-crm/backend/add_client.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}`
    })
      .then(res => res.json())
      .then(data => {
        console.log("Add Client Response:", data);
        if (data.success) {
          // Pulisce il form
          document.getElementById("nome").value = "";
          document.getElementById("email").value = "";

          // Aggiorna lista clienti
          loadClients();
        } else {
          alert("Errore: " + data.message);
        }
      })
      .catch(err => console.error("Errore fetch:", err));
  });

  // =========================
  // CARICAMENTO INIZIALE CLIENTI
  // =========================
  loadClients(); // carica la lista appena si apre la pagina
});
