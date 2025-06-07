import { validateRegister } from "./registerValidator.js";

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

    //Handler para el login
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

    //Handler para el Registro
    const registerForm = document.querySelector("#registerPopup form");

    registerForm.addEventListener("submit", async(event) =>{
      event.preventDefault();

      const nombre = document.getElementById("registerName").value;
      const apellido = document.getElementById("registerLastName").value;
      const email = document.getElementById("registerEmail").value;
      const telefono = document.getElementById("registerPhone").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword =document.getElementById("registerConfirmPassword").value;
      const tipo = document.getElementById("TipoUsuario").value;


      if(!validateRegister.validatePasswordNotEmpty(password)){
        alert("La contraseña no puede estar vacia");
        return;
      }

      if(!validateRegister.validatePasswordLength(password)){
        alert("La contraseña no puede tener menos de 4 caracteres");
        return;
      }

      if(!validateRegister.validateConfirmPassword(password,confirmPassword)){
        alert("No coinciden las contraseñas");
        return;
      }

    

      try{
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({nombre,apellido,email,telefono,password,tipo})
        });

        const data = await response.json();

        if(response.ok){
          alert("Usuario registrado correctamente");
          
        }else{
          alert(data.message || "Error al registrar usuario");
        }

        
      }catch(error){
          console.error("Error al registrar el usuario",error);
          alert("Error de conexion con el servidor");
        }


    }
    )
});


