import mysql from 'mysql'
import buildTables from './scripts/buildTables'
const {
  mysql_host: host,
  mysql_user: user,
  mysql_password: password,
  mysql_database: database,
  mysql_port: port
} = process.env

const db = mysql.createConnection({
  host,
  user,
  password,
  port,
  database
})

connect().then( (success) => {
  console.log(success)
  db.query('SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS book; CREATE TABLE book (id CHAR(36) NOT NULL, title VARCHAR(100), PRIMARY KEY (id)); SET FOREIGN_KEY_CHECKS = 0;', (error, results, fields) => {
    console.log(error, results, fields)
  })
})



export default db

function connect(){
  return new Promise( (resolve, reject) => {

    db.connect((err) => {
      if (err) reject(err)
      resolve(db)
    })
  })
}

// buildTables()
