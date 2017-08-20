import db from './index'

export default function(sqlString){
  return new Promise( (resolve, reject) => {
    db.query(sqlString, (error, results, fields) => {
      if (error) reject(error)
      resolve(results, fields)
    })
  })
}
