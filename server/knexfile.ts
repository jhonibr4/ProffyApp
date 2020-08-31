import path from 'path';

// Esse arquivo de knexfile basicamente tem a funcionalidade de fazer com que leia o javascript em typescript.

module.exports = {
    client:'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations:{
        directory: path.resolve(__dirname , 'src' , 'database' , 'migrations')    
    },
    useNullAsDefault:true
}