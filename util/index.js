import fs from 'fs'
export const readFile = (dir) => {
   let res = []
   const files = fs.readdirSync(dir)
   for (const file of files) {
       const name = dir + '/' + file
       if (fs.statSync(name).isDirectory()) {
           const tmp = readFile(name)
           res = res.concat(tmp)
       } else {
           res.push(name)
       }
   }
   return res
}
