document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerPopup = document.getElementById("registerPopup");
    const loginPopup = document.getElementById("loginPopup");
    const closeButtons = document.querySelectorAll(".close-popup");
  
    // Mostrar ventana de registro
    registerBtn.addEventListener("click", () => {
      registerPopup.style.display = "flex";
    });
  
    // Mostrar ventana de inicio de sesión
    loginBtn.addEventListener("click", () => {
      loginPopup.style.display = "flex";
    });
  
    // Cerrar ventanas emergentes
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const popupId = event.target.getAttribute("data-close");
        document.getElementById(popupId).style.display = "none";
      });
    });
  
    // Cerrar ventana emergente al hacer clic fuera de ella
    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup-overlay")) {
        event.target.style.display = "none";
      }
    });

    const loginForm = document.querySelector("#loginPopup form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch('usuarios.json');
            const users = await response.json();

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                if (user.email === "victor.bb@gmail.com") {
                    window.location.href = "../LandingPage/LandingpageCliente.html";
                } else if (user.email === "normaGodoy@gh.com") {
                    window.location.href = "../AdministradorInicio/InicioAdmin.html";
                } else if (user.email === "josueCelaya@gh.com") {
                    window.location.href = "../VistaVentanaCitaAgendaTERMINADO/index.html";
                }
            } else {
                alert("Correo o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error al leer el archivo usuarios.json", error);
        }
    });
});