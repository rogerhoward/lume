import fs from 'fs'

export function importSql(path){
  return fs.readFileSync(`${__dirname}/${path}`).toString()
}

export function getFileNames(path){
  return fs.readdirSync(`${__dirname}/${path}`)
}
