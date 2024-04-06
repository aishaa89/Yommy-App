"use strict";
// $('.fa-bars').on('click',function(){
//    if( $('.sidebar').css('left')=='-270px'){
//     $('.sidebar').css('left','0px');
//     $('.right-side .open-close').removeClass('fa-bars');
//     $('.right-side .open-close').addClass('fa-x');

//    }else if($('.sidebar').css('left')=='0px'){
//     $('.sidebar').css('left','-270px');
//     $('.right-side .open-close').addClass('fa-bars');
//     $('.right-side .open-close').removeClass('fa-x');
//    }
 
// })
let boxWidth=$('.navMenue .left-side').outerWidth();
closesideNav();
function opensideNav(){
    $(".sidebar").animate({left:"0px"},500)
    $('.right-side .open-close').removeClass('fa-bars');
    $('.right-side .open-close').addClass('fa-x');
    $("li").eq(0).animate({top:0},500);
    $("li").eq(1).animate({top:0},600);
    $("li").eq(2).animate({top:0},700);
    $("li").eq(3).animate({top:0},800);
    $("li").eq(4).animate({top:0},900);

}
function closesideNav(){
    $(".sidebar").animate({left: -boxWidth},500);
    $('.right-side .open-close').addClass('fa-bars');
     $('.right-side .open-close').removeClass('fa-x');
     $("li").animate({top:300},500)
}
$('.open-close').on('click',function(){
   if( $(".sidebar").css("left")=="0px"){
    closesideNav();
   }else{
    opensideNav();
   }
})






 $(function(){
   getMeals().then(()=>{
    $('.fa-spinner').fadeOut(500 ,function(){
        $('.loading').fadeOut(500,function(){
            $('body').css('overflow','auto');
        });
          
        });
   })

    
    
  } );


  async function getMeals(){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let result=await response.json();
    displayMealsBySearch(result);
}
function displayMealsBySearch(list){  
    let cartoona=``;
   for(let i=0;i<list.meals.length;i++){
         cartoona+=`<div class="col-md-3">
         <div id="${list.meals[i].idMeal}"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
             <img class="w-100" src="${list.meals[i].strMealThumb}" alt="">
             <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                 <h3>${list.meals[i].strMeal}</h3>
             </div>
         </div>
     </div>
         `
        
       }
   $('#randomMeal').html(cartoona);
   
   let cards=document.querySelectorAll(".meal");
   for(let i=0;i<cards.length;i++){
    cards[i].addEventListener("click",function(e){
       $('.body-Meales').addClass('d-none');
       $('.detail').removeClass('d-none');
       getDetailes(cards[i].getAttribute("id"))
   
    })
   }
   }
function displayMeals(list){  
 let cartoona=``;
for(let i=0;i<list.meals.length;i++){
      cartoona+=`<div class="col-md-3">
      <div id="${list.meals[i].idMeal}"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${list.meals[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${list.meals[i].strMeal}</h3>
          </div>
      </div>
  </div>
      `
      if(i==19){
        break;
      }
    }
$('#randomMeal').html(cartoona);

let cards=document.querySelectorAll(".meal");
for(let i=0;i<cards.length;i++){
 cards[i].addEventListener("click",function(e){
    $('.body-Meales').addClass('d-none');
    $('.detail').removeClass('d-none');
    getDetailes(cards[i].getAttribute("id"))

 })
}
}

function displayCategories(list){
    let category=``;
for(let i=0;i<list.categories.length;i++){
    category+=`<div class="col-md-3">
      <div id="${list.categories[i].strCategory}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${list.categories[i].strCategoryThumb}" alt="">
          <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${list.categories[i].strCategory}</h3>
              <p>${list.categories[i].strCategoryDescription.split(" ",20).join(" ")}</p>
          </div>
      </div>
  </div>
      `
    }
$('#randomMeal').html(category);
let cards=document.querySelectorAll(".meal");
for(let i=0;i<cards.length;i++){
 cards[i].addEventListener("click",function(e){
    getMealsCategory(cards[i].getAttribute("id")); 
  
 })
}
}
function displayDetailes(detail){
    let detailMeal="";
    let ingredients='';

    for(let i=0;i<detail.meals.length;i++){
        for(let j=1;j<=20;j++){
            if(detail.meals[i][`strIngredient${j}`]){
                ingredients+=`
                <li class="alert alert-info m-2 p-1">${detail.meals[i][`strMeasure${j}`]}${detail.meals[i][`strIngredient${j}`]}</li>

                `
            }
          }

          let tags=detail.meals[i].strTags?.split(",");
          if(!tags) tags=[];
          let tagstr= " ";
          for(let x=0;x<tags.length;x++){
            tagstr+=`
            <li class="alert alert-info m-2 p-1">${tags[x]}</li>
               
            `
          }
      detailMeal+=`
        <div class="col-md-4">
        <img src="${detail.meals[i].strMealThumb}" class="w-100" alt="">
        <h2>${detail.meals[i].strMeal}</h2>
     </div>
     <div class="col-md-8">
         <h2>Instructions</h2>
         <p> ${detail.meals[i].strInstructions} </p>
          <h3>Area :${detail.meals[i].strArea}</h3>
          <h3>Category : ${detail.meals[i].strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap" id="Recipes">
          ${ingredients}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap" id="Tags">
              ${tagstr}
            </ul>
            <a target="_blank" class="btn btn-success" href="${detail.meals[i].strSource}">Source</a>
            <a target="_blank" class="btn btn-danger" href="${detail.meals[i].strYoutube}">Youtube</a>
            </div>
             `
    }

   $('#detailes-section').html(detailMeal);
   

}
function displayAreas(areas){
    let area=``;
for(let i=0;i<areas.meals.length;i++){
    area+=`<div class="col-md-3">
    <div id="${areas.meals[i].strArea}" class="area-point text-center text-light">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${areas.meals[i].strArea} </h3>
    </div>
  </div>
      `
    }
$('#randomMeal').html(area);

let areaPoint=document.querySelectorAll(".area-point");
for(let i=0;i<areaPoint.length;i++){
    areaPoint[i].addEventListener("click",function(e){
        getMealByArea(areaPoint[i].getAttribute("id")); 

 })
}
}

function displayIngredients(ingredients){
    let ingredient="";
for(let i=0;i<20;i++){
    ingredient+=`<div class="col-md-3">
    <div id="${ingredients.meals[i].strIngredient}" class="ingredient-point text-center text-light">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${ingredients.meals[i].strIngredient}</h3>
              <p>${ingredients.meals[i].strDescription.split(" ",20).join(" ")}</p>
          </div>
  </div>
      `
    }
$('#randomMeal').html(ingredient);

let ingredientPoint=document.querySelectorAll(".ingredient-point");
for(let i=0;i<ingredientPoint.length;i++){
    ingredientPoint[i].addEventListener("click",function(e){
        getMealByIngredient(ingredientPoint[i].getAttribute("id")); 

 })
}
}
async function getMealsCategory(catName){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    let result=await response.json();
    displayMeals(result);
}
async function getCategories(){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let result=await response.json();
    displayCategories(result);
}

async function getMealsByName(name){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let result=await response.json();
    displayMeals(result)
}

async function getMealsByfLetter(letter){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let result=await response.json();
    displayMeals(result)
}
async function getDetailes(id){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result=await response.json();
    displayDetailes(result);
    
}
async function getAreas(){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let result=await response.json();
    displayAreas(result);
}
async function getIngredients(){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result=await response.json();
    displayIngredients(result);
}
async function getMealByArea(areaName){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let result=await response.json();
    displayMeals(result);
}
async function getMealByIngredient(ingredientName){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    let result=await response.json();
    displayMeals(result);
}

$('#searchBtn').on('click',function(){
    let searchInputs=`
    <div class="row py-4">
    <div class="col-md-6">
    <input type="text" class="form-control" name="searchByName" id="sName" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
  <input type="text" name="search" class="form-control" id="sLetter" placeholder="Search By First Letter">
</div>

</div>
    `
    $('#searchContainer').html(searchInputs);
    $('#randomMeal').html('');
    addRemoveClasses();
    $("#sName").on("input", function(){
        getMealsByName($("#sName").val());
       
   });
   $("#sLetter").on("input", function(){
    getMealsByfLetter($("#sLetter").val());
   
});
closesideNav();
});
$('#category').on('click',function(){
    $('#searchContainer').html('');
    addRemoveClasses();
    getCategories();
    closesideNav();
});

$('#area').on('click',function(){
    $('#searchContainer').html('');
    addRemoveClasses();
    getAreas();
    closesideNav();
});
$('#ingredient').on('click',function(){
    $('#searchContainer').html('');
    addRemoveClasses();
    getIngredients();
    closesideNav();
});
$('#contact').on('click',function(){
    $('.body-Meales').addClass('d-none');
    $('.detail').addClass('d-none');
    $('.contact').removeClass('d-none');
    closesideNav();
})
function addRemoveClasses(){
    $('.body-Meales').removeClass('d-none');
    $('.detail').addClass('d-none');
    $('.contact').addClass('d-none');


}

  

  

// Validation Code

$("#Name").on("input", function(){
    validateName();
 
});
$("#email").on("input", function(){
    validateEmail();
 
});
$("#phone").on("input", function(){
  validatephone();
 
});
$("#pass").on("input", function(){
    validatepassword();
 
});
$("#repass").on("input", function(){
    validateRepassword();
   
});


function validateName(){
let Name=$("#Name").val();
    let regexName=/^[A-z]*((\s)*[A-z])*$/g;
    if(regexName.test(Name)==true){
        $("#nameAlert").addClass('d-none');
        $('#Name').addClass('is-valid');
        $('#Name').removeClass('is-invalid');
        return true

    }else{
        $("#nameAlert").removeClass('d-none');
       $('#Name').addClass('is-invalid');
       $('#Name').removeClass('is-valid');
         
      return false;

    }


}
function validateEmail(){
let email=$("#email").val();
    let regexEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(regexEmail.test(email)==true ){
        $("#emailAlert").addClass('d-none');
        $('#email').addClass('is-valid');
        $('#email').removeClass('is-invalid');
        return true

    }else{
        $("#emailAlert").removeClass('d-none');
       $('#email').addClass('is-invalid');
       $('#email').removeClass('is-valid');
         
      return false;

    }


}
function validatephone(){
let phone=$("#phone").val();
    let regexphone=/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g;
    if(regexphone.test(phone)==true){
        $("#phoneAlert").addClass('d-none');
        $('#phone').addClass('is-valid');
        $('#phone').removeClass('is-invalid');
        return true

    }else{
        $("#phoneAlert").removeClass('d-none');
       $('#phone').addClass('is-invalid');
       $('#phone').removeClass('is-valid');
         
      return false;

    }


}

function validatepassword(){
let pass=$("#pass").val();
    let regexpass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if(regexpass.test(pass)==true){
        $("#passwordAlert").addClass('d-none');
        $('#pass').addClass('is-valid');
        $('#pass').removeClass('is-invalid');
        return true

    }else{
        $("#passwordAlert").removeClass('d-none');
       $('#pass').addClass('is-invalid');
       $('#pass').removeClass('is-valid');
         
      return false;

    }


}
function validateRepassword(){
let repass= $('#repass').val();
// let password=$("#pass").val();
let regexRepass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if(regexRepass.test(repass)==true){
        $("#repasswordAlert").addClass('d-none');
        $('#repass').addClass('is-valid');
        $('#repass').removeClass('is-invalid');
        if( validateName() && validateEmail() && validatephone && validatepassword()){
            $("#submitBtn").removeAttr("disabled");
            console.log("gggggggg");
        }
        return true
    }else{
        $("#repasswordAlert").removeClass('d-none');
        $('#repass').addClass('is-invalid');
        $('#repass').removeClass('is-valid');
          
       return false;
    }
}

