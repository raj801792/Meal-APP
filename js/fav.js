
showFavItem()

//for showing favorit items
function showFavItem() {
    //console.log("favlist")

    let favList = localStorage.getItem("favList");
    if (favList == null) {
      favListObj = [];
    }
    else {
      favListObj = JSON.parse(favList);
    }
    
    let html = "";

    favListObj.forEach(function (element, index) {

      //fetching data from api with the help of id (items id)
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.id}`)
      .then(data=>data.json())
      .then(res =>{
        
        //console.log(res)
        html +=`
        <div class="col">
          <div class="card">
          <span><a href="${res.meals[0].strYoutube}"><i class="fa-solid fa-video video-icon"></i></a></span>
            <img src="${res.meals[0].strMealThumb}" class="card-img-top" alt="Hollywood Sign on The Hill"/>
            <span><i class="fa-solid fa-heart fav-icon" id="${index}" onclick="deleteFavItem(this.id)"  ></i></span>
            <div class="card-body">
              <h5 class="card-title">${res.meals[0].strMeal}</h5>
              
              <p class="card-text">
              <span><b>Category:</b>&nbsp${res.meals[0].strCategory}</span>
              <br>
              <span><b>Tags:</b>&nbsp${res.meals[0].strTags}</span>
              <br>
              <span><b>Area:</b>&nbsp${res.meals[0].strArea}</span>
              <span><i class="fa-solid fa-circle-info detail-icon" id="${res.meals[0].idMeal}" onclick="showDetail(this.id)"></i></span>
            </p>
            
              
            </div>
          </div>
        </div>`;

        let favListEle = document.getElementById("favList");
      favListEle.innerHTML = html;
  
      })
  
  
      
     //console.log("1")
    });
    
}


//remove from local storage
function deleteFavItem(index) {
    //console.log(`I am deleting!! ${index}`);

    let favList = localStorage.getItem("favList");
    if (favList == null) {
        favListObj = [];
    }
    else {
        favListObj = JSON.parse(favList);
    }

    //console.log("index",index)
    favListObj.splice(index, 1);
    alert("Remove from Favorit!!")
    localStorage.setItem("favList", JSON.stringify(favListObj));

    // call showFavItem function
    showFavItem();
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