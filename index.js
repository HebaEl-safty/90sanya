const osmosis = require("osmosis");
const fs = require('fs');
const jsonFilePath = './words.json';
let allWords = readJsonFile();

function readJsonFile(){
  let data = fs.readFileSync(jsonFilePath, 'utf8');
  let wordsObj = JSON.parse(data);
  return wordsObj;
}

function getArabicActors(){
  return new Promise((resolve,reject)=>{
   let actorNames= [] ;

   osmosis
    .get('https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D9%85%D9%85%D8%AB%D9%84%D9%8A%D9%86_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D9%8A%D9%86#%D8%A3')
   .find('.mw-parser-output ul li')
   .set({
     title: 'a',
   })
   .data( data => {
     if(data.title)
      actorNames.push(data.title);
   })
   .error(err => reject(err))
   .done(() => resolve(actorNames))
  });
}

getArabicActors().then( actors => {
  console.log('json',actors.length);

  let persons = null;
  let index ;
  for( let i in allWords){
    if(allWords[i].name === 'أشخاص'){
      persons = allWords[i];
      index = i;
      break;
    }
  }
  console.log(persons.words.length);
  let allPersonsWords = persons.words.concat(actors);
  console.log('allpersons', allPersonsWords.length);

  persons.words = allPersonsWords;

  allWords[index] = persons;

  const jsonContent = JSON.stringify(allWords,null,2);
  fs.writeFile('./actors.json', jsonContent, 'utf8', (err) => {
   if (err) {
     return console.log(err);
   }
    console.log("The file was saved!");
 });
});
