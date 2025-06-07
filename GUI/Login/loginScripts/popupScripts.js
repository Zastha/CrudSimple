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

    if(!validateRegister.validatePasswordNotEmpty(password)){
        alert("La contraseña no puede estar vacia");
        return;
      }

        try {

        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({email,password})
        });

        const data = await response.json();
        
       if(response.ok){
          alert("Login realizado correctamente");
          
        }else{
          alert(data.message || "Error en el login");
        }
          

        } catch (error) {
            console.error("Error en el login, frontend", error);
        }
    });

    const tipoUsuarioSelect = document.getElementById("TipoUsuario");
    const telefonoContainer = document.getElementById("telefonoContainer");

    tipoUsuarioSelect.addEventListener("change", () =>{
      const tipo = tipoUsuarioSelect.value;

      if(tipo === "Cliente"){
        telefonoContainer.style.display = "none";
      }else{
        

        telefonoContainer.style.display = "";
      }
    }
    
    )



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


