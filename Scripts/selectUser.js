import express from "express";
import sqlite3 from "sqlite3";
import {execute} from "./sql.js";
const app = express();
app.use(express.json());


const verifyUnique = async(db,email) =>{
    return new Promise((resolve, reject) =>{
        db.get(`SELECT 1 FROM USUARIOS WHERE EMAIL = ?`, [email],
            (err, row) => {
                if(err) return reject(err);
                resolve(!row); //true si no existe, false si ya existe
            }
        )
    }

    );
}


//Registrar Usuario
app.post("/api/register", async

)