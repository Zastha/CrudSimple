import { createTables } from "./createTable.js";
import sqlite3 from "sqlite3";

async function showAllSchemas() {
    const db = new sqlite3.Database("./CrudEmpleados");
    db.all(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
        async (err, tables) => {
            if (err) {
                console.error("Error al obtener las tablas:", err);
                db.close();
                return;
            }
            for (const table of tables) {
                await new Promise((resolve) => {
                    db.all(`PRAGMA table_info(${table.name});`, (err, columns) => {
                        if (err) {
                            console.error(`Error al obtener el schema de ${table.name}:`, err);
                            resolve();
                            return;
                        }
                        console.log(`\nSchema de la tabla ${table.name}:`);
                        columns.forEach(col => {
                            console.log(`- ${col.name} (${col.type})`);
                        });

                        // Ahora mostramos las claves foráneas
                        db.all(`PRAGMA foreign_key_list(${table.name});`, (err, fks) => {
                            if (err) {
                                console.error(`Error al obtener las claves foráneas de ${table.name}:`, err);
                            } else if (fks.length > 0) {
                                console.log("  Claves foráneas:");
                                fks.forEach(fk => {
                                    console.log(
                                        `    - ${fk.from} → ${fk.table}(${fk.to})`
                                    );

                                });
                            } else {
                                console.log("  Sin claves foráneas.");
                            }

                            db.all(`SELECT * FROM ${table.name};`, (err, rows) => {
                                if(err){
                                    console.error(`Error al obtener los registros de la tabla ${table.name}`);
                                }else{
                                    console.log(` Datos de la tabla ${table.name}`);
                                    if (rows.length === 0){
                                        console.log(`La tabla ${table.name} esta vacia`)
                                    }else{
                                        rows.forEach( row =>{
                                            console.log("   ",row);
                                        });
                                    }
                                }
                                  resolve();
                            }

                            )
                          
                        });
                    });
                });
            }
            db.close();
        }
    );
}

(async () => {
    await createTables();
    await showAllSchemas();
})();