import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
const router = express.Router();

router.use(cors());
router.use(express.json());

const verifyExistence = async(db,email) =>{

       return new Promise((resolve, reject) => {
        db.get(`SELECT 1 FROM USUARIOS WHERE EMAIL = ?`, [email],
            (err,row) =>{
                if(err){
                    console.log("Error al buscar usuario" ,err);
                    return reject(err);
                }
                resolve(row);
            }

        )
    })
}
const verifyPassword = async (db, email, password) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT password FROM USUARIOS WHERE EMAIL = ?`, [email], (err, row) => {
            if (err) {
                console.log("Error consultando la contraseña", err);
                return reject(err);
            }
            if (!row) {
                // No se encontró el usuario
                return resolve(false);
            }
            // Compara la contraseña recibida con la almacenada
            resolve(row.password === password);
        });
    });
}

const loginExistoso = async(db, email) =>{
    console.log("login exitoso en email "+email);
}


router.post("/login", async (req,res) =>{
    const {email, password} = req.body;
    const db = new sqlite3.Database("../CrudEmpleados");
  

    try{
        const existe = await verifyExistence(db,email);
          console.log(existe)
        if(existe){


            if(verifyPassword){
                loginExistoso(db,email);
                return res.status(200).json({ message: "Login exitoso" });
            }else{
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
            

        }else{
            db.close();
            return res.status(400).json({message: "No existe el usuario"});
        }


    }catch (error){
        db.close();
        res.status(500).json({message: "Error en el login"});
    }

}
)

export default router;