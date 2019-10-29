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
    .get('https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D9%85%D9%85%D8%AB%D9%84%D9%8A%D9%86_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D9%8A%D9%86')
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
    if(allWords[i].name === 'أشخاص' ){
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
  fs.writeFile('./words2.json', jsonContent, 'utf8', (err) => {
   if (err) {
     return console.log(err);
   }
    console.log("The file was saved!");
 });
});


//  function getArabicMovie(){
//   return new Promise((resolve,reject) => {
//    let movieNames= [] ;
//    osmosis
//     .get('https://www.elcinema.com/index/work/country/eg')
//     .paginate("//ul[contains(@class,'pagination')]/li[last()-1]/a", 568)
//     .find('table.expand tr')
//     .set({
//       title: 'td:nth-of-type(2) a[href]:nth-of-type(2)',
//       type: 'td:nth-child(3)'
//     })
//     .data( data => {
//       let clearMovieName = data.title;
//        if(data.type !== "ﻓﻴﻠﻢ ﻗﺼﻴﺮ"
//           && data.type !== "مسلسل"
//           && data.type !== "ﻣﺴﻠﺴﻞ اﺫاﻋﻲ"
//           && data.type !== "ﻣﺴﺮﺣﻴﺔ"
//           && data.type !== "ﺑﺮﻧﺎﻣﺞ"
//           && data.type !== "ﺳﻴﺖ ﻛﻮﻡ"
//           && data.type !== "ﺭﺳﻮﻡ ﻣﺘﺤﺮﻛﺔ"
//           && data.type !== "ﻓﻴﻠﻢ وثائقي/تسجيلي"
//           && data.type !== "ﻓﻴﺪﻳﻮ ﻛﻠﻴﺐ"
//           && data.type !== "فوازير"
//        ){
//           movieNames.push(clearMovieName);
//        }
//     })
//     .error(err => reject(err))
//     .done(()=> resolve(movieNames))
//   });
// }

// getArabicMovie().then( movies => {
//   console.log('json',movies.length);
//   let allmovies;
//   let index ;
//   for(let i in allWords){
//     if(allWords[i].name === 'أفلام'){
//       allmovies = allWords[i];
//       index = i ;
//       break;
//     }
//   }
//   console.log(allmovies.words.length);
//   let allmovieWords = allmovies.words.concat(movies);
//   console.log('allmovieWords', allmovieWords.length);
//   allmovies.words = allmovieWords;
//   allWords[index] = allmovies;
//   const jsonContent = JSON.stringify(allWords,null,2)
//   fs.writeFile(jsonFilePath, jsonContent, 'utf8', function (err) {
//    if (err) {
//      return console.log(err);
//    }
//    console.log("Wow it is success");
//   });
// });



 function getArabicMovie(url){
  return new Promise((resolve,reject) => {
   let movieNames= [] ;
    osmosis
    .get(url)
    .find('.wikitable tr')
    .set({
      title: 'td a'
    })
    .data( data => {
      let movieName = data.title;
          movieNames.push(movieName);
    })
    .error(err => reject(err))
    .done(()=> resolve(movieNames))
  });
}

let url = [
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2013',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2014',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2015',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2016',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2017',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2018',
  'https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D8%A6%D9%85%D8%A9_%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9_%D8%B3%D9%86%D8%A9_2019',
 ]
for(let i=0 ; i< url.length ; i++){
  getArabicMovie(url[i]).then( movies => {
    console.log('json',movies.length);
    let allmovies;
    let index ;
    for(let i in allWords){
      if(allWords[i].name === 'أفلام'){
        allmovies = allWords[i];
        index = i ;
        break;
      }
    }
    console.log(allmovies.words.length);
    let allmovieWords = allmovies.words.concat(movies);
    console.log('allmovieWords', allmovieWords.length);
    allmovies.words = allmovieWords;
    allWords[index] = allmovies;
    const jsonContent = JSON.stringify(allWords,null,2)
    fs.writeFile('./words2.json', jsonContent, 'utf8', function (err) {
     if (err) {
       return console.log(err);
     }
     console.log("Wow it is success" + [i]);
    });
  });
}