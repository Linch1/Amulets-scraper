const fs = require('fs');
const crypto = require('crypto');
const { Console } = require('console');
var regex = /(8)\1\1\1\1\1\1+/g;
var RARITY = {
    6: 'rare',
    7: 'epic',
    8: 'legendary',
    9: 'mythic'
}

function getHash(text) { return crypto.createHash('sha256').update(text).digest('hex');}
function checkValidAmulet( hash ) { return regex.test(hash) }
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
                let hashMatch = hash.match(regex);
                let amuletRarityLength = hashMatch ? hashMatch[0].length : undefined;
                let rarity = amuletRarityLength ? RARITY[amuletRarityLength] : "UNKNOWN";
                if( !rarity ) rarity = 'legendary++'
appendFile(OUTPUT_FILE, `
AMULET: |${string}|
RARITY_LENGTH: ${amuletRarityLength}
RARITY: ${rarity}
HASH: ${hash}
BYTES: ${getBytest(string)}\n\n`);

console.log( `
FOUND IN : ${POEM},
AMULET: |${string}|
RARITY_LENGTH: ${amuletRarityLength}
RARITY: ${rarity}
HASH: ${hash}
BYTES: ${getBytest(string)}`);
            }
            count ++;
            string = textAsArray.slice(0, count).join(" ");
            if( count == textAsArray.length ) break;
        }
        textAsArray.shift(); // remove the analized string
    }
}
var MAIN_DIR = "/home/pero/projects/zora/AMULETS"; // must not end with a '/';
let directories = getDirectories(MAIN_DIR);
let skip = ['orwell', 'shakespeare', 'sparse'];
var POEM;
var OUTPUT_FILE;
for ( let dir of directories ){
    if( skip.includes(dir) ) continue;
    var poemDir = `${MAIN_DIR}/${dir}/`;
    let poemsFiles = getFiles(poemDir);
    for( let i = 0; i <  poemsFiles.length ; i++ ){
        let file = poemsFiles[i];
        POEM = file;
        OUTPUT_FILE = poemDir + `${dir}-output.txt`;
        createFile(OUTPUT_FILE);
        scrapeAmulet(readFile(poemDir + file));
    }
}
