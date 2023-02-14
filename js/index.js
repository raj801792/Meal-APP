
//For Scarch Bar
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  //alert(inputValue);

  //Fetch data from API
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`)
  .then(data=>data.json())
  .then(res=>{
    console.log(res);
    //console.log(res.meals.length);
    let n = res.meals.length;
    let html = "";

    //traverse all fetching data accourding to user scarch 
    for(let i=0;i<n;i++){
      html +=`
      <div class="col">
        <div class="card">
        <span><a href="${res.meals[i].strYoutube}"><i class="fa-solid fa-video video-icon"></i></a></span>
          <img src="${res.meals[i].strMealThumb}" class="card-img-top" alt="Hollywood Sign on The Hill"/>
          <span><i class="fa-solid fa-heart fav-icon" id="${res.meals[i].idMeal}" onclick="selectFav(this.id)"  ></i></span>
          <div class="card-body">
            <h5 class="card-title">${res.meals[i].strMeal}</h5>
            
            <p class="card-text">
              <span><b>Category:</b>&nbsp${res.meals[i].strCategory}</span>
              <br>
              <span><b>Tags:</b>&nbsp${res.meals[i].strTags}</span>
              <br>
              <span><b>Area:</b>&nbsp${res.meals[i].strArea}</span>
              <span><i class="fa-solid fa-circle-info detail-icon" id="${res.meals[i].idMeal}" onclick="showDetail(this.id)"></i></span>
            </p>
            
          </div>
        </div>
      </div>`;
      
    }

    //set data in html file(index.html)
    let allItem = document.getElementById("allItem");
    allItem.innerHTML = html;
  })
});

//ading favorit item in local storage
function selectFav(index){

  //console.log(index);
  let favList = localStorage.getItem("favList");
  if (favList == null) {
    favListObj = [];
  }
  else {
    favListObj = JSON.parse(favList);
  }
  let MyObj={
      id:index
  }

  favListObj.push(MyObj);
  localStorage.setItem("favList", JSON.stringify(favListObj));

  //showing alert in user
  alert("save in Favorit")
  //console.log("local")
}


//show a alert for repasent detal of particular item
function showDetail(id){

  let html = "";
  //fetch data from api with the help of id of a particular item
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(data=>data.json())
    .then(res=>{
      //render alert
      alert(`Description : ${res.meals[0].strInstructions}`);
    })
}

