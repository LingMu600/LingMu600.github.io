'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let myTan = [];

function processText() {
  
  let temporaryNote = [];
   
  let excludedWords = [
    ",",".","-","a", "the", "I", "you", "he", "she", "do", "does", "be", "is", "are",
    "who", "what", "how", "where", "when", "which", "much","man","woman","men","women","one","two",
    "three","four","five","six","seven","eight","nine","ten","eleven","twelve","with","and","or","Would","would",
    "year","years","ago","old","new","then","long","short","heavy","sometime","something","shomewhere","some","many",
    "and","to","somebody","everybody","every","have","has","had","get","got","say","said","true","their",
    "in","enough","with","was","were","will","by","hello","world","only","his","her","hers","my","mine",
    "you","yours","else","about","like","on","of","in","for","under","above","most","more","email","says","online","net",
    "internet","phone","own","look","table","around","may","might","next","new","yes","Yes","no","No",
    "this","that","This","That","it","It","dinner","lunch","breakfast","fast","slow","today","society","loss","from",
    "yesterday","tomorrow","past","future","day","after","before","way","days","we","find","along",
    "they","cellphone","among","opinion","now","up","down","but","than","such","all","play","think"
  ];
 
  const inputText = document.getElementById("mytextarea").value;
  const words = inputText.split(" ");
  const filteredWords = words.filter(word => !excludedWords.includes(word.toLowerCase()));
 
  filteredWords.forEach(word => {
    temporaryNote.push({ word: word, initial: word[0], date: getDate(), trans: "" });
  });
  
  displayWordList(temporaryNote);
  return temporaryNote;
}

function displayWordList(temporaryNote) {
  const wordList = document.getElementById("wordList");
  wordList.innerHTML = "";

  temporaryNote.forEach((note, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "word" + index;
    const label = document.createElement("label");
    label.htmlFor = "word" + index;
    label.textContent = note.word;
    li.appendChild(checkbox);
    li.appendChild(label);
    wordList.appendChild(li);
  });
}

function getDate() {
  const date = new Date();
  return date;
}



function addToMyTan() {
  const checkboxes = document.querySelectorAll('#wordList input[type=checkbox]');

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const label = document.querySelector(`label[for=word${index}]`);
      const word = label.textContent;
      const initial = word[0];
      const date = getDate();
      const trans = '';
      myTan.push({word, initial, date, trans});
    }
  });

  displayWordListForMyTan(myTan);
  return myTan;
}

function displayWordListForMyTan(myTan) {
  const wordList = document.getElementById("wordListForMyTan");
  wordList.innerHTML = "";

  myTan.forEach((note, index) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = note.word;
    li.appendChild(label);
    wordList.appendChild(li);
  });
}

function clearWordList() {
  const wordList = document.getElementById("wordList");
  while (wordList.firstChild) {
    wordList.removeChild(wordList.firstChild);
  }
}

function displayMyTan() {
  const myTanList = document.getElementById("myTanList");
  myTanList.innerHTML = "";

  myTan.forEach(word => {
    const listItem = document.createElement("li");
    listItem.textContent = `${word.word} (${word.trans})`;
    myTanList.appendChild(listItem);
  });
}

function showWordList() {
  const myTanList = document.getElementById("LatestMyTanList");
  myTanList.innerHTML = "";
  for (let i = 0; i < myTan.length; i++) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(myTan[i].word + " (" + myTan[i].trans + ")"));
    myTanList.appendChild(li);
  }
}

