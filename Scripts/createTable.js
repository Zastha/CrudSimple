import sqlite3 from "sqlite3";
import {execute} from "./sql.js";


export const createTables = async () =>{
    const db = new sqlite3.Database("CrudEmpleados");
    try{
        await execute(
            db,
            `CREATE TABLE IF NOT EXISTS EMPLEADOS(
            ID INTEGER PRIMARY KEY,
            NOMBRE TEXT NOT NULL,
            EMAIL TEXT,
            TELEFONO TEXT)`
        );
    } catch (error){
        console.log(error);
    } finally {
        db.close();
    }
};


