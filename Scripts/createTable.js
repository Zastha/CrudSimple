import sqlite3 from "sqlite3";
import {execute} from "./sql.js";


export const createTables = async () =>{
    const db = new sqlite3.Database("CrudEmpleados");
    try{
        await execute(db, `
            CREATE TABLE IF NOT EXISTS TIPOSXUSUARIOS(
                ID INTEGER PRIMARY KEY,
                NOMBRE TEXT NOT NULL
            );
        `);

        await execute(db, `
            CREATE TABLE IF NOT EXISTS USUARIOS(
                ID INTEGER PRIMARY KEY,
                NOMBRE TEXT NOT NULL,
                APELLIDO TEXT NOT NULL,
                EMAIL TEXT NOT NULL,
                PASSWORD TEXT NOT NULL,
                TIPO INTEGER,
                FOREIGN KEY (TIPO) REFERENCES TIPOSXUSUARIOS(ID)
            );
        `);

        await execute(db, `
            CREATE TABLE IF NOT EXISTS ADMINISTRADORES(
                ID INTEGER PRIMARY KEY,
                TELEFONO TEXT NOT NULL,
                USERID INTEGER,
                FOREIGN KEY (USERID) REFERENCES USUARIOS(ID)
            );
        `);

        await execute(db, `
            CREATE TABLE IF NOT EXISTS EMPLEADOS(
                ID INTEGER PRIMARY KEY,
                TELEFONO TEXT NOT NULL,
                JEFE INTEGER,
                USERID INTEGER,
                FOREIGN KEY (JEFE) REFERENCES ADMINISTRADORES(ID),
                FOREIGN KEY (USERID) REFERENCES USUARIOS(ID)
            );
        `);

        await execute(db, `
            CREATE TABLE IF NOT EXISTS INMUEBLES(
                ID INTEGER PRIMARY KEY,
                DIRECCION TEXT NOT NULL,
                ESTADO INTEGER
            );
        `);

        await execute(db, `
            CREATE TABLE IF NOT EXISTS CITAS(
                ID INTEGER PRIMARY KEY,
                FECHA DATETIME NOT NULL,
                EMPLEADO INTEGER,
                INMUEBLE INTEGER,
                FOREIGN KEY (EMPLEADO) REFERENCES EMPLEADOS(ID),
                FOREIGN KEY (INMUEBLE) REFERENCES INMUEBLES(ID)
            );
        `);

    } catch (error){
        console.log(error);
    } finally {
        db.close();
    }
};


