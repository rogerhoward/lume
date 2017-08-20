import {importSql, getFileNames} from './utils'
import query from '../query'
import mysql from 'mysql'

export default async function buildTables(){
  try {
    // const fileNames = getFileNames('../sql/tables')
    // const queries = fileNames.map(file => importSql(`../sql/tables/${file}`))
    // let string = queries.join("")
    // string = `
    //   SET FOREIGN_KEY_CHECKS = 0;
    //   ${string}
    //   SET FOREIGN_KEY_CHECKS = 1;
    // `
    // string = string.replace(/(\n)/g, " ")
    // string = string.replace(/(\t)/g, " ")
    // string = mysql.format(string)

    // console.log(string)
    // const results = await Promise.all(
    //   queries.map( string => query(string))
    // )

    let sql = mysql.escape('SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS book; CREATE TABLE book (id CHAR(36) NOT NULL, title VARCHAR(100), PRIMARY KEY (id)); SET FOREIGN_KEY_CHECKS = 0;')

    // const string = importSql('../sql/tables/book.sql')
    const results = await query(sql)
    console.log(results)
  } catch (ex) {
    console.error(ex)
  }
}
