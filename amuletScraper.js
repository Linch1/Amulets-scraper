// const path = require('path');
// function relativePath( path1, path2) {
//   return path.relative(path.dirname(path1),path.dirname(path2));
// } 
// let relPath = relativePath('/WTM-VIEWS/lol.ts', '/WTM-VISUALS/navbar/ejs/assets/css/style.css');
// console.log( relPath );

const fs = require('fs');
const crypto = require('crypto');
function getHash(text) { return crypto.createHash('sha256').update(text).digest('hex');}
function checkValidAmulet( hash ) { return /(8)\1\1\1\1\1+/g.test(hash) }
function readFile(path) { return fs.readFileSync(path, "utf-8"); }
function getFiles(path) { return fs.readdirSync(path, { withFileTypes: true }).filter((dirent) => dirent.isFile()).map((dirent) => dirent.name); }
function createFile(path, content) { if (!fs.existsSync(path)) { writeFile(path, content); } }
function getDirectories(path)  { return fs.readdirSync(path, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name); }
function appendFile(path, content) { fs.appendFileSync(path, content, "utf8"); }
function writeFile(path, content) { fs.writeFileSync(path, content, "utf8"); }
function getBytest(text){  return unescape(encodeURIComponent(text)).length }
function scrapeAmulet(text){
    console.log('scraping: ', POEM)
    let textAsArray = text.split(" ");
    for( let i = 0; textAsArray.length != 0; ){
        let string = textAsArray[i];
        let count = 0;
        while(getBytest(string) < 64 ){
            let hash = getHash(string);
            if(checkValidAmulet(hash)) {
                appendFile(OUTPUT_FILE, POEM + ' |'+string + '|' + hash + '\n\n\n');
                console.log( getBytest(string), unescape(encodeURIComponent(string)) )
                console.log( 'FOUND: ', POEM + ' |'+string + '|' + hash );
            }
            count ++;
            string = textAsArray.slice(0, count).join(" ");
            if( count == textAsArray.length ) break;
        }
        textAsArray.shift(); // remove the analized string
    }
}

let directories = getDirectories("/home/pero/projects/WTM/LIB/AMULETS");
let skip = [];
var POEM;
var OUTPUT_FILE;
for ( let dir of directories ){
    if( skip.includes(dir) ) continue;
    var poemDir = `/home/pero/projects/WTM/LIB/AMULETS/${dir}/`;
    let poemsFiles = getFiles(poemDir);
    for( let i = 0; i <  poemsFiles.length ; i++ ){
        let file = poemsFiles[i];
        POEM = file;
        OUTPUT_FILE = poemDir + `${dir}-output.txt`;
        createFile(OUTPUT_FILE);
        scrapeAmulet(readFile(poemDir + file));
    }
}
