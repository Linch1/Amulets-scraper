# Amulets-scraper

This scraper will scrape all the files in all the 'first level' folders searching for amulets.

- The contained files in the folders must be `.txt` files
- The amulets are going to placed in an output file inside each single folder with the found amulets
- Must download [Nodejs](https://nodejs.org/it/download/) 

### Exapmple of root directory after that has been scraped

```
- Main Folder
  - mySubFolder
    - File.txt
    - FIle2.txt
    - mySubFolder-output.txt  <-- This files contains the amulets
  - mySubFolder33
    - File.txt
    - FIle2.txt
    - mySubFolder33-output.txt <-- This files contains the amulets
```
> each amulet in the output file is contained between the '|' characters.
> 
> Output of an amulet FILE_NAME|AMULET|SHA256

### Getting started

##### Setup the enviroment
1. Download the repo
2. Open a terminal and type this commands
3. `cd /path/to/the/downlaoded/folder`
4. `npm init`
5. `npm i --save crypto`
##### Start scraping
1. Place all your txt files to scrape inside a folder
2. Open the `amuletScraper.js` file
3. change the value of the `MAIN_DIR` variable (`line:33`)
4. Go in the terminal
5. `node amuletScraper.js`
