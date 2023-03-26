'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let myTan = [];
//複数の関数が使用するため、myTan配列はグローバルスコープに置く。推奨されないので他にやりようがあるかもしれない

function processText() {
  
  let temporaryNote = [];
  //temporaryNote配列は、textareaにペーストされた英文をスペースごとに区切って単語に分けたものを格納する一時置き場として使う
  
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
  //　excludedWords配列は、頻出かつ分かりきっている単語を予めいくつか入れておき、最初から表示しないようにはじくために使う

  const inputText = document.getElementById("mytextarea").value;
  //inputTextは変数で、HTMLでtextareaには、id = mytextarea を設定しているため、getElementByID で.value(＝ペーストした内容でこれは文字列)を取得する

  const words = inputText.split(" ");
  //wordsは変数で、inputTextの文字列（文章）を.splitメソッドにより、スペース（" "）で区切ることで英単語の配列として返されたものを取得する

  const filteredWords = words.filter(word => !excludedWords.includes(word.toLowerCase()));
  //① filterdWordsは変数で、上段の変数wordsに対し、.filterによってある条件に合致する（＝論理式の関数がtrueとなる）英単語だけを配列として取得する
  //② ある条件とは、配列excludedWordsに含まれる単語と合致しない（合致しないとtrueを返す関数）ということ
  //③ wordは words配列の各要素を順に取り出したもの。"配列".include(word)は、"配列"にwordが含まれていればtrueを返す
  //④ excludeddWors.include(word)であれば、wordがexcludedWordsに合致する単語の場合trueとなるが、否定演算子!によりそれが逆転する
  //⑤ これにより、filteredWordsは、excludedWords に含まれない英単語からなる配列を取得する
  //⑥ word.toLowerCaseは、wordを小文字化する
  //⑦ 小文字化されたwords配列の各要素wordが、excludedwords配列にない場合(!excludedWords.includes(word.toLowerCase()がtrue)に抽出された
  //  英単語からなる配列filterdWordsを作る

   
  filteredWords.forEach(word => {
    temporaryNote.push({ word: word, initial: word[0], date: getDate(), trans: "" });
  });
  //配列filterdWordsの要素である英単語を、引数wordとして配列tenporaryNote（オブジェクトを要素に持つ配列）に変換する


  displayWordList(temporaryNote);
  return temporaryNote;
  //別のところ（下段）で定義された関数displayWordListを呼び出す

}
 //ここまでが processText 関数
 //　入力された文章を取得 ⇒ 単語に分解 ⇒ いらない単語を除外 ⇒ 単純な配列をオブジェクトが要素である配列に変換 ⇒ 画面に表示させるための関数を呼び出す 
 //　最後の return temporaryNote が必要かどうか？とりあえず何か返さないとと思い書いているがどうだろうか？
 

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
//  wordListは変数で、「単語リスト」の表示箇所に割り当てた＜ul＞ id = wordList の要素を取得、innerHTML=""で初期化
//  li要素を追加、同様にinput要素を追加
//  checkbox要素は、checkbox.type = "checkbox"でチェックボックスを指定
//  checkobx.id は、input要素(=const checkbox)のid属性に "word"＋index(順番)の値を設定。"word0"
//  label要素を追加
//  label要素のfor属性に、 "word"＋index(順番)の値を設定（for属性はラベル付け対象を指定する）
//  label要素のテキストコンテンツにtemporaryNoteの各単語を設定
//  liに、checkbox要素とlabel要素を追加（appenchild)
//  wordList（ul要素）に、li要素を追加し、temporaryNoteに含まれる単語リストを生成

function getDate() {
  const date = new Date();
  return date;
}
//  実行した日時を取得する　⇒　配列のオブジェクト要素のプロパティとして格納される


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
//  ID = #wordList の HTML要素内の全てのチェックボックスを取得し変数checkboxesに代入
//  checkboxがcheckされている場合、その単語に対応するオブジェクトの各プロパティを取得し、配列mytanに格納
//  下段の displayWordListForMyTan(myTan)を実行

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
//  ６０行目function displayWordList(temporaryNote) とほぼ同じことをしている


function clearWordList() {
  const wordList = document.getElementById("wordList");
  while (wordList.firstChild) {
    wordList.removeChild(wordList.firstChild);
  }
}
// .firstChildは最初の子要素を取得するプロパティ


function displayMyTan() {
  const myTanList = document.getElementById("myTanList");
  myTanList.innerHTML = "";

  myTan.forEach(word => {
    const listItem = document.createElement("li");
    listItem.textContent = `${word.word} (${word.trans})`;
    myTanList.appendChild(listItem);
  });
}
//  ６０行目function displayWordList(temporaryNote) とほぼ同じことをしている
//  但し、今回は翻訳情報を取得していないので、(${word.trans})により、単語の後に()だけが表示される


function showWordList() {
  const myTanList = document.getElementById("LatestMyTanList");
  myTanList.innerHTML = "";
  for (let i = 0; i < myTan.length; i++) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(myTan[i].word + " (" + myTan[i].trans + ")"));
    myTanList.appendChild(li);
  }
}
//  自分の単語帳を見るボタンを押すと機能する関数。上段のようにforEachでもかけると思うがこちらのほうが自分には分かりやすい
//  表示は、翻訳情報を取得していないため、()が追記される



//  訳を取得する機能を追加したいが未実装（GoogleなどのAPIが使えそうだがよく分からない）
//  ブラウザをリフレッシュすると、myTan配列の内容も消えてしまう。残るようにするにはブラウザでのデータ保持が必要のようだがよく分からない
//  cssファイルの方だが、見栄えをもう少しよくしたい
