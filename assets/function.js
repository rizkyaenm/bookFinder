const CACHE_KEY = "search_history";

function checkForStorage(){
  return typeof(Storage) !== "undefined"
}


function putHistory(data){
  if (checkForStorage()){
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null){
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }
    historyData.unshift(data);

    if(historyData.length > 5){
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY,JSON.stringify(historyData));
  }

}

function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#list-search");


  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement('tr');
    row.innerHTML = "<td>" + history + "</td>";

    historyList.appendChild(row);
  }
}
renderHistory();



function searchTitle(){
  let input;
  let filter;
  let i;
  let titles;
  let categories;
  let authors;

  input = document.getElementById("searchbar-input");
  filter = input.value.toLowerCase();
  const articles = document.querySelectorAll('article');

  const notification = document.querySelector("#notification");
  notification.style.display='none';



  titles = document.querySelectorAll('.title');
  categories = document.querySelectorAll('.category');
  authors = document.querySelectorAll('.author');
  let articleCount = 0;
  console.log('input',filter);
  console.log(articles.length);
  console.log(articles);

  for(i=0; i < articles.length ; i++ ){

    const title = titles[i].innerText.toLowerCase();
    const category = categories[i].innerText.toLowerCase();
    const author = authors[i].innerText.toLowerCase();

    const desc = title.concat(" ",category," ", author);
    console.log(desc);

    if (desc.search(filter) == -1){

      articles[i].style.display ='none';
      console.log('nope');


    } else {

      articles[i].style.display ='';
      articleCount =+1;
      console.log('yes')
    }

  } if (articleCount == 0){
    console.log(notification);

    notification.innerHTML = "<p>I'm sorry there's no Result regarding ' "+filter+" '</p>";
    notification.style.display='inline';
  }


  const history = filter;
  putHistory(history);
  renderHistory();

}
