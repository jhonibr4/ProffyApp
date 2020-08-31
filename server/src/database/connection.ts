import knex from 'knex'
import path from 'path'

//Migrations: Tem a função de controlar as versões do banco de dados.

const db = knex({
    client: 'sqlite3',
    connection:{
        //um modulo utilizado para facilitar o direcionamento do arquivo.
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //Propriedade utilizada para mostrar que quando um campo for vazio para o banco de dados preencher com o valor "NULL"
    useNullAsDefault:true
});
export default db;