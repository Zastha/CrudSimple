import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
const router = express.Router();

router.use(cors());
router.use(express.json());



const verifyUnique = async(db,email) =>{
   
    return new Promise((resolve, reject) =>{
        db.get(`SELECT 1 FROM USUARIOS WHERE EMAIL = ?`, [email],
            (err, row) => {
                if(err){ 
                     console.log("Error en verifyUnique", err);
                    return reject(err);}
                resolve(!row); //true si no existe, false si ya existe
            }
        )
    }

    );
}

const registerAdmin = (db, nombre, apellido, email, telefono, password, tipo, res) => {
    db.run(
        "INSERT INTO USUARIOS (Nombre,Apellido, Email, Password, Tipo) VALUES (?,?,?,?,?)",
        [nombre, apellido, email, password, tipo],
        function (err) {
            if (err) {
                db.close();
                return res.status(500).json({ message: "Error al registrar usuario" });
            }
            const userID = this.lastID;
            db.run(
                "INSERT INTO Administradores (UserID, Telefono) VALUES (?,?)",
                [userID, telefono],
                function (err2) {
                    db.close();
                    if (err2) {
                        return res.status(500).json({ message: "Error al registrar Administrador" });
                    }
                    res.status(201).json({ message: "Administrador registrado correctamente" });
                }
            );
        }
    );
};

const registerEmployee = (db, nombre, apellido, email, telefono, password, tipo, res) => {
    db.run(
        "INSERT INTO USUARIOS (Nombre,Apellido, Email, Password, Tipo) VALUES (?,?,?,?,?)",
        [nombre, apellido, email, password, tipo],
        function (err) {
            if (err) {
                db.close();
                return res.status(500).json({ message: "Error al registrar usuario" });
            }
            const userID = this.lastID;
            db.run(
                "INSERT INTO Empleados(UserID, Telefono) VALUES (?,?)",
                [userID, telefono],
                function (err2) {
                    db.close();
                    if (err2) {
                        return res.status(500).json({ message: "Error al registrar Empleado" });
                    }
                    res.status(201).json({ message: "Empleado registrado correctamente" });
                }
            );
        }
    );
};


//Registrar Usuario
//Registrar Usuario
router.post("/register", async (req, res) => {
        
    const {nombre, apellido , email, telefono, password,tipo} = req.body;
    const db = new sqlite3.Database("../CrudEmpleados");

    try{
         console.log("Bro");
        const isUnique = await verifyUnique(db, email);
         console.log("Man");
        if(!isUnique){
            db.close();
            return res.status(400).json({message: "El usuario ya existe"});
        }

        let tipoID = tipo == "Administrador" ? 1 : 2;
       
        if(tipoID == 1 ){
            registerAdmin(db,nombre,apellido, email, telefono,password, tipoID,res);
        }else if(tipoID == 2 ){
           registerEmployee(db,nombre,apellido, email, telefono,password, tipoID,res);
        } else {
            db.close();
            res.status(400).json({ message: "Tipo de usuario no válido" });
        }

    }catch (error){
        db.close();
        res.status(500).json({message: "Error Interno"});
        
    }
}
);
export default router;